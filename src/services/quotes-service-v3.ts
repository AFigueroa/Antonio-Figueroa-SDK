import { AxiosInstance } from "axios";
import { QueryOptions } from "../models/api";
import { V3ApiResponse } from "../models/api/v3";
import { Quote } from "../models";
import { buildQueryParams } from "../client";

export class QuotesServiceV3 {
    constructor(private client: AxiosInstance) { }

    async getAll(options?: QueryOptions): Promise<V3ApiResponse<Quote>> {
        const params = buildQueryParams(options);
        const res = await this.client.get<V3ApiResponse<Quote>>("/quote", { params });
        return res.data;
    }

    async getQuoteById(id: string): Promise<V3ApiResponse<Quote>> {
        if (!id) {
            throw new Error("Missing QuoteId on getQuoteById method");
        }
        const res = await this.client.get<V3ApiResponse<Quote>>(`/quote/${id}`);
        return res.data;
    }
}
