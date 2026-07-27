import {HttpClient} from "./src";
import { QueryOptions } from "./src/models/Api";

async function init () {
    // Initiate Client using local environment variables
    const client = new HttpClient(process.env.LOTR_API_KEY);

    // All movies no query options
    const movies = await client.movies?.getAll();
    console.log("----------------------------------");
    console.log("All movies");
    console.log("----------------------------------");
    console.log(movies?.docs);

    // Get one movie by id
    const singleMovie = await client.movies?.getMovieById("5cd95395de30eff6ebccde56");
    console.log("----------------------------------");
    console.log("Single Movie",);
    console.log("----------------------------------");
    console.log(singleMovie);

    // Get all quotes from movie by id (pagination)
    let params: QueryOptions = {
        limit: 10,
        page: 1,
        offset: 0
    };
    const allQuotesFromMovie = await client.movies?.getMovieQuotes("5cd95395de30eff6ebccde5d", params);
    console.log("----------------------------------");
    console.log("All quotes from movie");
    console.log("----------------------------------");
    console.log(allQuotesFromMovie);

    // Get all quotes (filtered)
    params = {
        limit: 10,
        page: 1,
        offset: 0,
        filter: {character: "5cd99d4bde30eff6ebccfca7"}
    };
    
    const allQuotes = await client.quotes?.getAll(params);
    console.log("----------------------------------");
    console.log("All quotes filtered by CharacterId");
    console.log("----------------------------------");
    console.log(allQuotes);

    // Get single quote by quoteId
    const singleQuote = await client.quotes?.getQuoteById("5cd96e05de30eff6ebcce7ef");
    console.log("----------------------------------");
    console.log("Single quote by QuoteId");
    console.log("----------------------------------");
    console.log(singleQuote);

}

init();
