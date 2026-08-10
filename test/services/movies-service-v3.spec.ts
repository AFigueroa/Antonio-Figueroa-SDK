import { expect } from "chai";
import sinon from "sinon";
import { MoviesServiceV3 } from "../../src/services";

const v3Response = (records: any[]) => ({
    data: records,
    metadata: { total: records.length, limit: 10, offset: 0, page: 1, pages: 1 }
});

describe("MoviesServiceV3", () => {
    let client: any;
    let service: MoviesServiceV3;

    beforeEach(() => {
        client = { get: sinon.stub() };
        service = new MoviesServiceV3(client);
    });

    describe("getAll", () => {
        it("should get all movies", async () => {
            client.get.resolves({ data: v3Response([{ name: "Test Movie" }]) });

            const result = await service.getAll({ limit: 10 });

            expect(client.get.calledOnce).to.be.true;
            expect(result.data[0].name).to.equal("Test Movie");
        });
    });

    describe("getMovieById", () => {
        it("throws error when id is missing", async () => {
            try {
                await service.getMovieById("");
            } catch (err) {
                expect((err as Error).message).to.equal(
                    "Missing MovieId on getMovieById method"
                );
            }
        });

        it("returns movie by id", async () => {
            client.get.resolves({ data: v3Response([{ _id: "123", name: "Movie" }]) });

            const movie = await service.getMovieById("123");

            expect(client.get.calledOnce).to.be.true;
            expect(movie.data[0].name).to.equal("Movie");
        });
    });

    describe("getMovieQuotes", () => {
        it("throws when id is missing", async () => {
            try {
                await service.getMovieQuotes("");
            } catch (err) {
                expect((err as Error).message).to.equal(
                    "Missing MovieId on getMovieQuotes method"
                );
            }
        });

        it("returns quote data", async () => {
            client.get.resolves({
                data: v3Response([{ _id: 123, dialog: "A wizard is never late." }])
            });

            const quotes = await service.getMovieQuotes("123");

            expect(client.get.calledOnce).to.be.true;
            expect(quotes.data[0].dialog).to.equal("A wizard is never late.");
        });
    });
});
