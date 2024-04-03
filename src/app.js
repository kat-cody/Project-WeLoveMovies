if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const doesNotExist = require("./errors/doesNotExist");
const errorHandler = require("./errors/errorHandler");
const moviesRouter = require('./movies/movies.router');
const theatersRouter = require('./theaters/theaters.router');
const reviewsRouter = require("./reviews/reviews.router");


app.use(express.json())
app.use(cors());
app.use("/movies", moviesRouter)
app.use("/theaters", theatersRouter)
app.use("/reviews", reviewsRouter)

app.use(doesNotExist);
app.use(errorHandler);

module.exports = app;