import { db } from '../../db/db';
import { body } from 'express-validator';

const create = [
  body('postId')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Missing')
    .bail()
    .isInt()
    .withMessage('Not an integer')
    .bail()
    .custom(async (value) => {
      const post = await db.post.findUnique({
        where: { id: parseInt(value) },
      });
      return !!post;
    })
    .withMessage('Not found'),
  body('content').trim().isLength({ min: 1 }).withMessage('Missing'),
  body('firstName')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Missing')
    .bail()
    .isAlpha()
    .withMessage('Not alpha'),
  body('lastInitial')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Missing')
    .bail()
    .isLength({ max: 1 })
    .withMessage('Not one character')
    .isAlpha()
    .withMessage('Not alpha'),
];

export const CommentsValidator = { create };
