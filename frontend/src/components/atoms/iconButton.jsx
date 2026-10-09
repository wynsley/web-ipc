function IconButton({ label, onClick, className = "", children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`rounded-full p-2 text-white transition ${className}`}
    >
      {children}
    </button>
  );
}

export { IconButton };