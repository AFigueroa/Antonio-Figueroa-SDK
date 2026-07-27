import {HttpClient} from "./src";
import { QueryOptions } from "./src/models/Api";

async function init () {
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
    const params: QueryOptions = {
        limit: 10,
        page: 1,
        offset: 0,
        //sort: "dialog|asc", // TODO debug sorting 500 error
        filter: {character: "5cd99d4bde30eff6ebccfca7"} // TODO debug why filtering is not working
    };
    const allQuotesFromMovie = await client.movies?.getMovieQuotes("5cd95395de30eff6ebccde5d", params);
    console.log("----------------------------------");
    console.log("All quotes from movie");
    console.log("----------------------------------");
    console.log(allQuotesFromMovie);

}

init();
