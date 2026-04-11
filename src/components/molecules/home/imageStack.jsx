function ImageStack({ imgTop, imgBottom }) {
  return (
    <>
      {/* MOBILE / TABLET */}
      <div className="md:hidden grid grid-cols-2 gap-4 w-full">
        <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden">
          {imgTop?.src
            ? <img src={imgTop.src} alt={imgTop.alt} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-[#c9a98a]" />
          }
        </div>

        <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden mt-8">
          {imgBottom?.src
            ? <img src={imgBottom.src} alt={imgBottom.alt} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-[#c9a98a]" />
          }
        </div>
      </div>

      {/* DESKTOP */}
      <div
        className="hidden md:flex w-full relative"
        style={{ height: 'clamp(480px, 55vw, 680px)' }}
      >
        {/* Bloque gris decorativo */}
        <div
          className="absolute bg-gray-100 rounded-sm shadow-md shadow-neutral-500/20"
          style={{
            width:  'clamp(200px, 38vw, 350px)',
            height: 'clamp(280px, 40vw, 400px)',
            bottom: '20%',
            right:  '6%',
          }}
        />

        {/* Imagen superior — anclada arriba a la izquierda */}
        <div
          className="absolute rounded-md overflow-hidden z-10 left-0 lg:pl-0"
          style={{
            width:  'clamp(10em, 18vw, 20em)',
            height: 'clamp(8em, 15vw, 18em)',
            top:    '4%', 
            left:   'clamp(-12px, -1.5vw, -24px)',
          }}
        >
          {imgTop?.src
            ? <img src={imgTop.src} alt={imgTop.alt} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-[#c9a98a]" />
          }
        </div>

        {/* Imagen inferior — anclada abajo a la izquierda */}
        <div
          className="absolute rounded-md overflow-hidden z-10"
          style={{
            width:  'clamp(10em, 18vw, 20em)',
            height: 'clamp(8em, 15vw, 18em)',
            bottom: '4%',
            left:   'clamp(-12px, -1.5vw, -24px)',
          }}
        >
          {imgBottom?.src
            ? <img src={imgBottom.src} alt={imgBottom.alt} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-[#c9a98a]" />
          }
        </div>
      </div>
    </>
  )
}

export { ImageStack }