import { requestValidation } from '../../middleware/requestValidation';
import { CommentsController } from './Comments.controller';
import { CommentsValidator } from './Comments.validator';
import { Router } from 'express';

const CommentsRouter = Router();

CommentsRouter.get('/:commentId(\\d)+', CommentsController.getById);

CommentsRouter.get('/', CommentsController.getAll);
CommentsRouter.post(
  '/',
  CommentsValidator.create,
  requestValidation,
  CommentsController.create,
);

export { CommentsRouter };
