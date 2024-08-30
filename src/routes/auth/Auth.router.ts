import { requestValidation } from '../../middleware/requestValidation';
import { AuthController } from './Auth.controller';
import { AuthValidator } from './Auth.validator';
import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.post(
  '/',
  AuthValidator.create,
  requestValidation,
  AuthController.create,
);

export { AuthRouter };
