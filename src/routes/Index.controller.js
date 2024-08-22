import url from 'node:url';

const createUrl = (req, path) => {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl + path,
  });
};

function get(req, res) {
  const index = {
    Auth: createUrl(req, 'auth'),
    Comments: createUrl(req, 'comments'),
    Posts: createUrl(req, 'posts'),
    Users: createUrl(req, 'users'),
  };

  res.json(index);
}

export const IndexController = { get };
