const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// Validation functions

async function movieExists(req, res, next) {

    const movie = await service.read(req.params.movieId)

    if (movie) {
        res.locals.movie = movie
        return next();
    }
    next({ status: 404, message: "Movie cannot be found." })
}

//-----------------------------------------------------------------//


// GET (/movies) returns all movies
// GET (/movies?is_showing=true) returns only movies that are currently showing in theaters

async function list(req, res) {

    const allMovies = await service.list();
    const currentlyShowing = await service.currentlyShowing();
    const isShowing = req.query.is_showing;
    const data = isShowing ? currentlyShowing : allMovies;

    res.json({ data });

}

// GET (/movies/:movieId) Read a specific movie by ID 

async function read(req, res, next) {

    const data = res.locals.movie;

    res.json({ data: data })

}


// Display theaters currently showing movie (/movies/:movieId/theaters)

async function listTheatersForMovie(req, res) {

    const { movieId } = req.params;
    const data = await service.listTheatersForMovie(movieId)

    res.json({ data })

}

// Display reviews related to a movie, with critic info

async function listReviewsForMovie(req, res) {

    const { movieId } = req.params;
    const data = await service.listReviewsForMovies(movieId)

    res.json({ data })
}


module.exports = {
    list,
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    theaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheatersForMovie)],
    reviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviewsForMovie)]
};