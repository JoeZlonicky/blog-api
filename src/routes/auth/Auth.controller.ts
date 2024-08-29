import { handleFailedAuth } from '../../middleware/handleFailedAuth';
import type { Author } from '@prisma/client';
import { type NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const create = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const onAuthenticate: passport.AuthenticateCallback = async function (
      err,
      user,
    ) {
      if (err || !user) {
        handleFailedAuth(req, res);
        return;
      }

      const author = user as Author;
      const token = jwt.sign(
        { id: author.id, username: author.username },
        process.env.SESSION_SECRET,
        { expiresIn: '1h' },
      );
      res.send(token);
    };

    passport.authenticate('local', onAuthenticate)(req, res, next);
  },
);

export const AuthController = { create };
