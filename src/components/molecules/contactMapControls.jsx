function MapControls({ mapsUrl }) {
  return (
    <div className="map-controls">
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="map-btn">
        Ver en Google Maps
      </a>
      <button
        type="button"
        className="map-btn"
        onClick={() => {
          navigator.clipboard?.writeText(mapsUrl);
          alert("Enlace copiado al portapapeles");
        }}
      >
        Copiar enlace
      </button>
    </div>
  );
}

export {MapControls}