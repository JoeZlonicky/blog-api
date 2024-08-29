import { AuthController } from './Auth.controller';
import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.post('/', AuthController.create);

export { AuthRouter };
