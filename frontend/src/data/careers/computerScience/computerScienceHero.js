import computingLabBackgroundImage from "@assets/images/careers/computerScience/computing-lab-background.png";
import computingStudentImage from "@assets/images/careers/computerScience/computing-student.png";
// Contenido editorial del hero; las imágenes generadas son ilustrativas.
const computerScienceHero = {
  eyebrow: "Tu futuro empieza aquí",
  tagline: {
    text: "Transforma tus ideas en",
    emphasis: "soluciones digitales.",
  },
  description:
    "El siguiente gran cambio puede comenzar contigo. Explora el mundo de la computación, conecta tu creatividad con la tecnología y da el primer paso hacia tu futuro en",
  background: computingLabBackgroundImage,
  image: {
    src: computingStudentImage,
    alt: "Estudiante de computación trabajando con una computadora portátil",
  },
  cards: {
    development: "Desarrollo digital",
    technology: "Tecnología que",
    emphasis: "conecta ideas",
  },
  action: {
    label: "Conoce admisión",
    to: "/admissions",
  },
};

export { computerScienceHero };
