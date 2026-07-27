import { AxiosInstance } from "axios";
import { ApiResponse, QueryOptions } from "../models/Api";
import { Movie } from "../models";
import { buildQueryParams } from "../client";

export class MoviesService {
    constructor(private client: AxiosInstance) { }

    async getAll(options?: QueryOptions): Promise<ApiResponse<Movie>> {
        const params = buildQueryParams(options);
        const { data } = await this.client.get<ApiResponse<Movie>>("/movie", { params });
        return data;
    }
}