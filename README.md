# odata-sql-connect

A highly versatile, fast and secured OData Version 4.01 SQL Connector which provides functionality to convert different types of OData segments into SQL query statements, that can be executed over an SQL database.

## Potential Usecases

-   Create high speed, Odata 4.01 compliant data sharing APIs.
-   Can be used over most of the famous Databases like My SQL, My SQL server, Oracle and Postgres.

### Example

More examples can be [found here](https://github.com/udaysingh236/odata-sql-connect/blob/main/examples/filter.ts)

```Javascript
import { odataSql, DbTypes } from '@slackbyte/odata-sql-connect';

// Inpur str for Oracle, Postgres, MySql, MsSql
import { orderByStr, stringFuncs, topSkipObj } from '../tests/allTestInOutput';

const odataSqlPostgres = odataSql({ dbType: DbTypes.PostgreSql });
const { error: filterErr, where, parameters } = odataSqlPostgres.createFilter(stringFuncs);
if (filterErr) {
    console.error(filterErr.message);
} else {
    console.log(`Oracle/Postgres Example => Where clause: ${where}`);
    console.log(`Oracle/Postgres Example => Parameters/Bind Variables: ${Object.fromEntries(parameters)}`);
}

const { error: orderByErr, orderBy } = odataSqlPostgres.createOrderBy(orderByStr);
if (orderByErr) {
    console.error(orderByErr.message);
} else {
    console.log(`Oracle/Postgres Example => orderBy clause: ${orderBy}`);
}

const { error: topSkipErr, top, skip } = odataSqlPostgres.createTopSkip(topSkipObj);
if (topSkipErr) {
    console.error(topSkipErr.message);
} else {
    console.log(`Oracle/Postgres Example => Top: ${top}, Skip: ${skip}`);
}

// FIlter with named parameter prefix

const odataSqlMsSqlPrefix = odataSql({ dbType: DbTypes.MsSql, namedParamPrefix: 'value' });
const { error: filterPrefixErr, where: preWhere, parameters: preParameters } = odataSqlMsSqlPrefix.createFilter(stringFuncs);
if (filterPrefixErr) {
    console.error(filterPrefixErr.message);
} else {
    console.log(`MsSql Example => Where clause: ${preWhere}`);
    console.log(`MsSql Example => Parameters/Bind Variables: ${Object.fromEntries(preParameters)}`);
}

// With Raw parameters

const odataSqlPostgresRaw = odataSql({ dbType: DbTypes.PostgreSql, namedParamPrefix: 'var', useRawParameters: true });
const { error: filterRawErr, where: rawWhere, parameters: rawParameters } = odataSqlPostgresRaw.createFilter(stringFuncs);
if (filterRawErr) {
    console.error(filterRawErr.message);
} else {
    console.log(`Postgres Example => Where clause: ${rawWhere}`);
    const valArr = [...rawParameters.values()];
    console.log(`Postgres Example => Parameters/Bind Variables Values Array: ${valArr}`);
    console.log(`Postgres Example => Parameters/Bind Variables: ${Object.fromEntries(rawParameters)}`);
}

```

## How to build

To run the parser in local, please clone the repository and follow the below steps:

```JavaScript
npm install
npm run dev
```

To test and for test coverage:

```JavaScript
npm test
npm run test:report
```

## Special Unique features

-   Support for Odata V4.01 new features like 'in' operator.
-   Better and logical support for 'not' expression
-   By default, strict usage of bind variables or sql pramaters to avoid sql and odata injection.
-   Database specific SQL query functions gets generated.
-   Support for almost all the Filter operator.
-   Support for almost all the Query Functions.
-   Support for $orderby, $skip, $top, $count, $select.
-   Better erroring

## Supported Features

-   [x] $count
-   [x] $filter
    -   [x] Comparison Operators
        -   [x] eq
        -   [x] ne
        -   [x] lt
        -   [x] le
        -   [x] gt
        -   [x] ge
        -   [x] has
        -   [x] in
    -   [x] Logical Operators
        -   [x] and
        -   [x] or
        -   [x] not
    -   [ ] Arithmetic Operators
        -   [x] add
        -   [x] sub
        -   [x] mul
        -   [x] div
        -   [ ] divby
        -   [x] mod
    -   [x] String Functions
        -   [x] indexof
        -   [x] contains
        -   [x] endswith
        -   [x] startswith
        -   [x] length
        -   [x] substring
        -   [x] tolower
        -   [x] toupper
        -   [x] trim
        -   [x] concat
    -   [x] Date Functions
        -   [x] year
        -   [x] month
        -   [x] day
        -   [x] hour
        -   [x] minute
        -   [x] second
        -   [ ] fractionalseconds
        -   [x] date
        -   [x] time
        -   [ ] totaloffsetminutes
        -   [x] now
        -   [ ] mindatetime
        -   [ ] maxdatetime
    -   [x] Math Functions
        -   [x] round
        -   [x] floor
        -   [x] ceiling
    -   [ ] Type and conditional Functions
        -   [ ] cast
        -   [ ] isof
        -   [ ] case
-   [x] $select
-   [x] $top
-   [x] $skip
-   [x] $orderby

## CONTRIBUTING

I love your inputs! and I want to make your contribution to this project easy and transparent, whether it's:

-   Reporting a bug
-   Discussing the current state of the code
-   Submitting a fix
-   Proposing new features

Please raise a pull request. 😊

Made with love in INDIA. ❤️
