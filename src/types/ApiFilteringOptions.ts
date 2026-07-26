export interface ApiFilteringOption {
    key: string;
    value: string | number;
    operator: ApiFilteringOperators;
}

export enum ApiFilteringOperators {
    match = "=",
    negateMatch = "!=",
    exist = "?",
    existsNot = "?!",
    lessThan = "<",
    lessAndEqual = "<=",
    greaterThan = ">",
    greaterAndEqual = ">="
}