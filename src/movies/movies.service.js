const knex = require('../db/connection')
const mapProperties = require('../utils/map-properties')
 
function addCritic(movies) {
    return movies.map((movie) => {
        return {
            'review_id': movie.review_id,
            'content': movie.content,
            'score': movie.score,
            'created_at': movie.created_at,
            'updated_at': movie.updated_at,
            'critic_id': movie.critic_id,
            'movie_id': movie.movie_id,
            'critic': {
                'critic_id': movie.c_critic_id,
                'preferred_name': movie.preferred_name,
                'surname': movie.surname,
                'organization_name': movie.organization_name,
                'created_at': movie.c_created_at,
                'updated_at': movie.c_updated_at
            }
        }
    })
}


function list() {
    return knex('movies')
        .select('*')
        .groupBy('movies.movie_id')
}

function listMovie() {
    return knex('movies as m')
        .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
        .select('m.*')
        .where({ 'mt.is_showing': true })
        .groupBy('m.movie_id')
}

function listMovieTheaters() {
    return knex('movies_theaters as mt')
        .join('movies as m', 'm.movie_id', 'mt.movie_id')
        .join('theaters as t', 'mt.theater_id', 't.theater_id')
        .select('t.*')
        .groupBy('t.theater_id')
}

function listMovieReviews(movieId) {
    console.log(movieId)
    return knex('movies as m')
        .join('reviews as r', 'm.movie_id', 'r.movie_id')
        .join('critics as c', 'r.critic_id', 'c.critic_id')
        .select(
            'm.*',
            'r.*',
            'c.created_at as c_created_at',
            'c.updated_at as c_updated_at',
            'c.critic_id as c_critic_id',
            'c.preferred_name',
            'c.surname',
            'c.organization_name',
        )
        .where({'r.movie_id': movieId})
        .then(addCritic)
}

function read(movie_id) {
    return knex('movies')
        .select('*')
        .where({ movie_id })
        .first()
}

module.exports = {
    list,
    listMovie,
    read,
    listMovieTheaters,
    listMovieReviews
}