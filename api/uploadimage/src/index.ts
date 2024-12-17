import { app } from './config';
import { pool } from './database/pg.client';
import fs from 'fs';
import axios from 'axios';

const app = express();

app.use(json());

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:5173', 'http://localhost:5050']
};

app.use(cors(corsOptions));

const PORT = process.env.PORT;

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Chemin vers le dossier "uploads"
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nom unique pour le fichier
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
  async (req: Request, res: Response): Promise<void> => {
    console.info('Headers:', req.headers);
    console.info('Body:', req.body);
    console.info('Received file:', req.file);

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const filePath = `http://localhost:3000/uploads/${req.file.filename}`; // URL publique de l'image

    try {
      // Vérifiez l'existence du fichier avec fs.promises
      await fs.promises.access(req.file.path);

      // Appel de l'API GraphQL pour enregistrer l'image
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
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Error:', error);
      }
      res.status(500).json({ error: 'Internal Server Error' });
      return;
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
  }
});
