import { needsAuth } from '../../middleware/needsAuth';
import { requestValidation } from '../../middleware/requestValidation';
import { CommentsController } from './Comments.controller';
import { CommentsValidator } from './Comments.validator';
import { Router } from 'express';

const CommentsRouter = Router();

CommentsRouter.get('/:commentId(\\d+)', CommentsController.getById);
// {setApproved=(true|false)}
CommentsRouter.patch(
  '/:commentId(\\d+)',
  needsAuth,
  CommentsValidator.update,
  requestValidation,
  CommentsController.update,
);
CommentsRouter.delete(
  '/:commentId(\\d+)',
  needsAuth,
  CommentsController.remove,
);

CommentsRouter.get('/', CommentsController.getAll);
CommentsRouter.post(
  '/',
  CommentsValidator.create,
  requestValidation,
  CommentsController.create,
);

export { CommentsRouter };
