import express, { json, Response, Request } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import 'dotenv/config';
import { pool } from './database/pg.client';
import fs from 'fs';
import axios from 'axios';

const app = express();

app.use(json());

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));

const PORT = process.env.PORT;

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads'); // Dossier de stockage des images
    fs.mkdirSync(uploadPath, { recursive: true }); // Crée le dossier s'il n'existe pas
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nom unique pour chaque fichier
  }
});
const upload = multer({ storage });

// Route de test
app.get('/upload', (_: Request, res: Response) => {
  res.send('Hello World');
});

// Route pour uploader une image
app.post(
  '/upload',
  upload.single('image'),
  async (req: Request, res: Response) => {
    console.info('Received file:', req.file);
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const filePath = `http://localhost:3000/uploads/${req.file.filename}`; // URL publique de l'image

    try {
      // Lecture du fichier pour vérifier son existence
      fs.readFile(req.file.path, async (err) => {
        if (err) {
          console.error('Error reading file:', err);
          return res.status(500).json({ error: 'Error reading file' });
        }

        // Appel de l'API GraphQL dans le service `product` pour enregistrer l'image
        try {
          const response = await axios.post('http://product:4000/graphql', {
            query: `
            mutation {
              addImage(data: {url: "${filePath}", isMain: false}) {
                id
                url
                isMain
              }
            }
          `
          });

          if (response.data.errors) {
            console.error('GraphQL errors:', response.data.errors);
            res.status(500).json({ error: 'Failed to save image in database' });
            return;
          }

          // Réponse en cas de succès
          res.status(200).json({
            status: 'success',
            data: response.data.data.addImage
          });
        } catch (apiError) {
          console.error('Error while calling product service:', apiError);
          res
            .status(500)
            .json({ error: 'Error while calling product service' });
        }
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Démarrage du serveur
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
