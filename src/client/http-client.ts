import axios, { AxiosInstance } from "axios";
import { MoviesService, QuotesService } from "../services";

export class HttpClient {
    private readonly baseUrl = "https://the-one-api.dev/v2";
    public readonly movies: MoviesService;
    public readonly quotes: QuotesService;
    private readonly client: AxiosInstance;

    constructor(apiKey: string | undefined, injectedClient?: any) {
        // Attempt to connect to the LOTR Api (The One Api)
        this.client = injectedClient ?? this.createAxiosInstance(apiKey);

        // Initiate services
        this.movies = new MoviesService(this.client);
        this.quotes = new QuotesService(this.client);
    }
    
    /**
     * Creates a configured Axios instance for communicating with the LOTR API.
     *
     * Configuration includes:
     * - Base URL: https://the-one-api.dev/v2
     * - Authorization header containing the LOTR API key
     * - Default timeout of 8000ms
     *
     * Also registers a response interceptor that:
     * - Throws a descriptive network error when no response is received
     * - Throws a LOTR API error when the API returns a non-2xx status
     *
     * @private
     * @param apiKey LOTR API key required for authenticated requests.
     * @returns AxiosInstance Configured Axios client.
     *
     * @throws Error if apiKey is missing.
     */
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