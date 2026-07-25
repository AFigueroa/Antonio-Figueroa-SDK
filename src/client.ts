import axios, {AxiosInstance} from "axios";

export default class LotrSDK {
    private http: AxiosInstance;

    constructor(apiKey: string) {
        this.http = axios.create({
            baseURL: "https://the-one-api.dev/v2",
            headers : {
                Authorization: `Bearer ${apiKey}`
            }
        });
    }
}