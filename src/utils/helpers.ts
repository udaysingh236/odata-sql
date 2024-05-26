export const checkSpecialChar = (str: string) => /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/.test(str);
export const checkDigitOnly = (str: string) => /^\d+$/.test(str);
export const convertDataType = (str: string): number | string => {
    if (!checkSpecialChar(str) && checkDigitOnly(str)) {
        return parseInt(str);
    } else {
        return str;
    }
};
export const removeStartEndChar = (str: string): string => {
    return str.substring(1, str.length - 1);
};
