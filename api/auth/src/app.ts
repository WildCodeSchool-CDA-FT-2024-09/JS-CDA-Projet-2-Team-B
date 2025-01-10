import express, { json } from 'express';
import cors from 'cors';
import apiRouter from './routers/index.routers';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app = express();

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5050'
};

app.use(cors(corsOptions));

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', apiRouter);
app.use(errorHandler);

export default app;
