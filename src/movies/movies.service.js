const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const showAllMovies = () => knex("movies").select("*");

// Joins 'movies_theaters' table with 'movies' table on their movie_id,
// selects all columns from the joined tables, and filters to only include movies that are currently showing.
// After retrieving the list, it filters out duplicate movies based on their movie_id.
const showAllShowingMovies = () =>
  knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*")
    .where({ is_showing: true })
    .then((moviesBeingShown) => {
      return moviesBeingShown.filter((element, index, arr) => {
        return (
          index ===
          arr.findIndex((selected) => selected.movie_id === element.movie_id)
        );
      });
    });
// Accesses the 'movies' table, selects all columns, and filters to find the movie with the specified ID.
// Returns the first movie from the result.
const getMovie = (id) =>
  knex("movies")
    .select("*")
    .where({ movie_id: id })
    .then((movies) => movies[0]);

// Joins 'movies_theaters' table with 'theaters' table on their theater_id,
// selects all columns from the joined tables, and filters to find theaters where the specified movie is showing.
const getTheaters = (id) =>
  knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("*")
    .where({ movie_id: id, is_showing: true });

// Maps specific critic properties to a new object structure.
const formatCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// Joins 'reviews' table with 'critics' table on their critic_id, selects all columns from both tables,
// and filters to find reviews for the specified movie.
// After retrieving the list of reviews, it formats each review's critic data using the formatCritic function.
const getReviews = (id) =>
  knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ movie_id: id })
    .then((data) => {
      return Promise.all(data.map(formatCritic));
    });

module.exports = {
  showAllMovies,
  showAllShowingMovies,
  getMovie,
  getTheaters,
  getReviews,
};