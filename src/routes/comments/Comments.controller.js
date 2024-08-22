import { db } from '../../db/db.js';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (_req, res) => {
  const allComments = await db.post.findMany();
  res.json(allComments);
});

const getById = expressAsyncHandler(async (req, res, next) => {
  const commentId = parseInt(req.params.commentId);
  const comment = await db.post.findUnique({ where: { id: commentId } });
  if (!comment) {
    next();
    return;
  }

  res.json(comment);
});

export const CommentsController = { getAll, getById };
