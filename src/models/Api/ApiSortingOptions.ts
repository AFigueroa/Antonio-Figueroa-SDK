export interface ApiSortingOption {
    sortingType: string;
    parameter: string;
    value: string;
    operator: ApiSortingOperators;
}

export enum ApiSortingOperators {
    ascending = "asc",
    descending = "desc",
}