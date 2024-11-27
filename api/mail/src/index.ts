import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(json());

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
