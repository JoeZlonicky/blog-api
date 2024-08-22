import { orm } from '../../db/orm.js';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (_req, res) => {
  const allUsers = await orm.user.findMany();
  res.json(allUsers);
});

const getById = expressAsyncHandler(async (req, res) => {
  const id = parseInt(req.params.userId);
  const user = await orm.user.findUnique({ where: { id } });
  res.json(user);
});

export const UsersController = { getAll, getById };
