import { assert } from 'chai';
import {LotrSDK} from ".";

describe("LotrSDK", function () {
  it("should initiate client", async function () {
    const apiKey = process.env.LOTR_API_KEY;
    const lotrSDK = new LotrSDK(apiKey);
    const movies = await lotrSDK.movies.getAll();
    assert.isArray(movies.docs, "Error: movies.docs is not and array.");
    assert.isAbove(movies.docs.length, 0, "Error: No movies were found.");
  });
});