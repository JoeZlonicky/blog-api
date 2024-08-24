import { AuthController } from './Auth.controller';
import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.get('/', AuthController.get);
AuthRouter.delete('/', AuthController.remove);

export { AuthRouter };
