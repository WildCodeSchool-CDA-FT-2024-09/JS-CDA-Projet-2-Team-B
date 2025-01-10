import 'dotenv/config';
import { pool } from './src/database/pg.client';
import app from './src/app';

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.info(`Listening on port ${PORT}`);

  try {
    const client = await pool.connect();
    console.info('✅ Connected to the database.');
    client.release();
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
  }
});
