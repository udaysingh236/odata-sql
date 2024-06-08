// Example for Oracle and Postgres
import { DbTypes, odataSql } from '../src/index';
import { orderByStr, stringFuncs, topSkipObj } from '../tests/allTestInOutput';

const odataSqlPostgres = odataSql({ dbType: DbTypes.PostgreSql });
const { error: filterErr, where, parameters } = odataSqlPostgres.createFilter(stringFuncs);
if (filterErr) {
    console.error(filterErr.message);
} else {
    console.log(`Oracle/Postgres Example => Where clause: ${where}`);
    /**
     * ( CompanyName NOT LIKE :v0 AND CompanyName LIKE :v1 ) AND Price LIKE :v2 AND CompanyName LIKE :v3 OR strpos(CompanyName, :v4) - 1 = :v5 AND length(CompanyName) = :v6 OR SUBSTRING(CompanyName,1,2) = :v7 AND lower(CompanyName) = :v8 OR upper(CompanyName) = :v9 AND trim(CompanyName) = :v10
     */
    console.log(`Oracle/Postgres Example => Parameters/Bind Variables: ${Object.fromEntries(parameters)}`);
    /**
     * {"v0":"'%Futterkiste'","v1":"'%freds%'","v2":"%30%","v3":"40%","v4":"'soft'","v5":1,"v6":19,"v7":"'lf'","v8":"'alfreds futterkiste'","v9":"'ALFREDS FUTTERKISTE'","v10":"'Alfreds Futterkiste'"}
     */
}

const { error: orderByErr, orderBy } = odataSqlPostgres.createOrderBy(orderByStr);
if (orderByErr) {
    console.error(orderByErr.message);
} else {
    console.log(`Oracle/Postgres Example => orderBy clause: ${orderBy}`);
    // ReleaseDate asc, Rating desc
}

const { error: topSkipErr, top, skip } = odataSqlPostgres.createTopSkip(topSkipObj);
if (topSkipErr) {
    console.error(topSkipErr.message);
} else {
    console.log(`Oracle/Postgres Example => Top: ${top}, Skip: ${skip}`);
    // Top: LIMIT 20, Skip: OFFSET 100
}

// FIlter with named parameter prefix

const odataSqlMsSqlPrefix = odataSql({ dbType: DbTypes.MsSql, namedParamPrefix: 'value' });
const { error: filterPrefixErr, where: preWhere, parameters: preParameters } = odataSqlMsSqlPrefix.createFilter(stringFuncs);
if (filterPrefixErr) {
    console.error(filterPrefixErr.message);
} else {
    console.log(`MsSql Example => Where clause: ${preWhere}`);
    /**
        ( CompanyName NOT LIKE @value0 AND CompanyName LIKE @value1 ) AND Price LIKE @value2 AND CompanyName LIKE @value3 OR CHARINDEX(@value4, CompanyName) - 1 = @value5 AND LEN(CompanyName) = @value6 OR SUBSTRING(CompanyName,1,2) = @value7 AND lower(CompanyName) = @value8 OR upper(CompanyName) = @value9 AND trim(CompanyName) = @value10
     */
    console.log(`MsSql Example => Parameters/Bind Variables: ${Object.fromEntries(preParameters)}`);
    /**
        {"value0":"'%Futterkiste'","value1":"'%freds%'","value2":"%30%","value3":"40%","value4":"'soft'","value5":1,"value6":19,"value7":"'lf'","value8":"'alfreds futterkiste'","value9":"'ALFREDS FUTTERKISTE'","value10":"'Alfreds Futterkiste'"}
     */
}

const odataSqlPostgresRaw = odataSql({ dbType: DbTypes.MsSql, namedParamPrefix: 'var', useRawParameters: true });
const { error: filterRawErr, where: rawWhere, parameters: rawParameters } = odataSqlPostgresRaw.createFilter(stringFuncs);
if (filterRawErr) {
    console.error(filterRawErr.message);
} else {
    console.log(`Postgres Example => Where clause: ${rawWhere}`);
    /**
        ( CompanyName NOT LIKE ? AND CompanyName LIKE ? ) AND Price LIKE ? AND CompanyName LIKE ? OR CHARINDEX(?, CompanyName) - 1 = ? AND LEN(CompanyName) = ? OR SUBSTRING(CompanyName,1,2) = ? AND lower(CompanyName) = ? OR upper(CompanyName) = ? AND trim(CompanyName) = ?
     */
    const valArr = [...rawParameters.values()];
    console.log(`Postgres Example => Parameters/Bind Variables Values Array: ${valArr}`);
    // ['%Futterkiste','%freds%',%30%,40%,'soft',1,19,'lf','alfreds futterkiste','ALFREDS FUTTERKISTE','Alfreds Futterkiste']
    console.log(`Postgres Example => Parameters/Bind Variables: ${Object.fromEntries(rawParameters)}`);
    /**
        {"var0":"'%Futterkiste'","var1":"'%freds%'","var2":"%30%","var3":"40%","var4":"'soft'","var5":1,"var6":19,"var7":"'lf'","var8":"'alfreds futterkiste'","var9":"'ALFREDS FUTTERKISTE'","var10":"'Alfreds Futterkiste'"}
     */
}
