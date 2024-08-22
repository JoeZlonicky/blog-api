import { db } from '../../db/db.js';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (_req, res) => {
  const allPosts = await db.post.findMany();
  res.json(allPosts);
});

const getById = expressAsyncHandler(async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    next();
    return;
  }

  res.json(post);
});

export const PostsController = { getAll, getById };
