import { needsAuth } from '../../middleware/needsAuth';
import { requestValidation } from '../../middleware/requestValidation';
import { PostsController } from './Posts.controller';
import { PostsValidator } from './Posts.validator';
import { Router } from 'express';

const PostsRouter = Router();

PostsRouter.get('/:postId(\\d+)', PostsController.getById);

// {title, content, setPublished=(true|false)}
PostsRouter.patch(
  '/:postId(\\d+)',
  needsAuth,
  PostsValidator.update,
  requestValidation,
  PostsController.update,
);
PostsRouter.delete('/:postId(\\d+)', needsAuth, PostsController.remove);

// q: authorId?
PostsRouter.get('/', PostsController.getAll);
PostsRouter.post(
  '/',
  needsAuth,
  PostsValidator.create,
  requestValidation,
  PostsController.create,
);

export { PostsRouter };
