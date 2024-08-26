import { PostsController } from './Posts.controller';
import { Router } from 'express';

const PostsRouter = Router();

PostsRouter.get('/:postId(\\d)+', PostsController.getById);

// q: limit=10
// q: offset=0
// q: authorId?
PostsRouter.get('/', PostsController.getAll);

export { PostsRouter };
