import assert from "node:assert/strict";
import {LotrSDK} from "../src";

describe("add", function () {
  it("should add two numbers", function () {
    const apiKey = process.env.LOTR_API_KEY;
    if (apiKey) {
        const client = new LotrSDK(apiKey);
        console.log(client);
        assert.notEqual(client, null);
    }
  });
});