const knex = require("../db/connection");

function readTheater(theater_id) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("m.*", "mt.theater_id", "mt.is_showing")
    .where({ "mt.theater_id": theater_id });
}

async function foundMovies(theater) {
  theater.movies = await readTheater(theater.theater_id);
  return theater;
}

function read(movie_id) {
  return knex("theaters")
    .join("movies_theaters as mt", "theaters.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("theaters.*")
    .where({ "m.movie_id": movie_id })
    .groupBy("theaters.theater_id");
}

async function list() {
  return knex("theaters")
    .select("*")
    .then((theaters) => Promise.all(theaters.map(foundMovies)));
}

module.exports = {
  read,
  list,
};