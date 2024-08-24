import { IndexController } from './Index.controller';
import { AuthRouter } from './auth/Auth.router';
import { CommentsRouter } from './comments/Comments.router';
import { PostsRouter } from './posts/Posts.router';
import { UsersRouter } from './users/Users.router';
import { Router } from 'express';

const IndexRouter = Router();

IndexRouter.use('/auth', AuthRouter);
IndexRouter.use('/comments', CommentsRouter);
IndexRouter.use('/posts', PostsRouter);
IndexRouter.use('/users', UsersRouter);

IndexRouter.get('/', IndexController.get);

export { IndexRouter };
