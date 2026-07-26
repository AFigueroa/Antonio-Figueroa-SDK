import { AxiosInstance } from "axios";
import { ApiResponse } from "../types/Api/ApiResponse";
import { Movie } from "../types/Movie";

export default class MoviesService {
    constructor(private client: AxiosInstance) {}

    async getAll(): Promise<ApiResponse<Movie>> {
        const { data } = await this.client.get<ApiResponse<Movie>>("/movie");
        return data;
    }
}