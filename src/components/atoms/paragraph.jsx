function Paragraph ({ 
  children,
  text, 
  className = '',
  size = 'medium',
  variant = 'default',
  align = 'left',
  weight = 'normal',
  ...props 
}) {

  const variants ={
    default: 'text-black',
    primary: 'text-white',
    secondary: 'text-[#A66A06]',
    danger: 'text-gray-600'
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const sizes = {
    small:  "text-[0.6em] sm:text-[.7em] md:text-[.9em]",
    medium: "text-[.6em] sm:text-[.9em] md:text-[1em]",
    large:  "text-[.9em] sm:text-[1em] md:text-[1.1em] lg:text-[1.2em]",
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    bold: 'font-bold',
  };

  return (
    <p 
      className={`
        ${variants[variant] || variants.default}
        ${sizes[size] || sizes.medium}
        ${alignments[align] || alignments.left}
        ${weights[weight] || weights.normal}
        ${className}
      `}
      {...props}
    >
      {children || text}
    </p>
  );
};

export { Paragraph };