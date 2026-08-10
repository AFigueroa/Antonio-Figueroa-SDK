import axios, { AxiosInstance } from "axios";
import { MoviesService, MoviesServiceV3, QuotesService, QuotesServiceV3 } from "../services";

export class HttpClient {
    private readonly baseUrl = "https://the-one-api.dev/v2";
    private readonly v3BaseUrl = "https://the-one-api.dev/v3";
    public readonly movies: MoviesService | MoviesServiceV3;
    public readonly quotes: QuotesService | QuotesServiceV3;
    private readonly client: AxiosInstance;

    constructor(apiKey: string | undefined, injectedClient?: any, version: 'v2' | 'v3' = 'v2') {
        const { client, movies, quotes } = this.initializeClientAndServices(apiKey, injectedClient, version);
        this.client = client;
        this.movies = movies;
        this.quotes = quotes;
    }

    private initializeClientAndServices(
        apiKey: string | undefined,
        injectedClient: any,
        version: 'v2' | 'v3'
    ): { client: AxiosInstance; movies: MoviesService | MoviesServiceV3; quotes: QuotesService | QuotesServiceV3 } {
        const baseURL = version === 'v3' ? this.v3BaseUrl : this.baseUrl;
        const client = injectedClient ?? this.createAxiosInstance(apiKey, baseURL);

        const movies = version === 'v3'
            ? new MoviesServiceV3(client)
            : new MoviesService(client);

        const quotes = version === 'v3'
            ? new QuotesServiceV3(client)
            : new QuotesService(client);

        return { client, movies, quotes };
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
    private createAxiosInstance(apiKey: string | undefined, baseURL: string): AxiosInstance {
        // Check for apiKey
        if (!apiKey) {
            throw new Error("Missing LOTR_API_KEY environment variable");
        }
        // Api key found. Connect to the api
        const client = axios.create({
            baseURL,
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