import { db } from '../../db/db';
import { Request } from 'express';
import { Response } from 'express';
import { NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (_req: Request, res: Response) => {
  const allUsers = await db.author.findMany({
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      posts: true,
    },
  });
  res.json(allUsers);
});

const getById = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId);
    const user = await db.author.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        posts: true,
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
