import { PostsController } from './Posts.controller';
import { Router } from 'express';

const PostsRouter = Router();

PostsRouter.get('/:postId(\\d)+', PostsController.getById);

// q: limit=10
// q: offset=0
// q: userId?
PostsRouter.get('/', PostsController.getAll);

export { PostsRouter };
