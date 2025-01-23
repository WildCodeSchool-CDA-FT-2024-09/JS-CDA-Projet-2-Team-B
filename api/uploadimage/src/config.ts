import express from 'express';
import { json } from 'express';
import { corsMiddleware } from './middlewares/cors';
import { uploadRouter } from './routes/upload.routes';
import { errorHandler } from './middlewares/errorHandler.middleware';
import cookieParser from 'cookie-parser';

const app = express();

app.use(json());
app.use(corsMiddleware);
app.use(cookieParser());

app.use('/upload', uploadRouter);

app.use(errorHandler);

export { app };
