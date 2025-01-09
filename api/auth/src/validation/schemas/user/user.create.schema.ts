import Joi from 'joi';

export default Joi.object({
  first_name: Joi.string().max(100).required().messages({
    'string.base': 'Le prénom doit être une chaîne de caractères',
    'string.max': 'Le prénom doit faire 20 caractères ou moins'
  }),
  last_name: Joi.string().max(100).required().messages({
    'string.base': 'Le nom doit être une chaîne de caractères',
    'string.max': 'Le nom doit faire 50 caractères ou moins'
  }),
  email: Joi.string().email().max(100).required().messages({
    'string.base': "L'email doit être une chaîne de caractères",
    'string.max': "L'email doit faire 100 caractères ou moins",
    'string.email': 'Merci de renseigner un email valide'
  }),
  phone: Joi.string().max(20).required().messages({
    'string.base': 'Le numéro de téléphone doit être une chaîne de caractères',
    'string.max': 'Le numéro de téléphone doit faire 20 caractères ou moins'
  }),
  starting_date: Joi.string().required().messages({
    'string.base': 'La date de début doit être une string'
  }),
  ending_date: Joi.string().required().messages({
    'string.base': 'La date de fin doit être une string'
  })
});
