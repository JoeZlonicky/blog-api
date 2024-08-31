import { db } from '../../db/db';
import { NextFunction } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (req: Request, res: Response) => {
  const authorId = parseInt(req.query.authorId as string) || undefined;

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
      published: req.user ? undefined : true,
    },
  });

  res.json(results);
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
      where: { id: postId, published: req.user ? undefined : true },
    });
    if (!result) {
      next();
      return;
    }

    res.json(result);
  },
);

const create = expressAsyncHandler(async (req: Request, res: Response) => {
  const { authorId } = req.body;
  const result = await db.post.create({
    data: {
      title: 'New Post',
      authorId: parseInt(authorId),
    },
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
  });
  res.json(result);
});

export const PostsController = { getAll, getById, create };
