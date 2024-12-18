import express from 'express';
import { json } from 'express';
import path from 'path';
import { corsMiddleware } from './middlewares/cors';
import { uploadRoutes } from './routes/upload.routes';

const app = express();

app.use(json());
app.use(corsMiddleware);

// Serve server resources

app.use('/upload/image', uploadRoutes);

const publicFolderPath = path.join(__dirname, '/../public');
// app.get('/upload/*', (req, res) => {
//   console.log(req.body);
//   console.log(publicFolderPath);
//   res.send('Hello Wordl');
// });
app.get('/upload/*.*', express.static(publicFolderPath, { maxAge: '1y' }));

export { app };
