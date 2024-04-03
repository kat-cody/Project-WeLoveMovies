const knex = require("../db/connection");

function readCritic(critic_id) {
  return knex("critics").where({ critic_id }).first();
}

async function foundCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

function read(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).first();
}

async function update(review) {
  return knex("reviews")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(foundCritic);
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

async function list(movie_id) {
  return knex("reviews")
    .where({ movie_id })
    .then((reviews) => Promise.all(reviews.map(foundCritic)));
}

module.exports = {
  read,
  update,
  destroy,
  list,
};