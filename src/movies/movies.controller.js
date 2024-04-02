const service = require("./movies.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  res.json({ data: res.locals.movies });
}

// - `GET /movies?is_showing=true` Middleware
async function isShowing(req, res, next) {
  const { is_showing } = req.query;

  if (is_showing) {
    res.locals.movies = await service.moviesShowing();
  } else {
    res.locals.movies = await service.list();
  }
  next();
}

async function read(req, res, next) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function listMatchingTheaters(req, res, next) {
  const id = res.locals.movie.movie_id;
  res.json({ data: await service.listMatchingTheaters(id) });
}

async function listMatchingReviews(req, res, next){
  const id = res.locals.movie.movie_id;
  res.json({ data: await service.listMatchingReviews(id) });
}

module.exports = {
  list: [asyncErrorBoundary(isShowing), asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  findTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listMatchingTheaters)],
  findReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listMatchingReviews)],
};