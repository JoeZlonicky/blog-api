import type { Author } from '@prisma/client';
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const create = expressAsyncHandler(async (req: Request, res: Response) => {
  const author = req.user as Author; // Set in validator
  const token = jwt.sign(
    { id: author.id, username: author.username },
    process.env.SESSION_SECRET,
    { expiresIn: '1h' },
  );
  res.send(token);
});

export const AuthController = { create };
