import { db } from '../db/db';
import JWTStrategy from 'passport-jwt';

const options: JWTStrategy.StrategyOptionsWithoutRequest = {
  jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SESSION_SECRET,
};

const jwtStrategy = new JWTStrategy.Strategy(options, async (payload, done) => {
  const user = await db.author.findUnique({ where: { id: payload.id } });
  if (!user) {
    return done(null, false);
  }

  return done(null, user);
});

export { jwtStrategy };
