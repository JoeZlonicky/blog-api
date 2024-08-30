import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

function requestValidation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }

  const messages = errors.array().map((error) => error.msg);
  res.status(400).send({ errors: messages });
}

export { requestValidation as requestValidation };
