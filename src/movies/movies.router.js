const router = require("express").Router({ mergeParams: true })
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

// route for all movies (/movies)
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

// route for a specific movie (/movies/:movieId)

router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed)

// route for displaying theaters currently showing a specific movie (/movies/:movieId/theaters)

router.route("/:movieId/theaters")
    .get(controller.theaters)
    .all(methodNotAllowed)

// route for displaying reviews for a speicifc movieId

router.route("/:movieId/reviews")
    .get(controller.reviews)
    .all(methodNotAllowed)

module.exports = router;