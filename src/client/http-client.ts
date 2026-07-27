import axios, { AxiosInstance } from "axios";
import { MoviesService } from "../services";

export class HttpClient {
    private readonly baseUrl = "https://the-one-api.dev/v2";
    public readonly movies: MoviesService;
    public readonly client: AxiosInstance;

    constructor(apiKey: string | undefined, injectedClient?: any) {
        // Attempt to connect to the LOTR Api (The One Api)
        this.client = injectedClient ?? this.createAxiosInstance(apiKey);

        // Initiate MoviesService
        this.movies = new MoviesService(this.client);
    }
    
    private createAxiosInstance(apiKey: string | undefined): AxiosInstance {
        // Check for apiKey
        if (!apiKey) {
            throw new Error("Missing LOTR_API_KEY environment variable");
        }
        // Api key found. Connect to the api
        const client = axios.create({
            baseURL: this.baseUrl,
            headers : {
                Authorization: `Bearer ${apiKey}`
            },
            timeout: 8000
        });

        // Check that the connection was successful
        client.interceptors.response.use(
            (response) => response,
            (error) => {
                // Network errors (no response)
                if (!error.response) {
                    const code = error.code || "UNKNOWN";
                    throw new Error(`Network error (${code}): Failed to connect to LOTR API`);
                }

                // API returned non-2xx
                const { status, statusText } = error.response;
                throw new Error(`LOTR API error: ${status} ${statusText}`);
            }
        );

        return client;
    }
}