import { db } from '../../db/db';
import bcrypt from 'bcryptjs';
import { body } from 'express-validator';

const create = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .withMessage('username missing')
    .bail({ level: 'request' })
    .custom(async (value, { req }) => {
      const user = await db.author.findUnique({ where: { username: value } });
      if (!user) {
        throw new Error('Invalid username');
      }
      req.user = user;
    }),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .withMessage('password missing')
    .bail()
    .custom(async (value, { req }) => {
      const match = await bcrypt.compare(value, req.user.password);
      if (!match) {
        throw new Error('Invalid password');
      }
    }),
];

export const AuthValidator = { create };
