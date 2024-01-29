const express = require('express');
const app = express();
const port = 3001;
const fetch = require('node-fetch');

async function get_response(search) {
    const url = "https://api.themoviedb.org/3/search/movie?region=US&language=en-US&include_adult=false&api_key=62e6666d7eecb5bd1f00b3697b91f6bd&page=1&query=" + search;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    const res = await fetch(url, options);

    return res.json();
}

app.get('/', async (req, res) => {
    const search = req.query.search;

    //check for empty search or bad data here
    //return a 400 with an error

    const api_result = await get_response(search);

    const final_result = [];

    let loop_length = 10;

    if (api_result.total_results < 10) {
        loop_length = api_result.total_results;
    }

    const movie_results = api_result.results;

    for (let i = 0; i < 10; i++) {
        new_result = {
            'movie_id': movie_results[i].id,
            'title': movie_results[i].original_title,
            'poster_image_url': "https://image.tmdb.org/t/p/original" + movie_results[i].poster_path,
            'popularity_summary': movie_results[i].popularity + " rated out of " + movie_results[i].vote_count + " votes"
        }

        final_result.push(new_result);
    }

            res.send(final_result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})