
<template>
  <div>
    <h1>Movie Searcher!</h1>
    <div>
      <label for="movie_title_input">Movie Title:</label>
      <input id="movie_title_input" type="text" placeholder="Movie Title"/>
    </div>
    <div>
      <button type="button" @click="getMovies">Search</button>
    </div>
    <div id="movie_container"></div>
  </div>
</template>

<script setup>
  function getMovies() {
    let input = document.getElementById('movie_title_input').value;
    const url = 'http://localhost:3001/?search=' + input;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    };
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        let htmlString = "";
        for (let movies in json) {
          htmlString = "<div id='movie_'" + movies.movie_id + ">" + movies.title + "</div>";
          htmlString += "<div><img src=' + movies.poster_image_url + '/></div";
          htmlString += "<div>" + movies.popularity_summary+ "</div>";
        }

        document.getElementById('movie_container').innerHTML(htmlString);
      });
  }
</script>