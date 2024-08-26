import { IndexController } from './Index.controller';
import { AuthRouter } from './auth/Auth.router';
import { AuthorsRouter } from './authors/Authors.router';
import { CommentsRouter } from './comments/Comments.router';
import { PostsRouter } from './posts/Posts.router';
import { Router } from 'express';

const IndexRouter = Router();

IndexRouter.use('/auth', AuthRouter);
IndexRouter.use('/authors', AuthorsRouter);
IndexRouter.use('/comments', CommentsRouter);
IndexRouter.use('/posts', PostsRouter);

IndexRouter.get('/', IndexController.get);

export { IndexRouter };
