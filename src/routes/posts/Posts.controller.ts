import { db } from '../../db/db';
import { NextFunction } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const getAll = expressAsyncHandler(async (req: Request, res: Response) => {
  const authorId = parseInt(req.query.authorId as string) || undefined;

  const results = await db.post.findMany({
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      comments: {
        where: {
          approvedAt: req.user ? undefined : { not: null },
        },
        omit: {
          postId: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    omit: {
      createdAt: req.user ? false : true,
    },
    where: {
      authorId,
      publishedAt: req.user ? undefined : { not: null },
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });

  res.json(results);
});

const getById = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = parseInt(req.params.postId);
    const result = await db.post.findUnique({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        comments: {
          where: {
            approvedAt: req.user ? undefined : { not: null },
          },
          omit: {
            postId: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      omit: {
        createdAt: req.user ? false : true,
      },
      where: { id: postId, publishedAt: req.user ? undefined : { not: null } },
    });
    if (!result) {
      next();
      return;
    }

    res.json(result);
  },
);

const update = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = parseInt(req.params.postId);
    const { title, content, published } = req.body;

    let newPublishedAt = undefined;
    if (published === 'true') {
      newPublishedAt = new Date();
    } else if (published === 'false') {
      newPublishedAt = null;
    }

    const result = await db.post.update({
      data: {
        title,
        content,
        publishedAt: newPublishedAt,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        comments: {
          omit: {
            postId: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      where: { id: postId },
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
    const postId = parseInt(req.params.postId);
    if (!postId) {
      next();
      return;
    }

    const result = db.post.delete({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        comments: {
          omit: {
            postId: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      where: { id: postId },
    });
    if (!result) {
      next();
      return;
    }

    res.json(result);
  },
);

const create = expressAsyncHandler(async (req: Request, res: Response) => {
  const { authorId } = req.body;
  const result = await db.post.create({
    data: {
      title: 'New Post',
      authorId: parseInt(authorId),
    },
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      comments: true,
    },
  });
  res.json(result);
});

export const PostsController = { getAll, getById, remove, create, update };
