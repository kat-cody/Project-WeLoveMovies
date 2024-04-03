// Environment setup
// Load environment variables from .env file if running in a development environment
if (process.env.USER) require("dotenv").config();

// Importing required modules
const express = require("express");
const cors = require('cors');

// Router imports
const movieRouter = require("./movies/movies.router");
const theaterRouter = require("./theaters/theaters.router");
const reviewRouter = require("./reviews/reviews.router");

// Error handling imports
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// Initialize express app
const app = express();

// Middleware setup
// Enable JSON body parsing for request bodies
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Routes setup
// Register routers to handle requests for each resource
app.use("/movies", movieRouter);
app.use("/theaters", theaterRouter);
app.use("/reviews", reviewRouter);

// Error handling middleware
// Use notFound handler for undefined routes
app.use(notFound);

// Use errorHandler to handle any application errors
app.use(errorHandler);

// Export the configured Express app
module.exports = app;