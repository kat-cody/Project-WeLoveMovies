const service = require('./theaters.service');
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  if (req.params.movieId) {
    const { movieId } = req.params;

    const data = await service.read(movieId);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

module.exports = {
  list: asyncErrorBoundary(list)
}