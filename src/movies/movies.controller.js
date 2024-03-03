const service = require('./movies.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

async function list(req, res, next) {
    const isShowing = req.query.is_showing
    if (isShowing) {
       res.json({ data: await service.listMovie() })
    } else {
        res.json({ data: await service.list() })
    }
}

async function read(req, res, next) {
    res.json({ data: res.locals.movie })
}

async function listMovieTheaters(req, res, next) {
    const movieId = req.params.movieId
    res.json({ data: await service.listMovieTheaters(movieId)})
}

async function listMovieReviews(req, res, next) {
    const movieId = req.params.movieId
    const result = await service.listMovieReviews(movieId)
    res.json({ data: result })
}


async function movieIsValid(req, res, next) {
    const movie = await service.read(req.params.movieId)
    if (movie) {
        res.locals.movie = movie
        console.log(movie) 
        return next()
    }
    next({ 
        status: 404, 
        message: 'Movie cannot be found' 
    })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieIsValid), asyncErrorBoundary(read)],
    listMovieTheaters: [asyncErrorBoundary(movieIsValid), asyncErrorBoundary(listMovieTheaters)],
    listMovieReviews: [asyncErrorBoundary(movieIsValid), asyncErrorBoundary(listMovieReviews)],
}