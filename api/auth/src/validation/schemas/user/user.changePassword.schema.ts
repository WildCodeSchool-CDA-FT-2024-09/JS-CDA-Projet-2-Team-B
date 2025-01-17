import Joi from 'joi';

export default Joi.object({
  currentPassword: Joi.string().min(8).max(128).required().messages({
    'string.base': 'Le mot de passe actuel doit être une chaîne de caractères',
    'string.max': 'Le mot de passe actuel doit faire 128 caractères ou moins',
    'any.required': 'Le mot de passe actuel est requis'
  }),
  newPassword: Joi.string().min(8).max(128).required().messages({
    'string.base': 'Le nouveau mot de passe doit être une chaîne de caractères',
    'string.max': 'Le nouveau mot de passe doit faire 128 caractères ou moins',
    'any.required': 'Le nouveau mot de passe est requis'
  }),
  confirmNewPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'string.base':
        'La confirmation du mot de passe doit être une chaîne de caractères',
      'any.only':
        'La confirmation du mot de passe doit être identique au nouveau mot de passe',
      'any.required': 'La confirmation du mot de passe est requise'
    })
});
