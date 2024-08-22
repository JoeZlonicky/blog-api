import { PostsController } from './Posts.controller.js';
import { Router } from 'express';

const PostsRouter = Router();

PostsRouter.get('/:id(\\d)+', PostsController.getById);

PostsRouter.get('/', PostsController.getAll);

export { PostsRouter };
