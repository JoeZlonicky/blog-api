import { db } from '../../db/db.js';
import { parseIntQuery } from '../../utility/parseIntQuery.js';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (req, res) => {
  const limit = parseIntQuery(req.query.limit, 10);
  const offset = parseIntQuery(req.query.offset, 0);
  const userId = parseIntQuery(req.query.userId);

  const results = await db.post.findMany({
    include: {
      author: {
        select: {
          username: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      },
    },
    where: {
      authorId: userId,
    },
    skip: offset,
    take: limit,
  });
  const count = await db.post.count();
  res.json({
    count,
    results,
  });
});

const getById = expressAsyncHandler(async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  const result = await db.post.findUnique({ where: { id: postId } });
  if (!result) {
    next();
    return;
  }

  res.json(result);
});

export const PostsController = { getAll, getById };
