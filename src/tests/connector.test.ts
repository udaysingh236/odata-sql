import { DbTypes, odataSql } from '..';
import { arithFuncs, arithFuncsResMssql, dtTimeFunc, dtTimeFuncResMsSql, operatorFilterStr, optrFilterResMsSql, stringFuncs, stringFuncsResMsSql } from './allTestInOutput';

describe('Test create filter for MsSql', () => {
    const odataSqlMsSql = odataSql({ dbType: DbTypes.MsSql });
    test('Comparision, Logical, Arithmetic and Grouping should be equal to the expected result', () => {
        const result = odataSqlMsSql.createFilter(operatorFilterStr);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(optrFilterResMsSql.where);
        expect(parameter).toEqual(optrFilterResMsSql.parameters);
    });

    test('String functions output should be equal to the expected result', () => {
        const result = odataSqlMsSql.createFilter(stringFuncs);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(stringFuncsResMsSql.where);
        expect(parameter).toEqual(stringFuncsResMsSql.parameters);
    });

    test('Date and time function output should be equal to the expected result', () => {
        const result = odataSqlMsSql.createFilter(dtTimeFunc);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(dtTimeFuncResMsSql.where);
        expect(parameter).toEqual(dtTimeFuncResMsSql.parameters);
    });

    test('Arithmatic function output should be equal to the expected result', () => {
        const result = odataSqlMsSql.createFilter(arithFuncs);
        const parameter = Object.fromEntries(result.parameters!);
        expect(result.where).toEqual(arithFuncsResMssql.where);
        expect(parameter).toEqual(arithFuncsResMssql.parameters);
    });
});
