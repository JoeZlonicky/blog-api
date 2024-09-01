import { db } from '../../db/db';
import { Request } from 'express';
import { Response } from 'express';
import { NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (req: Request, res: Response) => {
  const allUsers = await db.author.findMany({
    include: {
      posts: {
        where: {
          publishedAt: req.user ? undefined : { not: null },
        },
        omit: {
          createdAt: req.user ? false : true,
        },
        orderBy: {
          publishedAt: 'desc',
        },
      },
    },
    omit: {
      username: true,
      password: true,
    },
    orderBy: [
      {
        lastName: 'asc',
      },
      {
        firstName: 'asc',
      },
    ],
  });
  res.json(allUsers);
});

const getById = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId);
    const user = await db.author.findUnique({
      where: { id: userId },
      include: {
        posts: {
          omit: {
            createdAt: req.user ? false : true,
          },
          where: {
            publishedAt: req.user ? undefined : { not: null },
          },
          orderBy: {
            publishedAt: 'desc',
          },
        },
      },
      omit: {
        username: true,
        password: true,
      },
    });
    if (!user) {
      next();
      return;
    }

    res.json(user);
  },
);

export const AuthorsController = { getAll, getById };
