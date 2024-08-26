import { Request, Response } from 'express';
import url from 'node:url';

const createUrl = (req: Request, path: string) => {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl + path,
  });
};

function get(req: Request, res: Response) {
  const index = {
    Auth: createUrl(req, 'auth'),
    Comments: createUrl(req, 'comments'),
    Posts: createUrl(req, 'posts'),
    Authors: createUrl(req, 'authors'),
  };

  res.json(index);
}

export const IndexController = { get };
