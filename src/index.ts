export enum DbTypes {
    MsSql,
    MySql,
    PostgreSql,
    Oracle,
    BigQuery
}

export interface IOptions {
    dbType?: DbTypes;
}

export interface IConnectorRes {
    error?: Error;
    select?: string[],
    where?: string;
    orderBy?: string;
    skip?: number;
    top?: number;
    parameters?: Record<string, string | number | boolean>
}



