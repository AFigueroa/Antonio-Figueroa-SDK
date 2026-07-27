import { AxiosInstance } from "axios";
import { ApiResponse } from "../models/Api";
import { Movie } from "../models";

export class MoviesService {
    constructor(private client: AxiosInstance) {}

    async getAll(): Promise<ApiResponse<Movie>> {
        const { data } = await this.client.get<ApiResponse<Movie>>("/movie");
        return data;
    }
}