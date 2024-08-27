import { CommentsController } from './Comments.controller';
import { Router } from 'express';

const CommentsRouter = Router();

CommentsRouter.get('/:commentId(\\d)+', CommentsController.getById);

CommentsRouter.get('/', CommentsController.getAll);
CommentsRouter.post('/', CommentsController.create);

export { CommentsRouter };
