import { db } from '../../db/db';
import { Request } from 'express';
import { Response } from 'express';
import { NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (_req: Request, res: Response) => {
  const allUsers = await db.user.findMany();
  res.json(allUsers);
});

const getById = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId);
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      next();
      return;
    }

    res.json(user);
  },
);

export const UsersController = { getAll, getById };
