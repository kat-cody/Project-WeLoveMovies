const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")


// Adds an array titled "movies", with information about the specific
// movies currently showing in that theater.

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  is_showing: ["movies", null, "is_showing"],
})

// Lists all the theaters, the adds the movies array/ properties

async function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*", "m.*", "mt.*")
    .then(reduceMovies)
}

module.exports = { list };