import { db } from '../db/db';
import type { Author } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  id: number;
  user: Author;
}

const auth = expressAsyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.get('Authorization')?.split(' ')[1];
      if (!token) {
        next();
        return;
      }

      const payload = jwt.verify(
        token,
        process.env.SESSION_SECRET,
      ) as JWTPayload;
      const user = await db.author.findUnique({ where: { id: payload.id } });

      if (user) {
        req.user = user;
      }

      next();
    } catch {
      next();
    }
  },
);

export { auth };
