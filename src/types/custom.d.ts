import type { Author } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: Author;
    }
  }
}
