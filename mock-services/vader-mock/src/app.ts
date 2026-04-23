import cors from 'cors';
import express from 'express';
import { artificialDelay } from './middleware/delay';
import contentProductsRouter from './routes/content-products';
import productsRouter from './routes/products';

const app = express();

app.use(cors());
app.use(express.json());
app.use(artificialDelay);

app.use('/v2/products', productsRouter);
app.use('/v2/content-products', contentProductsRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'vader-mock' });
});

export default app;
