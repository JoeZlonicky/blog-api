// eslint-disable-next-line no-unused-vars
function handle500(err, _req, res, _next) {
  console.error(err.stack);
  res.type('txt');
  res.status(500).send('500 Internal Server Error');
}

export { handle500 };
