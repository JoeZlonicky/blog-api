import { db } from '../../db/db';
import { parseIntQuery } from '../../utility/parseIntQuery';
import { NextFunction } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (req: Request, res: Response) => {
  const limit = parseIntQuery(req.query.limit as string, 10);
  const offset = parseIntQuery(req.query.offset as string, 0);
  const authorId = parseIntQuery(req.query.authorId as string);

  const results = await db.post.findMany({
    include: {
      author: {
        select: {
          username: true,
          firstName: true,
          lastName: true,
        },
      },
      comments: true,
    },
    where: {
      authorId,
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

const getById = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = parseInt(req.params.postId);
    const result = await db.post.findUnique({
      include: {
        author: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
          },
        },
        comments: true,
      },
      where: { id: postId },
    });
    if (!result) {
      next();
      return;
    }

    res.json(result);
  },
);

export const PostsController = { getAll, getById };
