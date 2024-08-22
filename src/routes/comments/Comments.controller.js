import { orm } from '../../db/orm.js';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (_req, res) => {
  const allComments = await orm.post.findMany();
  res.json(allComments);
});

const getById = expressAsyncHandler(async (req, res) => {
  const id = parseInt(req.params.commentId);
  const comment = await orm.post.findUnique({ where: { id } });
  res.json(comment);
});
export const CommentsController = { getAll, getById };
