const knex = require("../db/connection");

function listCritics (criticId) { 
    return knex('critics as c')
      .where({'c.critic_id': criticId})
      .then((data) => data[0]);// Extracts the first element, as the query returns an array.
}

function read (id) {
    return knex("reviews")
      .select("*")
      .where("review_id", id)
      .then((data) => data[0]);// Extracts the first element, as the query returns an array.
}

function update (newReview) {
    return knex("reviews")
      .select("*")
      .where({ review_id: newReview.review_id })
      .update(newReview, "*"); // Updates the review and returns the updated review details.
}

function destroy (reviewId) {
  return knex("reviews").where("review_id", reviewId)// Filters to find the review with the specified ID.
  .del(); //Deletes the review
}

module.exports = {
    
    read, update, listCritics, destroy
}