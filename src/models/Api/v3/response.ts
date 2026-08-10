export interface V3ApiResponseMetadata {
    total: number;
    limit: number;
    offset: number;
    page: number;
    pages: number;
}

export interface V3ApiResponse<T> {
    data: T[];
    metadata: V3ApiResponseMetadata;
}
