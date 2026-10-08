const Icon = ({ d, className = "h-6 w-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d={d} />
  </svg>
);

export const CloseIcon = () => <Icon d="M6 6l12 12M18 6L6 18" />;
export const PrevIcon = () => <Icon d="M15 5l-7 7 7 7" />;
export const NextIcon = () => <Icon d="M9 5l7 7-7 7" />;