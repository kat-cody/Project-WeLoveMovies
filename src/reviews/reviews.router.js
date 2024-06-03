const router = require("express").Router({ mergeParams: true })
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")


// PUT/DELETE (/reviews/:reviewId)

router.route("/:reviewId")
    .put(controller.update)  // Route for updating a review
    .delete(controller.delete) // Route for deleting a review 
    .all(methodNotAllowed)


module.exports = router;