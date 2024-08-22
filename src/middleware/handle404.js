function handle404(_req, res) {
  res.type('txt');
  res.status(404).send('404 Not Found');
}

export { handle404 };
