import { db } from '../../db/db';
import { handleFailedAuth } from '../../middleware/handleFailedAuth';
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const create = expressAsyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await db.author.findUnique({
    where: { username: username, password: password },
  });

  console.log(user);

  if (!user) {
    handleFailedAuth(req, res);
    return;
  }

  jwt.sign(
    { username },
    process.env.SESSION_SECRET,
    (err: Error | null, token: string | undefined) => {
      if (err) {
        throw Error(err.toString());
      }
      res.send(token);
    },
  );
});

function remove(_req: Request, res: Response) {
  res.status(200).end();
}

export const AuthController = { create, remove };
