import express, { json, Request, Response } from 'express';
import 'dotenv/config';
import { sendEmail, validateEmail } from './utils/index.utils';
import { validationResult } from 'express-validator';

const app = express();

app.use(json());

app.post('/email/send', validateEmail, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
  }

  try {
    const { success } = await sendEmail(req.body);
    if (success) {
      res.status(200).send({ message: 'Email envoyé avec succès.' });
    } else {
      res
        .status(500)
        .send("Une erreur est survenue lors de l'envoi de l'email.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: 'Une erreur inconnue est survenue.' });
    }
  }
});

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.info(`Listening on port ${PORT}`);
});
