import { IParsedFilterRes, parseFilter } from '@slackbyte/odata-query-parser';
import { ODataSqlConnector } from './lib/connector';

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

const filter =
    "Address/City eq 'Redmond' and Address/City ne 'London' or ((Price mul 8 gt 20 or Price add 5 ge 10)) or City in ('Redmond', 'London') and (Price sub 5) gt 10 and contains(CompanyName,'freds') and contains(Price,30) or endswith(CompanyName,'Futterkiste') and startswith(CompanyName, 40 ) or indexof(CompanyName,30) eq 1 and length(CompanyName) eq 19 or substring(CompanyName,1,2) eq 'lf' and tolower(CompanyName) eq 'alfreds futterkiste' or toupper(CompanyName) eq 'ALFREDS FUTTERKISTE' and trim(CompanyName) eq 'Alfreds Futterkiste'";
export const createFilter = (source: string) => {
    const tokens: IParsedFilterRes = parseFilter(source);
    if (tokens.error) {
        console.log(tokens.error.message);
        console.log(tokens.token);
        return;
    }

    const odataSqlPg = new ODataSqlConnector({ dbType: DbTypes.Oracle });
    console.log(tokens.token);
    console.log(odataSqlPg.filterConnector(tokens.token));
};

createFilter(filter);
