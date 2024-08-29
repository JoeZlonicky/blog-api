import { jwtStrategy } from './auth/jwtStrategy';
import { localStrategy } from './auth/localStrategy';
import { handlePageNotFound } from './middleware/handlePageNotFound';
import { handleServerError } from './middleware/handleServerError';
import { IndexRouter } from './routes/Index.router';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import passport from 'passport';

configDotenv();

const app = express();

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', IndexRouter);

app.use(handlePageNotFound);
app.use(handleServerError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server open on http://localhost:${PORT}`);
});
