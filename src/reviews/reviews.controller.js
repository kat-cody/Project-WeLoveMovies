const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function hasMovieId(req, res, next) {
  if (req.params.movieId) return next();

  methodNotAllowed(req, res, next);
}

function noMovieId(req, res, next) {
  if (req.params.movieId) {
    return methodNotAllowed(req, res, next);
  }
  next();
}

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found.`,
  });
}

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

async function destroy(_, res) {
  await service.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

async function list(req, res) {
  const data = await service.list(req.params.movieId);
  res.json({ data });
}

module.exports = {
  update: [
    noMovieId,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
  delete: [
    noMovieId,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieId, asyncErrorBoundary(list)],
};