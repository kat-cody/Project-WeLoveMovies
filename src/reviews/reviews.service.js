const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")


// Adds critic info as a seperate object titles "critic"

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
})


// Reads a specific review by ID, adds critic information

async function read(reviewId) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("c.*", "r.*")
        .where({ review_id: reviewId })
        .first()
        .then(addCritic);
}

// Updates a specific review

async function update(updatedReview) {

    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("c.*", "r.*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")

}

// Destroys a specific review

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del()
}

module.exports = { update, read, destroy }