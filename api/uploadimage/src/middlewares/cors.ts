import cors from 'cors';

export const corsMiddleware = cors({
  credentials: true,
  origin: 'http://localhost:5050'
});
