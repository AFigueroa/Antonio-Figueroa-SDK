import { AxiosInstance } from "axios";
import { ApiResponse, QueryOptions } from "../models/Api";
import { Movie, Quote } from "../models";
import { buildQueryParams } from "../client";

export class MoviesService {
    constructor(private client: AxiosInstance) { }

    async getAll(options?: QueryOptions): Promise<ApiResponse<Movie>> {
        const params = buildQueryParams(options);
        const { data } = await this.client.get<ApiResponse<Movie>>("/movie", { params });
        return data;
    }

    async getMovieById(id: string) {
        // Check for movie id
        if (!id) {
            throw new Error("Missing MovieId on getMovieById method");
        }
        const res = await this.client.get<{ docs: Movie[] }>(`/movie/${id}`);
        return res.data.docs[0];
    }

    async getMovieQuotes(id: string, options?: QueryOptions) {
        // Check for movie id
        if (!id) {
            throw new Error("Missing MovieId on getMovieQuotes method");
        }
        const params = buildQueryParams(options);
        const res = await this.client.get<{ docs: Quote[] }>(`/movie/${id}/quote`, { params });
        return res.data.docs;
    }
}