function Input({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  required,
  className = "",
  error = false,
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      aria-invalid={error}
      className={`
        h-10 bg-neutral-white text-black px-3 outline-none
        transition-all duration-200 border
        ${error ? "border-red-500" : "border-transparent hover:border-orange"}
        ${className}
      `}
      {...props}
    />
  );
}

export { Input };