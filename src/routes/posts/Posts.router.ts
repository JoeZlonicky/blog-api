import { PostsController } from './Posts.controller';
import { Router } from 'express';

const PostsRouter = Router();

PostsRouter.get('/:postId(\\d)+', PostsController.getById);

// q: authorId?
PostsRouter.get('/', PostsController.getAll);

export { PostsRouter };
