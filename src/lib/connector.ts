import { IOptions, DbTypes, IConnectorRes } from '..';
import { IOdataFilterToken } from '@slackbyte/odata-query-parser';
import { constants } from '../utils/constants';

const expDependency: Record<
    string,
    {
        before: string[];
        after: string[];
    }
> = {
    startExp: {
        before: [],
        after: ['conditionMemberExp', 'queryFuncExp', 'openBracExp'],
    },
    comOperatorExp: {
        before: ['conditionMemberExp', 'queryFuncExp', 'closeBracExp'],
        after: ['conditionMemberExp'],
    },
    logOperatorExp: {
        before: ['conditionMemberExp'],
        after: ['conditionMemberExp', 'queryFuncExp'],
    },
    queryFuncExp: {
        before: ['logOperatorExp'],
        after: ['comOperatorExp'],
    },
    closeBracExp: {
        before: ['conditionMemberExp'],
        after: ['logOperatorExp', 'comOperatorExp'],
    },
    openBracExp: {
        before: ['logOperatorExp'],
        after: ['conditionMemberExp'],
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

class ODataSqlConnector {
    private dbType: DbTypes;
    private connectorRes: IConnectorRes;
    constructor(options: IOptions) {
        this.dbType = options.dbType ? options.dbType : DbTypes.PostgreSql;
        this.connectorRes = {};
    }

    private filter(tokens: IOdataFilterToken[]) {
        let prevToken = constants.INITIALIZE_STR;
        if (tokens.length === 0) {
            //guard clause
            throw new Error('Token length is empty');
        }

        if (!expDependency.startExp.after.includes(tokens[0].tokenType)) {
            throw new Error(`Filter string cannot start with ${tokens[0].tokenType}, it can starts with either of ${expDependency.startExp.after.join(',')}`);
        } else {
            this.connectorRes.where = tokens[0].value;
        }

        for (let index = 1; index < tokens.length; index++) {
            const token = tokens[index];
        }
    }
}
