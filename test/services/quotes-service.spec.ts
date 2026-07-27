import { expect } from "chai";
import sinon from "sinon";
import { QuotesService } from "../../src/services";

describe("QuotesService", () => {
    let client: any;
    let service: QuotesService;

    beforeEach(() => {
        client = { get: sinon.stub() };
        service = new QuotesService(client);
    });

    describe("getAll", () => {
        it("should get all quotes", async () => {
            client.get.resolves({ data: { docs: [{ dialog: "Fly, you fools!" }] } });

            const result = await service.getAll({ limit: 5 });

            expect(client.get.calledOnce).to.be.true;
            expect(result.docs[0].dialog).to.equal("Fly, you fools!");
        });
    });

    describe("getQuoteById", () => {
        it("throws error when id is missing", async () => {
            try {
                await service.getQuoteById("");
            } catch (err) {
                expect((err as Error).message).to.equal(
                    "Missing QuoteId on getQuoteById method"
                );
            }
        });

        it("returns quote by id", async () => {
            client.get.resolves({
                data: { docs: [{ dialog: "One does not simply walk into Mordor." }] }
            });

            const quote = await service.getQuoteById("abc");

            expect(client.get.calledOnce).to.be.true;
            expect(quote.dialog).to.equal("One does not simply walk into Mordor.");
        });
    });
});