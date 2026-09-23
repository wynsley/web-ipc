function Dost ({dots, next, current}) {
  return(
    <div className="
          absolute bottom-4 sm:bottom-6
          left-1/2 -translate-x-1/2
          z-100 flex items-center gap-3
          pointer-events-none
        ">
          {dots.map((_, i) => {
            const active = i === (next !== null ? next : current)
            return (
              <div
                key={i}
                style={{
                  width: active ? '2.5rem' : '0.75rem',
                  height: '0.75rem',
                  background: active ? '#f97316' : 'rgba(255,255,255,0.45)',
                  borderRadius: '9999px',
                  transition: 'width 300ms ease, background 300ms ease',
                }}
              />
            )
          })}
        </div>
  )
}

export {Dost}