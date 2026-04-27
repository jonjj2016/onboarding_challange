import cors from 'cors';
import express from 'express';

import { artificialDelay } from './middleware/delay';
import { authorsRouter } from './modules/authors';
import { contentRouter } from './modules/content';

const app = express();

app.use(cors());
app.use(express.json());
app.use(artificialDelay);

app.use('/v2/authors', authorsRouter);
app.use('/v2/content', contentRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'rover-mock' });
});

export default app;
