export const operatorFilterStr = "(Address/City eq 'Redmond' and Address/City ne 'London') or ((Price mul 8 gt 20 or Price add 5 ge 10)) and not City in ('Redmond', 'London') and (Price sub 5) gt 10";
export const optrFilterResMsSql = {
    where: '( Address/City = @v1 AND Address/City <> @v2 ) OR ( ( Price * 8 > @v3 OR Price + 5 >= @v4 ) ) AND NOT City in @v5 AND ( Price - 5 ) > @v6',
    parameters: {
        '@v1': "'Redmond'",
        '@v2': "'London'",
        '@v3': 20,
        '@v4': 10,
        '@v5': "('Redmond', 'London')",
        '@v6': 10,
    },
};

export const stringFuncs =
    "(not endswith(CompanyName,'Futterkiste') and contains(CompanyName,'freds')) and contains(Price,30) and startswith(CompanyName, 40 ) or indexof(CompanyName,'soft') eq 1 and length(CompanyName) eq 19 or substring(CompanyName,1,2) eq 'lf' and tolower(CompanyName) eq 'alfreds futterkiste' or toupper(CompanyName) eq 'ALFREDS FUTTERKISTE' and trim(CompanyName) eq 'Alfreds Futterkiste'";
export const stringFuncsResMsSql = {
    where: '( CompanyName NOT LIKE @v1 AND CompanyName LIKE @v2 ) AND Price LIKE @v3 AND CompanyName LIKE @v4 OR CHARINDEX(@v5, CompanyName) - 1 = @v6 AND LEN(CompanyName) = @v7 OR SUBSTRING(CompanyName,1,2) = @v8 AND lower(CompanyName) = @v9 OR upper(CompanyName) = @v10 AND trim(CompanyName) = @v11',
    parameters: {
        '@v1': "'%Futterkiste'",
        '@v2': "'%freds%'",
        '@v3': '%30%',
        '@v4': '40%',
        '@v5': "'soft'",
        '@v6': 1,
        '@v7': 19,
        '@v8': "'lf'",
        '@v9': "'alfreds futterkiste'",
        '@v10': "'ALFREDS FUTTERKISTE'",
        '@v11': "'Alfreds Futterkiste'",
    },
};

export const dtTimeFunc =
    '(date(StartTime) ne date(EndTime) and not day(StartTime) eq 8) or date(StartTime) ne date(EndTime) and hour(StartTime) eq 1 and not minute(StartTime) eq 0 or month(BirthDate) eq 12 and StartTime ge now() or second(StartTime) eq 0 or year(BirthDate) eq 0';
export const dtTimeFuncResMsSql = {
    where: '( cast(StartTime as date) <> cast(EndTime as date) AND NOT DATEPART(day, StartTime) = @v1 ) OR cast(StartTime as date) <> cast(EndTime as date) AND DATEPART(hour, StartTime) = @v2 AND NOT DATEPART(minute, StartTime) = @v3 OR DATEPART(month, BirthDate) = @v4 AND StartTime >= CURRENT_TIMESTAMP OR DATEPART(second, StartTime) = @v5 OR DATEPART(year, BirthDate) = @v6',
    parameters: {
        '@v1': 8,
        '@v2': 1,
        '@v3': 0,
        '@v4': 12,
        '@v5': 0,
        '@v6': 0,
    },
};

export const arithFuncs = 'ceiling(Freight) eq 33 and not (floor(Freight) eq 32 or round(Freight) eq 32)';
export const arithFuncsResMssql = {
    where: 'ceiling(Freight) = @v1 AND NOT ( floor(Freight) = @v2 OR cast(round(Freight,0) as int) = @v3 )',
    parameters: { '@v1': 33, '@v2': 32, '@v3': 32 },
};
