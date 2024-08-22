function getAll(_req, res) {
  res.json([]);
}

function getById(_req, res) {
  res.json(null);
}

export const CommentsController = { getAll, getById };
