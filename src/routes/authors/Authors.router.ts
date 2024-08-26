import { AuthorsController } from './Authors.controller';
import { Router } from 'express';

const AuthorsRouter = Router();

AuthorsRouter.get('/:userId(\\d)+', AuthorsController.getById);

AuthorsRouter.get('/', AuthorsController.getAll);

export { AuthorsRouter };
