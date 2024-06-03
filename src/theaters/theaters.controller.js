const service = require("./theaters.service");

// Function to list theaters

async function list(req, res, next) {

  const data = await service.list();

  const { movieId } = req.params;

  res.json({ data });

}

module.exports = { list };