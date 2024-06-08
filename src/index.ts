import { IOdataSkipToken, IOdataTopToken, IParsedFilterRes, IParsedOrderByRes, IParsedTopRes, parseFilter, parseOrderby, parseSkip, parseTop } from '@slackbyte/odata-query-parser';
import { odataSqlConnector } from './lib/connector';

export enum DbTypes {
    MsSql,
    MySql,
    PostgreSql,
    Oracle,
    BigQuery,
}

export interface IOptions {
    /*
        Default: Postgres
        MsSql,
        MySql,
        PostgreSql,
        Oracle,
        BigQuery,
     */
    dbType?: DbTypes;
    /**
     * Default: false
     * Set this to true if you need '?' in the where clause as a raw parameter.
     * Set this to false if you need named parameter in the where clause, for eg: :v1, :v2 etc
     */
    useRawParameters?: boolean;
    /**
     * Default: 'v'
     * Set this to set the named parameter prefix, for example: val1, value1 etc
     */
    namedParamPrefix?: string;
}

export interface IConnectorRes {
    error?: Error;
    select?: string[];
    where?: string;
    orderBy?: string;
    skip?: string;
    top?: string;
    parameters: Map<string, string | number | boolean>;
}

export interface ICreateTopSkip {
    topSrc?: string;
    skipSrc?: string;
}

export const dbParamVals = {
    oracle: ':',
    msSql: '@',
    mySql: '?',
    postgresql: ':',
};

export const odataSql = (options?: IOptions) => {
    const connector = odataSqlConnector(options);
    const odataSqlRes: IConnectorRes = {
        parameters: new Map(),
    };
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
