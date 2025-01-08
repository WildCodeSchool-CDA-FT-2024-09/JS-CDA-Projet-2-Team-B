import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { pool } from './database/pg.client';
import apiRouter from './routers/index.routers';

const PORT = process.env.PORT;

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));

app.listen(PORT, async () => {
  console.info(`Listening on port ${PORT}`);

  try {
    const client = await pool.connect();
    console.info('✅ Connected to the database.');
    client.release();
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
  } finally {
    await pool.end();
  }
});
