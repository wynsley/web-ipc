import { Title } from "../../atoms/titles";

function CardsForm({ whyList }) {
  return (
    <div className="max-w-250 mx-auto p-4">

      <Title
        text="¿Por qué elegirnos?"
        align="center"
        className="mb-6 text-xl font-bold"
      />

      <div className="grid grid-cols-2 gap-4">

        {/* COLUMNA IZQUIERDA */}
        <div className="grid gap-4">
          
          {/* pequeña */}
          {whyList[0] && (
            <Card item={whyList[0]} height=" h-[10em] md:h-[12em] lg:h-[15em]" color="bg-blue/20" />
          )}

          {/* grande */}
          {whyList[1] && (
            <Card item={whyList[1]} height=" h-[14em] md:h-[16em]  lg:h-[20em]" color="bg-black/20" />
          )}

        </div>

        {/* COLUMNA DERECHA */}
        <div className="grid gap-4">
          
          {/* grande */}
          {whyList[2] && (
            <Card item={whyList[2]} height="h-[14em] md:h-[16em] lg:h-[20em]" color="bg-black/20" />
          )}

          {/* pequeña */}
          {whyList[3] && (
            <Card item={whyList[3]} height="h-[10em] md:h-[12em] lg:h-[15em]" color="bg-blue/20" />
          )}

        </div>

      </div>
    </div>
  );
}

/* 🔥 Componente reutilizable */
function Card({ item, height, color }) {
  return (
    <div className={`relative ${height} rounded-md overflow-hidden group`}>
      
      <img
        src={item.img}
        alt={item.text}
        className="absolute inset-0 w-full h-full object-cover 
        transition duration-500 group-hover:scale-110
        text-[.6em] md:text-[.8em]
        "
      />

      <div className={`absolute inset-0 ${color}`} />

      <div className="relative z-10 h-full flex items-end p-4">
        <p className="text-white text-sm md:text-base font-medium leading-snug">
          {item.text}
        </p>
      </div>

    </div>
  );
}

export { CardsForm };