// eslint-disable-next-line no-unused-vars
function handle500(err, _req, res, _next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
}

export { handle500 };
