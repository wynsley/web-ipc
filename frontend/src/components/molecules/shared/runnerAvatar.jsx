const RUNNER_CSS = `
.ra-bob{animation:ra-bob .6s ease-in-out infinite}
.ra-t{transform-origin:22px 35px;animation:ra-thigh .6s ease-in-out infinite}
.ra-s{transform-origin:22px 45px;animation:ra-shin .6s ease-in-out infinite}
.ra-a{transform-origin:26px 21px;animation:ra-arm .6s ease-in-out infinite}
.ra-f{transform-origin:26px 29px;animation:ra-fore .6s ease-in-out infinite}
.ra-far *{animation-delay:-.3s}
.ra-scarf{transform-origin:24px 21px;animation:ra-flap .3s ease-in-out infinite alternate}
.ra-tassel{transform-origin:39px 7px;animation:ra-swing .3s ease-in-out infinite alternate}
@keyframes ra-bob{0%,50%,100%{transform:translateY(2.2px)}25%,75%{transform:translateY(0)}}
@keyframes ra-thigh{0%,100%{transform:rotate(-38deg)}50%{transform:rotate(30deg)}}
@keyframes ra-shin{0%,100%{transform:rotate(12deg)}25%{transform:rotate(18deg)}50%{transform:rotate(70deg)}75%{transform:rotate(100deg)}}
@keyframes ra-arm{0%,100%{transform:rotate(40deg)}50%{transform:rotate(-50deg)}}
@keyframes ra-fore{0%,100%{transform:rotate(-70deg)}50%{transform:rotate(-95deg)}}
@keyframes ra-flap{from{transform:rotate(-7deg)}to{transform:rotate(7deg)}}
@keyframes ra-swing{from{transform:rotate(-12deg)}to{transform:rotate(10deg)}}
@media (prefers-reduced-motion:reduce){.ra-bob,.ra-bob *{animation:none!important}}
`;

function RunnerAvatar({ className, style }) {
  return (
    <>
      <style>{RUNNER_CSS}</style>
      <svg
        viewBox="0 0 48 56"
        aria-hidden="true"
        focusable="false"
        className={className}
        style={style}
      >
        <ellipse cx="24" cy="55.2" rx="11" ry="1.4" fill="#1A407E" opacity=".14" />

        <g className="ra-bob">
          {/* Brazo y pierna lejanos */}
          <g className="ra-far">
            <g className="ra-a">
              <line x1="26" y1="21" x2="26" y2="29" stroke="#14325F" strokeWidth="4" strokeLinecap="round" />
              <g className="ra-f">
                <line x1="26" y1="29" x2="26" y2="36" stroke="#14325F" strokeWidth="3.6" strokeLinecap="round" />
                <circle cx="26" cy="36.8" r="2.3" fill="#14325F" />
              </g>
            </g>
            <g className="ra-t">
              <line x1="22" y1="35" x2="22" y2="45" stroke="#14325F" strokeWidth="5" strokeLinecap="round" />
              <g className="ra-s">
                <line x1="22" y1="45" x2="22" y2="53" stroke="#14325F" strokeWidth="4.4" strokeLinecap="round" />
                <rect x="21" y="52" width="8.5" height="3.6" rx="1.8" fill="#C9600A" />
              </g>
            </g>
          </g>

          {/* Tronco */}
          <line x1="26" y1="21" x2="22" y2="35" stroke="#1A407E" strokeWidth="11" strokeLinecap="round" />

          {/* Bufanda que ondea */}
          <g className="ra-scarf">
            <path d="M23 19.5C18 17.5 13 19.5 8 16.5C11 23 17 24.5 24 22.5Z" fill="#F0790D" />
          </g>
          <circle cx="26.5" cy="19.5" r="4" fill="#F0790D" />

          {/* Pierna cercana */}
          <g className="ra-t">
            <line x1="22" y1="35" x2="22" y2="45" stroke="#2F6BB5" strokeWidth="5" strokeLinecap="round" />
            <g className="ra-s">
              <line x1="22" y1="45" x2="22" y2="53" stroke="#2F6BB5" strokeWidth="4.4" strokeLinecap="round" />
              <rect x="21" y="52" width="8.5" height="3.6" rx="1.8" fill="#F0790D" />
            </g>
          </g>

          {/* Cabeza */}
          <circle cx="28" cy="11.5" r="6.8" fill="#4F90BE" />
          <circle cx="31.6" cy="12.6" r="1.5" fill="#fff" />
          <circle cx="32" cy="12.6" r=".8" fill="#14325F" />

          {/* Birrete */}
          <rect x="22" y="7.6" width="12" height="3.6" rx="1.6" fill="#14325F" />
          <polygon points="16,7 28,3.6 40,7 28,10.4" fill="#1A407E" />
          <circle cx="28" cy="7" r="1.1" fill="#C9A24B" />
          <g className="ra-tassel">
            <path d="M28 7H39L39.4 13" fill="none" stroke="#C9A24B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="39.4" cy="14.2" r="1.6" fill="#C9A24B" />
          </g>

          {/* Brazo cercano */}
          <g className="ra-a">
            <line x1="26" y1="21" x2="26" y2="29" stroke="#2F6BB5" strokeWidth="4" strokeLinecap="round" />
            <g className="ra-f">
              <line x1="26" y1="29" x2="26" y2="36" stroke="#2F6BB5" strokeWidth="3.6" strokeLinecap="round" />
              <circle cx="26" cy="36.8" r="2.3" fill="#4F90BE" />
            </g>
          </g>
        </g>
      </svg>
    </>
  );
}

export { RunnerAvatar, RUNNER_CSS };