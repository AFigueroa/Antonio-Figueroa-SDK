export interface ApiPaginationOptions {
    limit: Limit;
    page: Page;
    offset: Offset;
}

export class Limit {
    key: string = "limit";
    value: number = 10;
}

export class Page {
    key: string = "page";
    value: number = 1;
}

export class Offset {
    key: string = "offset";
    value: number = 0;
}