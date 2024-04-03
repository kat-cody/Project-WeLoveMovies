const knex = require("../db/connection");

const listAllTheaters = () => knex("theaters").select("*");

const addMovieList = (theaterId) =>{
    return knex("movies_theaters as mt")
            .join("movies as m", "m.movie_id", "mt.movie_id")// Joins the movies_theaters table with the movies table.
            .where({theater_id: theaterId})
            .select("m.*", "mt.created_at", "mt.updated_at", "mt.is_showing", "mt.theater_id")// Selects all columns from the movies table and specific columns from the movies_theaters table.
}

module.exports = {
  listAllTheaters, addMovieList,
};