import { UsersController } from './Users.controller.js';
import { Router } from 'express';

const UsersRouter = Router();

UsersRouter.get('/:id(\\d)+', UsersController.getById);

UsersRouter.get('/', UsersController.getAll);

export { UsersRouter };
