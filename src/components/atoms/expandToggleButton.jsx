import './expandToggleButton.css'

const ExpandToggleButton = ({ isExpanded, onClick }) => {
    return (
        <button 
            className="expand__toggle__btn"
            onClick={onClick}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Ver menos información' : 'Ver más información'}
        >
            {isExpanded ? 'Ver menos' : 'Ver más'}
            <span className={`expand__toggle__icon ${isExpanded ? 'expand__toggle__rotated' : ''}`}>
                <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M7 10L12 15L17 10" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        </button>
    )
}

export { ExpandToggleButton }