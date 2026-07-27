import { expect } from "chai";
import sinon from "sinon";
import { HttpClient } from "../src/client/http-client";

describe("HttpClient", () => {

  it("throws error when API key is missing", () => {
    expect(() => new HttpClient(undefined)).to.throw(
      "Missing LOTR_API_KEY environment variable"
    );
  });

  it("initializes MoviesService and Axios client", () => {
    const fakeClient: any = {
      get: sinon.stub().resolves({ data: {} }),
      interceptors: {
        request: { use: sinon.stub(), eject: sinon.stub(), clear: sinon.stub() },
        response: { use: sinon.stub(), eject: sinon.stub(), clear: sinon.stub() }
      },
      defaults: { headers: {} }
    };

    const client = new HttpClient("test-key", fakeClient);
    // Client is private to prevent exposing to public on usage
    expect(client.client).to.equal(fakeClient);
    expect(client.movies).to.exist;
  });

  // TODO: debug Axios mock's error response comming in null
  // it("throws network error when no response is received", async () => {
  //   const fakeClient: any = {
  //     get: sinon.stub().rejects({
  //       code: "ECONNREFUSED",
  //       response: undefined
  //     }),
  //     interceptors: {
  //       request: { use: sinon.stub(), eject: sinon.stub(), clear: sinon.stub() },
  //       response: {
  //         use: (_ok: any, onError: any) => {
  //           return onError({
  //             code: "ECONNREFUSED",
  //             response: undefined
  //           });
  //         },
  //         eject: sinon.stub(),
  //         clear: sinon.stub()
  //       }
  //     },
  //     defaults: { headers: {} }
  //   };

  //   const client = new HttpClient("test-key", fakeClient);

  //   try {
  //     await client.client.get("/movie");
  //   } catch (err) {
  //     expect((err as Error).message).to.equal(
  //       "Network error (ECONNREFUSED): Failed to connect to LOTR API"
  //     );
  //   }
  // });

  // it("throws LOTR API error on non-2xx response", async () => {
  //   const fakeClient: any = {
  //     get: sinon.stub().rejects({
  //       response: { status: 404, statusText: "Not Found" }
  //     }),
  //     interceptors: {
  //       request: { use: sinon.stub(), eject: sinon.stub(), clear: sinon.stub() },
  //       response: {
  //         use: (_ok: any, onError: any) => {
  //           return onError({
  //             response: { status: 404, statusText: "Not Found" }
  //           });
  //         },
  //         eject: sinon.stub(),
  //         clear: sinon.stub()
  //       }
  //     },
  //     defaults: { headers: {} }
  //   };

  //   const client = new HttpClient("test-key", fakeClient);

  //   try {
  //     await client.client.get("/movie");
  //   } catch (err) {
  //     expect((err as Error).message).to.equal(
  //       "Network error (ECONNREFUSED): Failed to connect to LOTR API"
  //     );
  //   }
  // });
});
