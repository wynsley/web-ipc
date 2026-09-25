import { Title } from "../../atoms/titles";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

function FooterSocial() {
  const socials = [
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok" },
    { icon: FaWhatsapp, href: "https://wa.me/", label: "WhatsApp" },
  ];

  return (
    <section
      aria-labelledby="footer-social-title"
      className="min-w-0 text-center lg:text-left lg:self-start lg:pt-[1.2vw]"
    >
      <Title
        level="h3"
        size="compact"
        align="center"
        text="SÍGUENOS:"
        className="mb-5 text-gray-400 font-hani lg:mb-7 text-center md:text-left"
      />

      <div className="flex items-center justify-center lg:justify-start gap-3">
        {socials.map(({icon, href, label }) => {
          const Icon = icon
          return (
            <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex items-center justify-center size-9 rounded-full border border-white/30 text-white/80 transition-all duration-200 hover:bg-white hover:text-[#232E42] hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Icon className="size-4" />
          </a>
          )
        })}
      </div>
    </section>
  );
}

export { FooterSocial };