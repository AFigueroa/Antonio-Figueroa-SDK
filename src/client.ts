import axios from "axios";
import { MoviesService } from "./services";

export class LotrSDK {
    public readonly movies: MoviesService;

    constructor(apiKey: string| undefined) {
        const lotrApi = axios.create({
            baseURL: "https://the-one-api.dev/v2",
            headers : {
                Authorization: `Bearer ${apiKey}`
            }
        });

        this.movies = new MoviesService(lotrApi)
    }
}