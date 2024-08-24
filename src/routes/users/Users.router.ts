import { UsersController } from './Users.controller';
import { Router } from 'express';

const UsersRouter = Router();

UsersRouter.get('/:userId(\\d)+', UsersController.getById);

UsersRouter.get('/', UsersController.getAll);

export { UsersRouter };
