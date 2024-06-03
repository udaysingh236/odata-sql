import { IParsedFilterRes, parseFilter } from '@slackbyte/odata-query-parser';
import { odataSqlConnector } from './lib/connector';
import { arithFuncs, dtTimeFunc, operatorFilterStr, stringFuncs } from './tests/allTestInOutput';

export enum DbTypes {
    MsSql,
    MySql,
    PostgreSql,
    Oracle,
    BigQuery,
}

export interface IOptions {
    dbType?: DbTypes;
}

export interface IConnectorRes {
    error?: Error;
    select?: string[];
    where?: string;
    orderBy?: string;
    skip?: number;
    top?: number;
    parameters?: Map<string, string | number | boolean>;
}

export const dbParamVals = {
    oracle: ':v',
    msSql: '@v',
    mySql: '?',
    postgresql: ':v',
};

export const odataSql = (options?: IOptions) => {
    const connector = odataSqlConnector(options);
    const odataSqlRes: IConnectorRes = {};
    return {
        createFilter: (source: string): IConnectorRes => {
            const tokens: IParsedFilterRes = parseFilter(source);
            if (tokens.error) {
                odataSqlRes.error = tokens.error;
                return odataSqlRes;
            }
            return connector.filterConnector(tokens.token);
        },
    };
};

// const odataSqlMsSql = odataSql({ dbType: DbTypes.MsSql });
// console.log('Operation');
// console.log(odataSqlMsSql.createFilter(operatorFilterStr));
// console.log('String');
// console.log(odataSqlMsSql.createFilter(stringFuncs));
// console.log('date');
// console.log(odataSqlMsSql.createFilter(dtTimeFunc));
// console.log('Arith');
// console.log(odataSqlMsSql.createFilter(arithFuncs));
