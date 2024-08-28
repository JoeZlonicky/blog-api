import { Request, Response } from 'express';

function handle404(_req: Request, res: Response) {
  res.type('txt');
  res.status(404).send('404 Not Found');
}

export { handle404 };
