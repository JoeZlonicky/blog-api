import { Request, Response } from 'express';

function get(_req: Request, res: Response) {
  res.status(200).end();
}

function remove(_req: Request, res: Response) {
  res.status(200).end();
}

export const AuthController = { get, remove };
