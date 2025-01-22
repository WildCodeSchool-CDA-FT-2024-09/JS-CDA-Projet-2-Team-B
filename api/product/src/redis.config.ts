import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://redis:6379' // 🚀 Correction : on utilise "redis" comme hostname
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.info('🚀 Redis connected');
});

export default redisClient;
