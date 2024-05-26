import { IOptions, DbTypes, IConnectorRes, dbParamVals } from '..';
import { IOdataFilterToken } from '@slackbyte/odata-query-parser';
import { constants } from '../utils/constants';
import { convertDataType, removeStartEndChar } from '../utils/helpers';

const expDependency: Record<string, { before: string[]; after: string[] }> = {
    startExp: {
        before: [],
        after: ['conditionMemberExp', 'queryFuncExp', 'openBracExp'],
    },
    comOperatorExp: {
        before: ['conditionMemberExp', 'queryFuncExp', 'closeBracExp'],
        after: ['conditionMemberExp'],
    },
    logOperatorExp: {
        before: ['conditionMemberExp', 'closeBracExp', 'queryFuncExp'],
        after: ['conditionMemberExp', 'queryFuncExp', 'openBracExp'],
    },
    queryFuncExp: {
        before: ['logOperatorExp', 'openBracExp'],
        after: ['comOperatorExp', 'logOperatorExp', 'closeBracExp'],
    },
    closeBracExp: {
        before: ['conditionMemberExp', 'closeBracExp', 'queryFuncExp'],
        after: ['logOperatorExp', 'comOperatorExp', 'closeBracExp'],
    },
    openBracExp: {
        before: ['logOperatorExp', 'openBracExp'],
        after: ['conditionMemberExp', 'openBracExp', 'queryFuncExp'],
    },
    ArithOperatorExp: {
        before: ['conditionMemberExp'],
        after: ['conditionMemberExp'],
    },
    conditionMemberExp: {
        before: ['comOperatorExp', 'logOperatorExp', 'ArithOperatorExp', 'openBracExp'],
        after: ['logOperatorExp', 'comOperatorExp', 'ArithOperatorExp', 'closeBracExp'],
    },
};

export class ODataSqlConnector {
    private dbType: DbTypes;
    private connectorRes: IConnectorRes;
    private bindCtr: number;
    private nextExecptedExp: string[];
    constructor(options: IOptions) {
        this.dbType = options.dbType ? options.dbType : DbTypes.PostgreSql;
        this.connectorRes = {
            where: '',
            parameters: new Map(),
        };
        this.bindCtr = 0;
        this.nextExecptedExp = [];
    }

    private filter(tokens: IOdataFilterToken[]) {
        let prevToken = constants.INITIALIZE_STR;
        let prevSubToken = constants.INITIALIZE_STR;
        let totalOpenBrac = 0;
        let totalCloseBrac = 0;
        if (tokens.length === 0) {
            //guard clause
            throw new Error('Token length is empty');
        }

        if (!expDependency.startExp.after.includes(tokens[0].tokenType)) {
            throw new Error(`Filter string cannot start with ${tokens[0].tokenType}, it can starts with either of ${expDependency.startExp.after.join(',')}`);
        }
        if (tokens[0].tokenType === constants.conditionMemberExp || tokens[0].tokenType === constants.openBracExp) {
            this.appendToWhere(tokens[0].value, false);
            this.nextExecptedExp = expDependency[tokens[0].tokenType].after;
            prevToken = tokens[0].tokenType;
        }

        for (let index = 1; index < tokens.length; index++) {
            const token = tokens[index];
            if (token.tokenType === constants.comOperatorExp) {
                if (this.checkDependency(token.tokenType, prevToken, prevSubToken)) {
                    this.nextExecptedExp = expDependency[token.tokenType].after;
                    this.appendToWhere(token.value);
                } else {
                    throw new Error(`Was expecting ${this.nextExecptedExp} and got ${token.tokenType} | prevToken: ${prevToken}, prevSubToken: ${prevSubToken}, value: ${token.value}`);
                }
            } else if (token.tokenType === constants.conditionMemberExp) {
                if (this.checkDependency(token.tokenType, prevToken, prevSubToken)) {
                    if (prevToken === constants.comOperatorExp) {
                        // this will be value and insert it in parameter
                        this.handleParameter(convertDataType(token.value));
                    } else {
                        this.appendToWhere(token.value);
                    }
                    this.nextExecptedExp = expDependency[token.tokenType].after;
                } else {
                    throw new Error(`Was expecting ${this.nextExecptedExp} and got ${token.tokenType} | prevToken: ${prevToken}, prevSubToken: ${prevSubToken}, value: ${token.value}`);
                }
            } else if (token.tokenType === constants.logOperatorExp) {
                if (this.checkDependency(token.tokenType, prevToken, prevSubToken)) {
                    this.appendToWhere(token.value);
                    this.nextExecptedExp = expDependency[token.tokenType].after;
                } else {
                    throw new Error(`Was expecting ${this.nextExecptedExp} and got ${token.tokenType} | prevToken: ${prevToken}, prevSubToken: ${prevSubToken}, value: ${token.value}`);
                }
            } else if (token.tokenType === constants.ArithOperatorExp) {
                if (this.checkDependency(token.tokenType, prevToken)) {
                    this.appendToWhere(token.value);
                    this.nextExecptedExp = expDependency[token.tokenType].after;
                } else {
                    throw new Error(`Was expecting ${this.nextExecptedExp} and got ${token.tokenType} | prevToken: ${prevToken}, prevSubToken: ${prevSubToken}, value: ${token.value}`);
                }
            } else if (token.tokenType === constants.groupOperatorExp) {
                if (this.checkDependency(token.subType, prevToken, prevSubToken)) {
                    if (token.subType === constants.openBracExp) {
                        totalOpenBrac++;
                    } else {
                        totalCloseBrac++;
                    }
                    this.appendToWhere(token.value);
                    this.nextExecptedExp = expDependency[token.subType].after;
                } else {
                    throw new Error(`Was expecting ${this.nextExecptedExp} and got ${token.tokenType} | prevToken: ${prevToken}, prevSubToken: ${prevSubToken}, value: ${token.value}`);
                }
            } else if (token.tokenType === constants.queryFuncExp) {
                if (this.checkDependency(token.tokenType, prevToken, prevSubToken)) {
                    this.handleFunction(token, prevToken, prevSubToken);
                    this.nextExecptedExp = expDependency[token.tokenType].after;
                } else {
                    throw new Error(`Was expecting ${this.nextExecptedExp} and got ${token.tokenType} | prevToken: ${prevToken}, prevSubToken: ${prevSubToken}, value: ${token.value}`);
                }
            }
            prevToken = token.tokenType;
            prevSubToken = token.subType;
        }
        if (totalOpenBrac !== totalCloseBrac) {
            throw new Error(
                `Total ${totalOpenBrac} open and ${totalCloseBrac} close brackets in grouping found, ${totalCloseBrac - totalOpenBrac > 0 ? `${totalCloseBrac - totalOpenBrac} opening bracket(s) missing` : `${totalOpenBrac - totalCloseBrac} closing bracket(s) missing`} `,
            );
        }
    }

    private appendToWhere(str: string, withSpace: boolean = true): void {
        if (withSpace) {
            this.connectorRes.where += ' ';
        }
        this.connectorRes.where += str;
    }

    private handleParameter(value: string | number): void {
        let bindVarName = `${dbParamVals.postgresql}${this.bindCtr++}`;
        if (this.dbType === DbTypes.Oracle || this.dbType === DbTypes.PostgreSql) {
            this.appendToWhere(bindVarName as string);
        } else if (this.dbType === DbTypes.MySql) {
            this.appendToWhere(constants.questionMark as string);
        } else if (this.dbType === DbTypes.MsSql) {
            bindVarName = `${dbParamVals.msSql}${this.bindCtr++}`;
            this.appendToWhere(constants.questionMark as string);
        }
        this.connectorRes.parameters?.set(bindVarName, value);
    }

    private handleFunction(token: IOdataFilterToken, prevToken: string, prevSubToken: string = '') {
        const funcName = token.value;
        const funcType = token.subType;
        const funcArgs = token.funcArgs!;
        switch (funcType) {
            case 'containsFuncExp':
            case 'endswithFuncExp':
            case 'startswithFuncExp':
                let bindVarName = '';
                let whereSubStr = '';
                // In case of contains, make it a 'LIKE'
                let [col, value, ...restArgs] = removeStartEndChar(funcArgs).split(','); //first remove the ( )
                col = col.trim();
                value = value.trim();
                if (!col || !value || col.length === 0 || value.length === 0 || restArgs.length > 0) {
                    // guard clause
                    throw new Error(`contains function needs only two arguements one column name and one search string, received: ${funcArgs}`);
                }
                // Generate value
                if (value[0] === constants.SINGLE_QUOTE && value[value.length - 1] !== constants.SINGLE_QUOTE) {
                    throw new Error(`${value} is not in valid string format, missing single quote at the end`);
                } else if (value[0] !== constants.SINGLE_QUOTE && value[value.length - 1] === constants.SINGLE_QUOTE) {
                    throw new Error(`${value} is not in valid string format, missing single quote at the start`);
                } else if (value[0] === constants.SINGLE_QUOTE && value[value.length - 1] === constants.SINGLE_QUOTE) {
                    if (funcType === 'endswithFuncExp') {
                        bindVarName = `'%${removeStartEndChar(value)}'`;
                    } else if (funcType === 'startswithFuncExp') {
                        bindVarName = `'${removeStartEndChar(value)}%'`;
                    } else {
                        bindVarName = `'%${removeStartEndChar(value)}%'`;
                    }
                } else {
                    if (funcType === 'endswithFuncExp') {
                        bindVarName = `%${value}`;
                    } else if (funcType === 'startswithFuncExp') {
                        bindVarName = `${value}%`;
                    } else {
                        bindVarName = `%${value}%`;
                    }
                }

                // generate clause
                if (prevSubToken === constants.notExp && prevToken === constants.logOperatorExp) {
                    this.connectorRes.where = this.connectorRes.where?.slice(0, -4); //Remove the already inserted ' NOT'
                    whereSubStr = `${col} NOT LIKE`;
                } else {
                    whereSubStr = `${col} LIKE`;
                }
                this.appendToWhere(whereSubStr);
                this.handleParameter(bindVarName);
                break;
            case 'indexofExpFunc':
                break;
            default:
                break;
        }
    }

    private checkDependency(currToken: string, prevToken: string, prevSubToken: string = ''): boolean {
        if (prevSubToken) {
            return (expDependency[currToken].before.includes(prevSubToken) || expDependency[currToken].before.includes(prevToken)) && this.nextExecptedExp.includes(currToken);
        }
        return expDependency[currToken].before.includes(prevToken) && this.nextExecptedExp.includes(currToken);
    }

    public filterConnector(tokens: IOdataFilterToken[]): IConnectorRes {
        try {
            this.filter(tokens);
        } catch (err) {
            this.connectorRes.error = err as Error;
        }
        return this.connectorRes;
    }
}
