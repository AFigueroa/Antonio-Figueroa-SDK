import {LotrSDK} from "./src";

async function init () {
    const lotrSDK = new LotrSDK(process.env.LOTR_API_KEY);
    const movies = await lotrSDK.movies.getAll();
    console.log(movies.docs[0]);
}

init();
