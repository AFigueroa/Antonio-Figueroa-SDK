export interface QueryOptions {
    limit?: number;
    page?: number;
    offset?: number;
    sort?: string; // e.g. "name:asc"
    filter?: Record<string, string | number>;
}