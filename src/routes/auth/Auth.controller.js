function get(_req, res) {
  res.status(200).end();
}

function remove(_req, res) {
  res.status(200).end();
}

export const AuthController = { get, remove };
