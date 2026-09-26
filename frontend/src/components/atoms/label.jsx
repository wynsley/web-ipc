function Label({ children, className = "", htmlFor, text, ...props }) {
  if (!text && !children) return null;

  return (
    <label
      htmlFor={htmlFor}
      className={`text-white font-hani text-[1.1em] font-bold ${className}`}
      {...props}
    >
      {children || text}
    </label>
  );
}

export { Label };