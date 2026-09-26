function Select({
  options,
  name,
  value,
  onChange,
  required,
  className = "",
  error = false,
  ...props
}) {
  return (
    <select
      name={name}
      value={value}
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
    >
      {options.map((opt, o) => (
        <option
          key={o}
          value={opt.value}
          disabled={opt.value === "0"}
          className="text-black font-hani font-bold bg-white"
        >
          {opt.text}
        </option>
      ))}
    </select>
  );
}

export { Select };