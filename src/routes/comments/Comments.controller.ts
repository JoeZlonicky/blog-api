import { db } from '../../db/db';
import { NextFunction } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (_req: Request, res: Response) => {
  const allComments = await db.post.findMany();
  res.json(allComments);
});

const getById = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = parseInt(req.params.commentId);
    const comment = await db.post.findUnique({ where: { id: commentId } });
    if (!comment) {
      next();
      return;
    }

    res.json(comment);
  },
);

export const CommentsController = { getAll, getById };
