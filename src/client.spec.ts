import { assert } from 'chai';
import {LotrSDK} from ".";

describe("LotrSDK", function () {
  it("should initiate client", async function () {
    const client = new LotrSDK();
    const movies = await client.movies?.getAll();
    assert.isArray(movies?.docs, "Error: movies.docs is not and array.");
    assert.isAbove(movies?.docs.length || 0, 0, "Error: No movies were found.");
  });
});