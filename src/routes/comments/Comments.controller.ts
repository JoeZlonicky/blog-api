import { db } from '../../db/db';
import { pascalCase } from 'change-case';
import { NextFunction } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (req: Request, res: Response) => {
  const allComments = await db.comment.findMany({
    where: {
      approvedAt: req.user ? undefined : { not: null },
      post: { publishedAt: req.user ? undefined : { not: null } },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  res.json(allComments);
});

const getById = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = parseInt(req.params.commentId);
    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
        approvedAt: req.user ? undefined : { not: null },
        post: { publishedAt: req.user ? undefined : { not: null } },
      },
    });
    if (!comment) {
      next();
      return;
    }

    res.json(comment);
  },
);

const update = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = parseInt(req.params.commentId);
    const { setApproved } = req.body;

    let newApprovedAt = undefined;
    if (setApproved === 'true') {
      newApprovedAt = new Date();
    } else if (setApproved === 'false') {
      newApprovedAt = null;
    }

    const result = await db.comment.update({
      data: {
        approvedAt: newApprovedAt,
      },
      where: {
        id: commentId,
      },
    });

    if (!result) {
      next();
      return;
    }

    res.json(result);
  },
);

const remove = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = parseInt(req.params.commentId);
    if (!commentId) {
      next();
      return;
    }

    const result = await db.comment.delete({
      where: { id: commentId },
    });

    if (!result) {
      next();
      return;
    }

    res.json(result);
  },
);

const create = expressAsyncHandler(async (req: Request, res: Response) => {
  const { postId, content, firstName, lastInitial } = req.body;

  const comment = await db.comment.create({
    data: {
      postId: parseInt(postId),
      content,
      firstName: pascalCase(firstName),
      lastInitial: pascalCase(lastInitial),
    },
  });

  res.json(comment);
});

export const CommentsController = { getAll, getById, update, remove, create };
