import { AxiosInstance } from "axios";
import { ApiResponse, QueryOptions } from "../models/Api";
import { Quote } from "../models";
import { buildQueryParams } from "../client";

export class QuotesService {
    constructor(private client: AxiosInstance) { }

    async getAll(options?: QueryOptions): Promise<ApiResponse<Quote>> {
        const params = buildQueryParams(options);
        const { data } = await this.client.get<ApiResponse<Quote>>("/quote", { params });
        return data;
    }

    async getQuoteById(id: string) {
        // Check for Quote id
        if (!id) {
            throw new Error("Missing QuoteId on getQuoteById method");
        }
        const res = await this.client.get<{ docs: Quote[] }>(`/quote/${id}`);
        return res.data.docs[0];
    }

}