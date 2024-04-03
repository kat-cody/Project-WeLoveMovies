const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(request, response, next) {
     // Extract the review ID from the request parameters.
    const {reviewId} = request.params;
    const review = await service.read(reviewId);

    // If the review exists, attach it to the response object and proceed to the next middleware or route handler.
   
    if(review) {
        response.locals.review = review;
        return next();
    }

    // If the review does not exist, pass an error to the next error handling middleware.
   
    next({
        status: 404, 
        message: "Review cannot be found"
    })
}
  
  async function update (request, response, next) {
    // Create an updated review object by merging existing review data (from response.locals) with new data from the request body.
    // Ensure the review_id is preserved.
    const updatedReview = {
      ...response.locals.review,
      ...request.body.data,
      review_id: response.locals.review.review_id,
    };
    

    // Update the review in the database using the service.
    await service.update(updatedReview);
    updatedReview.critic = await service.listCritics(updatedReview.critic_id)
    response.json({ data: updatedReview});
  }
  
  async function destroy (request, response, next) {
    await service.destroy(
      response.locals.review.review_id
    );
    response.sendStatus(204);
  }

  module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
  }