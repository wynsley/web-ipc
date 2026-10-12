// Configuración temporal para la presentación. Estas variables son públicas.
const env = import.meta.env || {};

const contactConfig = {
  provider: env.VITE_CONTACT_PROVIDER || "formsubmit",
  recipient: env.VITE_CONTACT_EMAIL || "craftyeyo6@gmail.com",
};

export { contactConfig };
