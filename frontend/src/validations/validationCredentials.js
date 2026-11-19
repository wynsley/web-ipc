import Joi from "joi";

const ContactFormValidator = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .pattern(/^[\p{L}\s.'-]+$/u)
    .required()
    .messages({
      "string.base": "El nombre debe ser una cadena de texto",
      "string.empty": "El nombre no puede estar vacío",
      "string.min": "El nombre debe tener mínimo 2 caracteres",
      "string.max": "El nombre no puede tener más de 100 caracteres",
      "string.pattern.base": "El nombre solo puede contener letras y espacios",
      "any.required": "El nombre es requerido",
    }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false }, minDomainSegments: 2 })
    .max(254)
    .required()
    .messages({
      "string.base": "El correo debe ser una cadena de caracteres",
      "string.empty": "El correo no puede estar vacío",
      "string.email": "Ingresa un correo electrónico válido",
      "string.max": "El correo no puede superar los 254 caracteres",
      "any.required": "El correo es requerido",
    }),

  phone: Joi.string()
    .trim()
    .min(9)
    .max(20)
    .pattern(/^\+?[0-9\s()-]+$/)
    .custom((value, helpers) => {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 9 || digits.length > 15) {
        return helpers.error("phone.digits");
      }
      return value;
    })
    .required()
    .messages({
      "string.base": "El teléfono debe ser una cadena de caracteres",
      "string.empty": "El teléfono no puede estar vacío",
      "string.min": "El teléfono debe contener al menos 9 dígitos",
      "string.max": "El teléfono no puede superar los 20 caracteres",
      "string.pattern.base": "Introduce un teléfono válido",
      "phone.digits": "El teléfono debe contener entre 9 y 15 dígitos",
      "any.required": "El teléfono es requerido",
    }),

  address: Joi.string()
    .trim()
    .min(3)
    .max(200)
    .pattern(/^[\p{L}\p{N}\s.,#°/'-]+$/u)
    .required()
    .messages({
      "string.base": "La dirección debe ser una cadena de texto",
      "string.empty": "La dirección no puede estar vacía",
      "string.min": "La dirección debe tener mínimo 3 caracteres",
      "string.max": "La dirección no puede tener más de 200 caracteres",
      "string.pattern.base": "La dirección contiene caracteres no permitidos",
      "any.required": "La dirección es requerida",
    }),

  career: Joi.string()
    .valid("administracion", "contabilidad", "informatica", "idiomas")
    .required()
    .messages({
      "any.only": "Selecciona una carrera válida",
      "string.empty": "Selecciona una carrera",
      "any.required": "La carrera es requerida",
    }),

  shift: Joi.string().valid("manana", "tarde", "noche").required().messages({
    "any.only": "Selecciona un turno válido",
    "string.empty": "Selecciona un turno",
    "any.required": "El turno es requerido",
  }),

  message: Joi.string().trim().min(5).max(1000).required().messages({
    "string.base": "El mensaje debe ser una cadena de texto",
    "string.empty": "El mensaje no puede estar vacío",
    "string.min": "El mensaje debe tener mínimo 5 caracteres",
    "string.max": "El mensaje no puede tener más de 1000 caracteres",
    "any.required": "El mensaje es requerido",
  }),
});

export { ContactFormValidator };
