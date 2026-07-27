import { assert } from "chai";
import { MoviesService } from "../../src/services";
import { HttpClient } from "../../src/client";

// E2E Tests for MoviesSevice using Live API calls
describe("MoviesService", () => {
    let client = new HttpClient(process.env.LOTR_API_KEY).client;
    let service = new MoviesService(client);

    it("should return all movies", async () => {
        const movies = await service.getAll();
        assert.isArray(movies.docs, "Error: movies.docs is not and array.");
        assert.isAbove(movies.docs.length, 0, "Error: No movies were found.");
    });
    
});