import { translationImages } from "./images";

const translationLearning = [
  {
    label: "Traducción",
    word: "El texto.",
    title: "Cada palabra tiene una intención.",
    description:
      "Analiza el significado, el registro y la voz de un texto. Traducir implica investigar y elegir las palabras que mejor conservan su intención.",
    image: translationImages.translation,
    imageAlt:
      "Escena ilustrativa de revisión de documentos y traducción escrita",
    example: {
      source: "Make yourself at home.",
      target: "Siéntete como en casa.",
      note: "La naturalidad importa tanto como la precisión: una invitación debe seguir sonando cercana.",
    },
  },
  {
    label: "Interpretación",
    word: "La voz.",
    title: "Escuchar también es interpretar.",
    description:
      "La comunicación oral exige atención, comprensión y claridad. Explora cómo la escucha activa y la toma de notas ayudan a transmitir una idea.",
    image: translationImages.interpreting,
    imageAlt:
      "Escena ilustrativa de un intérprete practicando escucha y toma de notas frente a un micrófono",
    example: {
      source: "The floor is yours.",
      target: "Tiene la palabra.",
      note: "En una conferencia, reconocer la situación permite comunicar la intención del hablante.",
    },
  },
  {
    label: "Cultura",
    word: "El contexto.",
    title: "Una expresión. Todo un contexto.",
    description:
      "Las expresiones adquieren sentido en una cultura. Comprender a quién va dirigido el mensaje ayuda a construir un puente entre perspectivas.",
    image: translationImages.culture,
    imageAlt:
      "Escena ilustrativa de diálogo y colaboración entre profesionales de idiomas",
    example: {
      source: "It's a piece of cake.",
      target: "Es pan comido.",
      note: "Dos expresiones diferentes pueden comunicar la misma idea: algo es muy fácil.",
    },
  },
  {
    label: "Localización",
    word: "La experiencia.",
    title: "Haz que un contenido se sienta cercano.",
    description:
      "Adaptar una experiencia digital requiere atender al lenguaje, las convenciones y el contexto de sus usuarios, además de revisar cada detalle.",
    image: translationImages.localization,
    imageAlt:
      "Escena ilustrativa de una profesional revisando la localización de una interfaz en un monitor y un teléfono",
    example: {
      source: "Save your changes",
      target: "Guardar cambios",
      note: "En una interfaz, un mensaje breve y claro ayuda a las personas a entender qué acción van a realizar.",
    },
  },
];

export { translationLearning };
