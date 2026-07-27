LOTR SDK – Local Development Guide

This SDK provides a typed interface for interacting with The One API (LOTR API). It is designed for local testing inside this repository, not for npm installation.

Requirements
Node.js 18+

LOTR API key stored in environment variable:
export LOTR_API_KEY=your_key_here

Running the Example
The example.ts file demonstrates how to use the SDK locally.

Run it with ts-node using:
npm start

This executes example.ts, which:
Initializes the HttpClient
Fetches all movies
Fetches a single movie
Fetches quotes for a movie
Filters quotes
Fetches a single quote

Running Tests
The SDK uses Mocha, Chai, and Sinon.

Run all tests:
npm test

Building the SDK
Compile TypeScript into dist/:
npm run build

This produces:
dist/
index.js
index.d.ts
client/
services/
models/

NPM Scripts Overview

build
Compiles TypeScript into dist/.

test
Runs the full Mocha test suite.

coverage
Generates test coverage reports.

start
Runs example.ts using ts-node.

Project Structure

src/
    client/
        http-client.ts
        query.ts
        index.ts
    index.ts
    services/
        MovieService.ts
        QuotesService.ts
        index.ts
    models/
        Movie.ts
        Quote.ts
        index.ts
        Api/
            ApiResponse.ts
            index.ts
            QueryOptions.ts
    index.ts
example.ts
test/
dist/
package.json
tsconfig.json
tsconfig.build.json
tsconfig.spec.json
design.md
README.md

Notes
This SDK is currently intended for local development only.
It is structured so it can be packaged for npm in the future.
All public exports are defined in src/index.ts.