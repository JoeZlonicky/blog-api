import { NextFunction, Request, Response } from 'express';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
function handle500(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err.stack);
  res.type('txt');
  res.status(500).send('500 Internal Server Error');
}

export { handle500 };
