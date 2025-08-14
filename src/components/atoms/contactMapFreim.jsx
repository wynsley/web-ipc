
function MapFrame({ src, height, address }) {
  return (
    <div className="map-frame" style={{ height }}>
      <iframe
        title={`Mapa de ${address}`}
        src={src}
        className="map-iframe"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export {MapFrame}