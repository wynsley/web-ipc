/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      /* Paleta de Colores Institucionales*/
      colors: {
        /* Azules */
        blue: {
          DEFAULT: "#2073AA",   // azul principal
          light: "#4FA3D1",     // azul claro
          dark: "#1A3983",      // azul oscuro
          deep: "#1B3A83",      // azul más intenso
        },
        sky: {
          DEFAULT: "#2F74A8",
          two: "#2073aa"   // azul cielo (variación)
        },
        /* Naranjas */
        orange: {
          DEFAULT: "#E08433",   // naranja principal
          soft: "#BC9E67",      // dorado/naranja suave
        },
        /* Neutros */
        neutral: {
          white: "#FBFCFC",
          light: "#F5F5F5",
          dark: "#332C25",      // marrón oscuro
          black: "#1F2937",
        },
      },

      /* Fuentes */
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        hani: ["Hani", "sans-serif"],
      },

      /* Responsivo para teléfonos menor a 375px */
      screens: {
        xs: "375px",
      },

      /* Espacios personalizados*/
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },

      /* Sombras */
      boxShadow: {
        soft: "0 4px 10px rgba(0,0,0,0.1)",
        medium: "0 6px 16px rgba(0,0,0,0.15)",
        strong: "0 10px 25px rgba(0,0,0,0.2)",
      },

      textShadow :{
        primary: "text-shadow-[0px_6px_5px_black]"
      },

      /* bordes redondeados */
      borderRadius: {
        xl2: "1.5rem",
        xl3: "2rem",
      },

      /* Animaciones */
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },

      animation: {
        float: "float 3s ease-in-out infinite",
      },

    },
  },

  plugins: [],
}