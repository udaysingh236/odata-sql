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

export const optrFilterResOracle = {
    where: '( Address/City = :v0 AND Address/City <> :v1 ) OR ( ( Price * 8 > :v2 OR Price + 5 >= :v3 ) ) AND NOT City in :v4 AND ( Price - 5 ) > :v5',
    parameters: {
        ':v0': "'Redmond'",
        ':v1': "'London'",
        ':v2': 20,
        ':v3': 10,
        ':v4': "('Redmond', 'London')",
        ':v5': 10,
    },
};

export const optrFilterResMysql = {
    where: '( Address/City = ? AND Address/City <> ? ) OR ( ( Price * 8 > ? OR Price + 5 >= ? ) ) AND NOT City in ? AND ( Price - 5 ) > ?',
    parameters: {
        q1: "'Redmond'",
        q2: "'London'",
        q3: 20,
        q4: 10,
        q5: "('Redmond', 'London')",
        q6: 10,
    },
};

export const optrFilterResPostgres = {
    where: '( Address/City = :v0 AND Address/City <> :v1 ) OR ( ( Price * 8 > :v2 OR Price + 5 >= :v3 ) ) AND NOT City in :v4 AND ( Price - 5 ) > :v5',
    parameters: {
        ':v0': "'Redmond'",
        ':v1': "'London'",
        ':v2': 20,
        ':v3': 10,
        ':v4': "('Redmond', 'London')",
        ':v5': 10,
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

export const stringFuncsResOracle = {
    where: '( CompanyName NOT LIKE :v0 AND CompanyName LIKE :v1 ) AND Price LIKE :v2 AND CompanyName LIKE :v3 OR INSTR(CompanyName, :v4) - 1 = :v5 AND length(CompanyName) = :v6 OR SUBSTR(CompanyName,1,2) = :v7 AND lower(CompanyName) = :v8 OR upper(CompanyName) = :v9 AND trim(CompanyName) = :v10',
    parameters: {
        ':v0': "'%Futterkiste'",
        ':v1': "'%freds%'",
        ':v2': '%30%',
        ':v3': '40%',
        ':v4': "'soft'",
        ':v5': 1,
        ':v6': 19,
        ':v7': "'lf'",
        ':v8': "'alfreds futterkiste'",
        ':v9': "'ALFREDS FUTTERKISTE'",
        ':v10': "'Alfreds Futterkiste'",
    },
};

export const stringFuncsResMysql = {
    where: '( CompanyName NOT LIKE ? AND CompanyName LIKE ? ) AND Price LIKE ? AND CompanyName LIKE ? OR INSTR(CompanyName, ?) - 1 = ? AND length(CompanyName) = ? OR SUBSTRING(CompanyName,1,2) = ? AND lower(CompanyName) = ? OR upper(CompanyName) = ? AND trim(CompanyName) = ?',
    parameters: {
        q1: "'%Futterkiste'",
        q2: "'%freds%'",
        q3: '%30%',
        q4: '40%',
        q5: "'soft'",
        q6: 1,
        q7: 19,
        q8: "'lf'",
        q9: "'alfreds futterkiste'",
        q10: "'ALFREDS FUTTERKISTE'",
        q11: "'Alfreds Futterkiste'",
    },
};

export const stringFuncsResPostgres = {
    where: '( CompanyName NOT LIKE :v0 AND CompanyName LIKE :v1 ) AND Price LIKE :v2 AND CompanyName LIKE :v3 OR strpos(CompanyName, :v4) - 1 = :v5 AND length(CompanyName) = :v6 OR SUBSTRING(CompanyName,1,2) = :v7 AND lower(CompanyName) = :v8 OR upper(CompanyName) = :v9 AND trim(CompanyName) = :v10',
    parameters: {
        ':v0': "'%Futterkiste'",
        ':v1': "'%freds%'",
        ':v2': '%30%',
        ':v3': '40%',
        ':v4': "'soft'",
        ':v5': 1,
        ':v6': 19,
        ':v7': "'lf'",
        ':v8': "'alfreds futterkiste'",
        ':v9': "'ALFREDS FUTTERKISTE'",
        ':v10': "'Alfreds Futterkiste'",
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
export const dtTimeFuncResMysql = {
    where: '( cast(StartTime as date) <> cast(EndTime as date) AND NOT day(StartTime) = ? ) OR cast(StartTime as date) <> cast(EndTime as date) AND hour(StartTime) = ? AND NOT minute(StartTime) = ? OR month(BirthDate) = ? AND StartTime >= now() OR second(StartTime) = ? OR year(BirthDate) = ?',
    parameters: {
        q1: 8,
        q2: 1,
        q3: 0,
        q4: 12,
        q5: 0,
        q6: 0,
    },
};

export const dtTimeFuncResOracle = {
    where: "( TO_DATE(StartTime, 'MM/DD/YYYY') <> TO_DATE(EndTime, 'MM/DD/YYYY') AND NOT day(StartTime) = :v0 ) OR TO_DATE(StartTime, 'MM/DD/YYYY') <> TO_DATE(EndTime, 'MM/DD/YYYY') AND hour(StartTime) = :v1 AND NOT minute(StartTime) = :v2 OR month(BirthDate) = :v3 AND StartTime >= now() OR second(StartTime) = :v4 OR year(BirthDate) = :v5",
    parameters: {
        ':v0': 8,
        ':v1': 1,
        ':v2': 0,
        ':v3': 12,
        ':v4': 0,
        ':v5': 0,
    },
};

export const dtTimeFuncResPostgres = {
    where: "( TO_DATE(StartTime, 'MM/DD/YYYY') <> TO_DATE(EndTime, 'MM/DD/YYYY') AND NOT EXTRACT(day from StartTime) = :v0 ) OR TO_DATE(StartTime, 'MM/DD/YYYY') <> TO_DATE(EndTime, 'MM/DD/YYYY') AND EXTRACT(hour from StartTime) = :v1 AND NOT EXTRACT(minute from StartTime) = :v2 OR EXTRACT(month from BirthDate) = :v3 AND StartTime >= now() OR EXTRACT(second from StartTime) = :v4 OR EXTRACT(year from BirthDate) = :v5",
    parameters: {
        ':v0': 8,
        ':v1': 1,
        ':v2': 0,
        ':v3': 12,
        ':v4': 0,
        ':v5': 0,
    },
};

export const arithFuncs = 'ceiling(Freight) eq 33 and not (floor(Freight) eq 32 or round(Freight) eq 32)';
export const arithFuncsResMssql = {
    where: 'ceiling(Freight) = @v1 AND NOT ( floor(Freight) = @v2 OR cast(round(Freight,0) as int) = @v3 )',
    parameters: { '@v1': 33, '@v2': 32, '@v3': 32 },
};
export const arithFuncsResOracle = {
    where: 'CEIL(Freight) = :v0 AND NOT ( floor(Freight) = :v1 OR round(Freight) = :v2 )',
    parameters: { ':v0': 33, ':v1': 32, ':v2': 32 },
};

export const arithFuncsResMysql = {
    where: 'ceiling(Freight) = ? AND NOT ( floor(Freight) = ? OR round(Freight) = ? )',
    parameters: { q1: 33, q2: 32, q3: 32 },
};

export const arithFuncsResPostgres = {
    where: 'ceiling(Freight) = :v0 AND NOT ( floor(Freight) = :v1 OR round(Freight) = :v2 )',
    parameters: { ':v0': 33, ':v1': 32, ':v2': 32 },
};
