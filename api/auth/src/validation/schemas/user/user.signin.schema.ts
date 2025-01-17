import Joi from 'joi';

export default Joi.object({
  email: Joi.string().email().max(100).required().messages({
    'string.base': "L'email doit être une chaîne de caractères",
    'string.max': "L'email doit faire 100 caractères ou moins",
    'string.email': 'Merci de renseigner un email valide'
  }),
  password: Joi.string().max(128).required().messages({
    'string.base': 'Le numéro de téléphone doit être une chaîne de caractères',
    'string.max': 'Le numéro de téléphone doit faire 20 caractères ou moins'
  })
});
