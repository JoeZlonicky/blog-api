import { Request, Response } from 'express';

function handleFailedAuth(_req: Request, res: Response) {
  res.type('txt');
  res.status(400).send('400 Failed Authentication');
}

export { handleFailedAuth };
