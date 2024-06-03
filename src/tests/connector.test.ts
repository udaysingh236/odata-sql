import { DbTypes, odataSql } from '..';
import * as testVars from './allTestInOutput';

describe('Test create filter for MsSql', () => {
    const odataSqlMsSql = odataSql({ dbType: DbTypes.MsSql });
    test('Comparision, Logical, Arithmetic and Grouping should be equal to the expected result', () => {
        const result = odataSqlMsSql.createFilter(testVars.operatorFilterStr);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.optrFilterResMsSql.where);
        expect(parameter).toEqual(testVars.optrFilterResMsSql.parameters);
    });

    test('String functions output should be equal to the expected result', () => {
        const result = odataSqlMsSql.createFilter(testVars.stringFuncs);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.stringFuncsResMsSql.where);
        expect(parameter).toEqual(testVars.stringFuncsResMsSql.parameters);
    });

    test('Date and time function output should be equal to the expected result', () => {
        const result = odataSqlMsSql.createFilter(testVars.dtTimeFunc);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.dtTimeFuncResMsSql.where);
        expect(parameter).toEqual(testVars.dtTimeFuncResMsSql.parameters);
    });

    test('Arithmatic function output should be equal to the expected result', () => {
        const result = odataSqlMsSql.createFilter(testVars.arithFuncs);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.arithFuncsResMssql.where);
        expect(parameter).toEqual(testVars.arithFuncsResMssql.parameters);
    });
});

describe('Test create filter for Oracle', () => {
    const odataSqlOracle = odataSql({ dbType: DbTypes.Oracle });
    test('Comparision, Logical, Arithmetic and Grouping should be equal to the expected result', () => {
        const result = odataSqlOracle.createFilter(testVars.operatorFilterStr);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.optrFilterResOracle.where);
        expect(parameter).toEqual(testVars.optrFilterResOracle.parameters);
    });

    test('String functions output should be equal to the expected result', () => {
        const result = odataSqlOracle.createFilter(testVars.stringFuncs);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.stringFuncsResOracle.where);
        expect(parameter).toEqual(testVars.stringFuncsResOracle.parameters);
    });

    test('Date and time function output should be equal to the expected result', () => {
        const result = odataSqlOracle.createFilter(testVars.dtTimeFunc);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.dtTimeFuncResOracle.where);
        expect(parameter).toEqual(testVars.dtTimeFuncResOracle.parameters);
    });

    test('Arithmatic function output should be equal to the expected result', () => {
        const result = odataSqlOracle.createFilter(testVars.arithFuncs);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.arithFuncsResOracle.where);
        expect(parameter).toEqual(testVars.arithFuncsResOracle.parameters);
    });
});

describe('Test create filter for MySql', () => {
    const odataSqlMysql = odataSql({ dbType: DbTypes.MySql });
    test('Comparision, Logical, Arithmetic and Grouping should be equal to the expected result', () => {
        const result = odataSqlMysql.createFilter(testVars.operatorFilterStr);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.optrFilterResMysql.where);
        expect(parameter).toEqual(testVars.optrFilterResMysql.parameters);
    });

    test('String functions output should be equal to the expected result', () => {
        const result = odataSqlMysql.createFilter(testVars.stringFuncs);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.stringFuncsResMysql.where);
        expect(parameter).toEqual(testVars.stringFuncsResMysql.parameters);
    });

    test('Date and time function output should be equal to the expected result', () => {
        const result = odataSqlMysql.createFilter(testVars.dtTimeFunc);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.dtTimeFuncResMysql.where);
        expect(parameter).toEqual(testVars.dtTimeFuncResMysql.parameters);
    });

    test('Arithmatic function output should be equal to the expected result', () => {
        const result = odataSqlMysql.createFilter(testVars.arithFuncs);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.arithFuncsResMysql.where);
        expect(parameter).toEqual(testVars.arithFuncsResMysql.parameters);
    });
});

describe('Test create filter for Postgres', () => {
    const odataSqlPostgres = odataSql({ dbType: DbTypes.PostgreSql });
    test('Comparision, Logical, Arithmetic and Grouping should be equal to the expected result', () => {
        const result = odataSqlPostgres.createFilter(testVars.operatorFilterStr);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.optrFilterResPostgres.where);
        expect(parameter).toEqual(testVars.optrFilterResPostgres.parameters);
    });

    test('String functions output should be equal to the expected result', () => {
        const result = odataSqlPostgres.createFilter(testVars.stringFuncs);
        if (result.error) {
        }
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.stringFuncsResPostgres.where);
        expect(parameter).toEqual(testVars.stringFuncsResPostgres.parameters);
    });

    test('Date and time function output should be equal to the expected result', () => {
        const result = odataSqlPostgres.createFilter(testVars.dtTimeFunc);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.dtTimeFuncResPostgres.where);
        expect(parameter).toEqual(testVars.dtTimeFuncResPostgres.parameters);
    });

    test('Arithmatic function output should be equal to the expected result', () => {
        const result = odataSqlPostgres.createFilter(testVars.arithFuncs);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(testVars.arithFuncsResPostgres.where);
        expect(parameter).toEqual(testVars.arithFuncsResPostgres.parameters);
    });
});
