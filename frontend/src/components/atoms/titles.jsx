import { motion } from "motion/react";
import { titleReveal } from "../animations/animation";

function Title({
  level = 'h1',
  size = 'default',
  children,
  text,
  className = '',
  variant = 'default',
  align = 'left',
  weight = 'normal',
  ...props
}) {
  const Tag = motion[level];

  const variants = {
    default: 'text-black',
    primary: 'text-white',
    secondary: 'text-orange',
    danger: 'text-blue',
    institutional: 'text-blue-dark',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const defaultByLevel = {
  h1: 'text-[1.1em] xs:text-[1.6em] sm:text-[1.9em] md:text-[2.8em] xl:text-6xl',
  h2: 'text-[1.7em] xs:text-[2.5] sm:text-[2.2em] md:text-[2.4em]',
  h3: 'text-[1.3em] sm:text-[1.2em] md:text-[1.2em] xl:text-[1.9em]',
  h4: 'text-sm sm:text-base md:text-lg',
  h5: 'text-xs sm:text-sm md:text-base',
  h6: 'text-[10px] sm:text-xs md:text-sm',
};


  const sizes = {
    default: defaultByLevel[level] || defaultByLevel.h1,
    compact: 'text-[clamp(1.25rem,1rem+0.55vw,1.625rem)]',
    hero: 'text-[clamp(1.875rem,3.8vw,3.25rem)]',
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    bold: 'font-bold',
  };

  return (
    <Tag
      variants={titleReveal}
      className={`
        ${sizes[size] || sizes.default}
        ${weights[weight] || weights.normal}
        ${variants[variant] || variants.default}
        ${alignments[align] || alignments.left}
        ${className}
      `}
      {...props}
    >
      {children || text}
    </Tag>
  );
}

export { Title };
