import { expect } from "chai";
import sinon from "sinon";
import { QuotesServiceV3 } from "../../src/services";

const v3Response = (records: any[]) => ({
    data: records,
    metadata: { total: records.length, limit: 10, offset: 0, page: 1, pages: 1 }
});

describe("QuotesServiceV3", () => {
    let client: any;
    let service: QuotesServiceV3;

    beforeEach(() => {
        client = { get: sinon.stub() };
        service = new QuotesServiceV3(client);
    });

    describe("getAll", () => {
        it("should get all quotes", async () => {
            client.get.resolves({ data: v3Response([{ dialog: "Fly, you fools!" }]) });

            const result = await service.getAll({ limit: 5 });

            expect(client.get.calledOnce).to.be.true;
            expect(result.data[0].dialog).to.equal("Fly, you fools!");
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
                data: v3Response([{ dialog: "One does not simply walk into Mordor." }])
            });

            const quote = await service.getQuoteById("abc");

            expect(client.get.calledOnce).to.be.true;
            expect(quote.data[0].dialog).to.equal("One does not simply walk into Mordor.");
        });
    });
});
