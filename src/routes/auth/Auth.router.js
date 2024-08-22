import { AuthController } from './Auth.controller.js';
import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.get('/', AuthController.get);
AuthRouter.delete('/', AuthController.remove);

export { AuthRouter };
