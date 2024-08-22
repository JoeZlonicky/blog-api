import { db } from '../../db/db.js';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (_req, res) => {
  const allUsers = await db.user.findMany();
  res.json(allUsers);
});

const getById = expressAsyncHandler(async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    next();
    return;
  }

  res.json(user);
});

export const UsersController = { getAll, getById };
