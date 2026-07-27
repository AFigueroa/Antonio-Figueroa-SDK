export interface ApiFilteringOption {
    filterType: string;
    parameter: string;
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