import { NextFunction, Request, Response } from 'express';
import { type FieldValidationError, validationResult } from 'express-validator';

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }

  const messages = errors.array().map((error) => {
    switch (error.type) {
      case 'field':
        error = error as FieldValidationError;
        return {
          field: error.path,
          error: error.msg,
        };
      default:
        return error;
    }
  });

  res.send({ errors: messages });
};

export { validate };
