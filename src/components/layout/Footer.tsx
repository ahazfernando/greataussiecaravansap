import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const footerNavigation = {
  caravans: [
    { name: "All Caravans", href: "/caravans" },
    { name: "Hybrids", href: "/caravans?type=hybrids" },
    { name: "Caravans", href: "/caravans?type=caravans" },
    { name: "Motorhomes", href: "/caravans?type=motorhomes" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our story", href: "/our-story" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "Warranty Information", href: "/warranty" },
    { name: "Request a Brochure", href: "/brochure" },
    { name: "FAQs", href: "/faqs" },
  ],
  social: [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "YouTube", href: "#", icon: Youtube },
    { name: "TikTok", href: "#", icon: TikTokIcon },
    { name: "LinkedIn", href: "#", icon: Linkedin },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-wide py-16 lg:py-20">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/greataussielogo.png"
                alt="Great Aussie Caravans"
                width={200}
                height={60}
                className="h-auto w-auto"
                priority
              />
            </Link>
            <p className="text-sm leading-6 text-gray-400 max-w-xs text-center">
              Quality Australian caravans built for real adventures. Family-owned, built tough, designed for comfort and reliability.
            </p>
            <div className="flex space-x-4 justify-center">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Models</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.caravans.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-400 hover:text-accent transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-400 hover:text-accent transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-400 hover:text-accent transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Contact</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-400">
                      88 – 106 Kyabram Street<br />
                      Coolaroo, VIC 3048
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                    <a href="tel:+61393088511" className="text-sm text-gray-400 hover:text-accent transition-colors">
                      03 9308 8511
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <a href="mailto:info@greataussiecaravans.com.au" className="text-sm text-gray-400 hover:text-accent transition-colors break-all sm:break-normal">
                      <span className="block sm:inline">info@greataussie</span>
                      <span className="block sm:inline">caravans.com.au</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Great Aussie Caravans. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link href="/privacy" className="text-xs text-gray-500 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs text-gray-500 hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
