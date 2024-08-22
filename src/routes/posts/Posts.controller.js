import { orm } from '../../db/orm.js';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (_req, res) => {
  const allPosts = await orm.post.findMany();
  res.json(allPosts);
});

const getById = expressAsyncHandler(async (req, res) => {
  const id = parseInt(req.params.postId);
  const post = await orm.post.findUnique({ where: { id } });
  res.json(post);
});

export const PostsController = { getAll, getById };
