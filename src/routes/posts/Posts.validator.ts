import { db } from '../../db/db';
import { body } from 'express-validator';

const create = [
  body('authorId')
    .trim()
    .isLength({ min: 1 })
    .withMessage('authorId missing')
    .bail()
    .isInt()
    .withMessage('authorId not an integer')
    .bail()
    .custom(async (value) => {
      const author = await db.author.findUnique({
        where: { id: parseInt(value) },
      });
      if (!author) {
        throw new Error('authorId does not match any author');
      }
    }),
];

export const PostsValidator = { create };
