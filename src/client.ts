import axios, { AxiosInstance } from "axios";
import { MoviesService } from "./services";

export class LotrSDK {
    public readonly movies: MoviesService | undefined;

    constructor() {
        // API Key found. Connect to The One API
        const client = this.createAxiosInstance();

        // Initiate MoviesService
        this.movies = new MoviesService(client);
    }
    
    createAxiosInstance(): AxiosInstance {
        // Get Api key from Environment variables
        const apiKey = process.env.LOTR_API_KEY;
        if (apiKey) {
            return axios.create({
                baseURL: "https://the-one-api.dev/v2",
                headers : {
                    Authorization: `Bearer ${apiKey}`
                }
            });
        } else {
            // Log error Missing API Key
            // Return a fallback instance so the method always returns something
            throw new Error("Missing LOTR_API_KEY environment variable");
        }
    }
}