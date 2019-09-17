require('dotenv').config({path: '../.env'})
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT;
const apiKey = `?api_key=${process.env.API_KEY}`;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('PORT 5000');
})


app.get('/movie/popular', (req, res) => {
    const baseUrl = 'https://api.themoviedb.org/3/movie/popular'
    const reqUrl = baseUrl + apiKey

    fetch(reqUrl)
    .then(res => res.json())
    .then(data => {
        res.send({ data })
    })
    .catch(err => {
        console.log(err)
    })
})

app.get("/search/movie", (req, res) => {
  const baseUrl = "https://api.themoviedb.org/3/search/movie";
  const query = `&query=${req.query["search"]}&include_adult=false`;
  const reqUrl = baseUrl + apiKey + query;

  fetch(reqUrl)
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/movie/:movie_id", (req, res) => {
    const movie_id = req.params.movie_id;
    const baseUrl = `https://api.themoviedb.org/3/movie/${movie_id}`;
    const reqUrl = baseUrl + apiKey;

    fetch(reqUrl)
        .then(res => res.json())
        .then(data => {
        res.send({ data });
        })
        .catch(err => {
        console.log(err);
        });
});

app.get("/movie/:movie_id/credits", (req, res) => {
  const movie_id = req.params.movie_id;
  const baseUrl = `https://api.themoviedb.org/3/movie/${movie_id}/credits`;
  const reqUrl = baseUrl + apiKey;

  fetch(reqUrl)
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    };
    console.log('Listening on port ' + port);
})