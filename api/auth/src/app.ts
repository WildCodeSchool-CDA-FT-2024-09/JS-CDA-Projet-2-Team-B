import express, { json } from 'express';
import cors from 'cors';
import indexRouter from './routers/index.routers';
import { errorHandler } from './middlewares/errorHandler.middleware';
import cookieParser from 'cookie-parser';

const app = express();

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5050'
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', indexRouter);
app.use(errorHandler);

export default app;
