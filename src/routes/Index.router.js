import { AuthRouter } from './auth/Auth.router.js';
import { CommentsRouter } from './comments/Comments.router.js';
import { PostsRouter } from './posts/Posts.router.js';
import { UsersRouter } from './users/Users.router.js';
import { Router } from 'express';

const IndexRouter = Router();

IndexRouter.use('/auth', AuthRouter);
IndexRouter.use('/comments', CommentsRouter);
IndexRouter.use('/posts', PostsRouter);
IndexRouter.use('/users', UsersRouter);

export { IndexRouter };
