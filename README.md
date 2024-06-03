# odata-sql-connect

A highly versatile, fast and secured OData Version 4.01 SQL Connector which provides functionality to convert different types of OData segments into SQL query statements, that can be executed over an SQL database.

## Potential Usecases

-   Create high speed, Odata 4.01 compliant data sharing APIs.
-   Can be used over most of the famous Databases like My SQL, My SQL server, Oracle and Postgres.

### Example usecase

```Javascript
import { odataSql, DbTypes } from '@slackbyte/odata-sql-connect';

const odataSqlPostgres = odataSql({ dbType: DbTypes.PostgreSql });
//example request:  GET /api/customers?$filter=City in ('Mumbai', 'London') and (Age sub 5) gt 18 and not endswith(CompanyName,'Futterkiste')
app.get("/api/customers", async (req: Request, res: Response) => {
    const filterRes = odataSqlPostgres.createFilter(req.query.$filter);
    if(filterRes.error) {
        res.status(422).json({ message: filterRes.error });
        return;
    }
    const query = `SELECT * FROM customers WHERE ${filter.where}`;
    const queryParams = Object.fromEntries(filterRes.parameters!);
    const queryRes = await runSelectQuery(query, queryParams); //DB layer function
    if(queryRes.error) {
        res.status(422).json({ message: queryRes.error });
        return;
    }
    res.json({
        '@odata.context': req.protocol + '://' + req.get('host') + '/api/$metadata#customers',
        value: queryRes.data
    });
});
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
