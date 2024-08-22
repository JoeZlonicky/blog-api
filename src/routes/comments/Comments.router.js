import { CommentsController } from './Comments.controller.js';
import { Router } from 'express';

const CommentsRouter = Router();

CommentsRouter.get('/:id(\\d)+', CommentsController.getById);

CommentsRouter.get('/', CommentsController.getAll);

export { CommentsRouter };
