import { validate } from '../../middleware/validate';
import { CommentsController } from './Comments.controller';
import { CommentsValidator } from './Comments.validator';
import { Router } from 'express';

const CommentsRouter = Router();

CommentsRouter.get('/:commentId(\\d)+', CommentsController.getById);

CommentsRouter.get('/', CommentsController.getAll);
CommentsRouter.post(
  '/',
  CommentsValidator.create,
  validate,
  CommentsController.create,
);

export { CommentsRouter };
