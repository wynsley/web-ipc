import { Link, useLocation } from "react-router-dom";

function NavbarLink({ href, text, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      onClick={onClick}
      className={`
        relative
        block px-4 py-2.5 md:px-0 md:py-0
        font-medium no-underline
        transition-colors duration-200
        md:rounded-none

        ${isActive ? 'text-orange-400' : 'text-[#2073AA]'}
        hover:text-orange-400

        ${isActive 
          ? 'bg-transparent' 
          : 'hover:bg-gray-100 md:hover:bg-transparent'
        }

        after:content-['']
        after:absolute
        after:left-0
        after:bottom-0
        after:h-0.5
        after:bg-orange-400
        after:transition-all
        after:duration-300

        ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
      `}
    >
      {text}
    </Link>
  );
}

export { NavbarLink };