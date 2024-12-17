import express from 'express';
import { json } from 'express';
import { corsMiddleware } from './middlewares/cors';
import { uploadRoutes } from './routes/upload.routes';

const app = express();

app.use(json());
app.use(corsMiddleware);

app.use('/upload', uploadRoutes);

export { app };
