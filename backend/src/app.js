import cors from 'cors';
import express from 'express';
import postRoutes from './routes/post.routes.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: false,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.json({
    success: true,
    message: 'JSONPlaceholder posts API',
  });
});

app.use('/api', postRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
