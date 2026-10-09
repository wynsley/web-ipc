function CategoryBadge({ children, className = "" }) {
  return (
    <span
      className={`w-fit rounded-sm bg-orange px-2 py-0.5 font-poppins text-[0.7rem] font-semibold 
        uppercase tracking-wide text-white ${className}`}
    >
      {children}
    </span>
  );
}

export { CategoryBadge };