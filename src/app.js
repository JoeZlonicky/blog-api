import { handle500 } from './middleware/handle500.js';
import { IndexRouter } from './routes/Index.router.js';
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', IndexRouter);

app.use(handle500);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server open on http://localhost:${PORT}`);
});
