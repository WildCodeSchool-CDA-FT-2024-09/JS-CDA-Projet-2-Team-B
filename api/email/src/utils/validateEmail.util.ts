import { body } from 'express-validator';

export const validateEmail = [
  body('receiver')
    .isEmail()
    .withMessage("L'adresse email du destinataire est invalide")
    .normalizeEmail(),
  body('subject')
    .notEmpty()
    .withMessage("Le sujet de l'email ne peut pas être vide")
    .isLength({ max: 255 })
    .withMessage("Le sujet de l'email ne doit pas dépasser 255 caractères"),
  body('content')
    .notEmpty()
    .withMessage("Le contenu de l'email ne peut pas être vide")
];
