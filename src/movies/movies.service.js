const knex = require("../db/connection");

function isShowing() {
  return knex("movies")
    .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
    .select("movies.*")
    .where({ "mt.is_showing": true })
    .groupBy("movies.movie_id");
}

function read(movie_id) {
  return knex("movies")
    .where({ movie_id })
    .first();
}

function list() {
  return knex("movies").select("*");
}

module.exports = {
  isShowing,
  read,
  list,
};