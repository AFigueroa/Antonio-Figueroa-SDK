import { AxiosInstance } from "axios";
import { ApiResponse, QueryOptions } from "../models/api";
import { Quote } from "../models";
import { buildQueryParams } from "../client";

export class QuotesService {
    constructor(private client: AxiosInstance) { }

    /**
     * Retrieves all quotes.
     *
     * Endpoint: GET /quote
     * Supports pagination and filtering.
     *
     * @param options Query options for list endpoints.
     * @returns ApiResponse<Quote>
     */
    async getAll(options?: QueryOptions): Promise<ApiResponse<Quote>> {
        const params = buildQueryParams(options);
        const { data } = await this.client.get<ApiResponse<Quote>>("/quote", { params });
        return data;
    }

    /**
     * Retrieves a single quote by ID.
     *
     * Endpoint: GET /quote/{id}
     * Does NOT support query params.
     *
     * @param id Quote ID
     * @throws Error if id is missing
     * @returns Quote
     */
    async getQuoteById(id: string) {
        // Check for Quote id
        if (!id) {
            throw new Error("Missing QuoteId on getQuoteById method");
        }
        const res = await this.client.get<{ docs: Quote[] }>(`/quote/${id}`);
        return res.data.docs[0];
    }

}