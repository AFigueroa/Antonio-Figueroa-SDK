import { expect } from "chai";
import sinon from "sinon";
import { MoviesService } from "../../src/services";

describe("MoviesService", () => {
  let client: any;
  let service: MoviesService;

  beforeEach(() => {
    client = { get: sinon.stub() };
    service = new MoviesService(client);
  });

  describe("getAll", () => {
    it("should get all movies", async () => {
      client.get.resolves({ data: { docs: [{ name: "Test Movie" }] } });

      const result = await service.getAll({ limit: 10 });

      expect(client.get.calledOnce).to.be.true;
      expect(result.docs[0].name).to.equal("Test Movie");
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
      client.get.resolves({ data: { docs: [{ _id: "123", name: "Movie" }] } });

      const movie = await service.getMovieById("123");

      expect(client.get.calledOnce).to.be.true;
      expect(movie.name).to.equal("Movie");
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

    it("returns quote docs", async () => {
      client.get.resolves({
        data: { docs: [{ _id: 123, dialog: "A wizard is never late." }] }
      });

      const quotes = await service.getMovieQuotes("123");

      expect(client.get.calledOnce).to.be.true;
      expect(quotes[0].dialog).to.equal("A wizard is never late.");
    });
  });
});
