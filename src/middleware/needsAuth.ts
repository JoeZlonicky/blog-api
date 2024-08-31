import type { NextFunction, Request, Response } from 'express';

function needsAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.type('text');
    res.status(401).send('401 No Authentication Token');
    return;
  }

  next();
}

export { needsAuth };
