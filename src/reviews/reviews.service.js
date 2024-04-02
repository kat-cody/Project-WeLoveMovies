const knex = require("../db/connection");

async function list(movie_id) {
  return knex("reviews")
    .where({ movie_id })
    .then((reviews) => Promise.all(reviews.map(setCritic)));
}

async function read(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).first();
}

async function readCritic(critic_id) {
  return knex("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return knex("reviews")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

async function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  list,
  read,
  update,
  destroy,
};