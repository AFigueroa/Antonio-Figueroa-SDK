import { AxiosInstance } from "axios";
import { QueryOptions } from "../models/api";
import { V3ApiResponse } from "../models/api/v3";
import { Movie, Quote } from "../models";
import { buildQueryParams } from "../client";

export class MoviesServiceV3 {
    constructor(private client: AxiosInstance) { }

    async getAll(options?: QueryOptions): Promise<V3ApiResponse<Movie>> {
        const params = buildQueryParams(options);
        const res = await this.client.get<V3ApiResponse<Movie>>("/movie", { params });
        return res.data;
    }

    async getMovieById(id: string): Promise<V3ApiResponse<Movie>> {
        if (!id) {
            throw new Error("Missing MovieId on getMovieById method");
        }
        const res = await this.client.get<V3ApiResponse<Movie>>(`/movie/${id}`);
        return res.data;
    }

    async getMovieQuotes(id: string, options?: QueryOptions): Promise<V3ApiResponse<Quote>> {
        if (!id) {
            throw new Error("Missing MovieId on getMovieQuotes method");
        }
        const params = buildQueryParams(options);
        const res = await this.client.get<V3ApiResponse<Quote>>(`/movie/${id}/quote`, { params });
        return res.data;
    }
}
