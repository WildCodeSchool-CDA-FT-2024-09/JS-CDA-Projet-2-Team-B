import express from 'express';
import { json } from 'express';
import path from 'path';
import { corsMiddleware } from './middlewares/cors';
import { uploadRouter } from './routes/upload.routes';

const app = express();

app.use(json());
app.use(corsMiddleware);

app.use('/upload', uploadRouter);

app.get('/upload/:filename', (req: express.Request, res: express.Response) => {
  const imagePath = path.join(__dirname, '/../public', req.params.filename);
  res.sendFile(imagePath);
});

const publicFolderPath = path.join(__dirname, '/../public');

app.get('/upload/*.*', express.static(publicFolderPath, { maxAge: '1y' }));

export { app };
