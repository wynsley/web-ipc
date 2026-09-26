function Textarea({
  name,
  value,
  placeholder,
  onChange,
  required,
  rows = 4,
  className = "",
  error = false,
  ...props
}) {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      rows={rows}
      aria-invalid={error}
      className={`
        bg-neutral-white text-black px-3 outline-none w-full
        min-h-[5em] sm:min-h-[8em]
        transition-all duration-200 border
        ${error ? "border-red-500" : "border-transparent hover:border-orange"}
        ${className}
      `}
      {...props}
    />
  );
}

export { Textarea };