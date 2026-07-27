import { AxiosInstance } from "axios";
import { ApiResponse, QueryOptions } from "../models/api";
import { Movie, Quote } from "../models";
import { buildQueryParams } from "../client";

export class MoviesService {
    constructor(private client: AxiosInstance) { }

    /**
     * Retrieves all movies.
     *
     * Endpoint: GET /movie
     * Supports pagination and filtering.
     *
     * @param options Query options.
     * @returns ApiResponse<Movie>
     */
    async getAll(options?: QueryOptions): Promise<ApiResponse<Movie>> {
        const params = buildQueryParams(options);
        const { data } = await this.client.get<ApiResponse<Movie>>("/movie", { params });
        return data;
    }

    /**
     * Retrieves a single movie by ID.
     *
     * Endpoint: GET /movie/{id}
     * Does NOT support query params.
     *
     * @param id Movie ID
     * @throws Error if id is missing
     * @returns Movie
     */
    async getMovieById(id: string) {
        // Check for movie id
        if (!id) {
            throw new Error("Missing MovieId on getMovieById method");
        }
        const res = await this.client.get<{ docs: Movie[] }>(`/movie/${id}`);
        return res.data.docs[0];
    }

    /**
     * Retrieves all quotes for a specific movie.
     *
     * Endpoint: GET /movie/{id}/quote
     * Supports pagination and filtering.
     *
     * @param id Movie ID
     * @param options Query options.
     * @throws Error if id is missing
     * @returns Quote[]
     */
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