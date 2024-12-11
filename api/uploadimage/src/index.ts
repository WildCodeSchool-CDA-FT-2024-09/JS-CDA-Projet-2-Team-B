import { app } from './config';
import { pool } from './database/pg.client';

const PORT = process.env.PORT || 3000;

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
