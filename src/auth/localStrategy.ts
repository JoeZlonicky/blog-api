import { db } from '../db/db';
import bcrypt from 'bcryptjs';
import LocalStrategy from 'passport-local';

const localStrategy = new LocalStrategy.Strategy(
  async (username, password, done) => {
    const user = await db.author.findUnique({ where: { username } });
    if (!user) {
      return done(null, false, { message: 'Invalid username' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: 'Invalid password' });
    }

    return done(null, user);
  },
);

export { localStrategy };
