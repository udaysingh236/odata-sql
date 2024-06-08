import { IOdataSkipToken, IOdataTopToken, IParsedFilterRes, IParsedOrderByRes, IParsedTopRes, parseFilter, parseOrderby, parseSkip, parseTop } from '@slackbyte/odata-query-parser';
import { odataSqlConnector } from './lib/connector';
import { orderByStr, topObj, topSkipObj } from './tests/allTestInOutput';

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
    skip?: string;
    top?: string;
    parameters?: Map<string, string | number | boolean>;
}

export interface ICreateTopSkip {
    topSrc?: string;
    skipSrc?: string;
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
        createOrderBy: (source: string): IConnectorRes => {
            const tokens: IParsedOrderByRes = parseOrderby(source);
            if (tokens.error) {
                odataSqlRes.error = tokens.error;
                return odataSqlRes;
            }
            return connector.orderByConnector(tokens.token);
        },
        createTopSkip: ({ topSrc, skipSrc }: ICreateTopSkip): IConnectorRes => {
            if (!topSrc && !skipSrc) {
                odataSqlRes.error = new Error(`Either of or both Top and Skip needed`);
                return odataSqlRes;
            }
            let topToken: IOdataTopToken = {
                tokenType: '',
                value: 0,
            };
            let skipToken: IOdataSkipToken = {
                tokenType: '',
                value: 0,
            };
            if (topSrc) {
                const toptokens: IParsedTopRes = parseTop(topSrc);
                if (toptokens.error) {
                    odataSqlRes.error = toptokens.error;
                    return odataSqlRes;
                }
                topToken = toptokens.token;
            }
            if (skipSrc) {
                const skiptokens: IParsedTopRes = parseSkip(skipSrc);
                if (skiptokens.error) {
                    odataSqlRes.error = skiptokens.error;
                    return odataSqlRes;
                }
                skipToken = skiptokens.token;
            }
            return connector.skipTopConnector(topToken, skipToken);
        },
    };
};

console.log(odataSql({ dbType: DbTypes.MsSql }).createTopSkip(topObj));
