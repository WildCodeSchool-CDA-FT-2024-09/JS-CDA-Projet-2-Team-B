import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { pool } from './database/pg.client';

const app = express();

app.use(json());

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));

const PORT = process.env.PORT;

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
