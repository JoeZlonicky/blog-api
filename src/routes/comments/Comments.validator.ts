import { db } from '../../db/db';
import { body } from 'express-validator';

const create = [
  body('postId')
    .trim()
    .isLength({ min: 1 })
    .withMessage('postId mssing')
    .bail()
    .isInt()
    .withMessage('postId not an integer')
    .bail()
    .custom(async (value, { req }) => {
      const post = await db.post.findUnique({
        where: {
          id: parseInt(value),
          publishedAt: req.user ? undefined : { not: null },
        },
      });
      if (!post) {
        throw new Error('postId does not match any post');
      }
    }),
  body('content').trim().isLength({ min: 1 }).withMessage('content missing'),
  body('firstName')
    .trim()
    .isLength({ min: 1 })
    .withMessage('firstName missing')
    .bail()
    .isAlpha()
    .withMessage('firstName not alpha'),
  body('lastInitial')
    .trim()
    .isLength({ min: 1 })
    .withMessage('lastInitial missing')
    .bail()
    .isLength({ max: 1 })
    .withMessage('lastInitial not one character')
    .isAlpha()
    .withMessage('lastInitial not alpha'),
];

export const CommentsValidator = { create };
