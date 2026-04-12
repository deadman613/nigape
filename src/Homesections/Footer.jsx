import Link from 'next/link';
import { Twitter, MessageCircle, Globe, Copyright } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <footer className="relative w-full bg-footer-main border-t border-[#FF40EB]/20 overflow-hidden">

        <div className="absolute inset-0 bg-top-glow pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-2 md:py-16 relative z-10">

          {/*
            Mobile  < 640px  : 1 col  — sab ek ke neeche ek
            Tablet  640-1023 : 2 col  — brand + programs | community + legal
            Desktop > 1024px : 4 col  — sab ek line mein
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">

            {/* ── Brand ── */}
            {/* Mobile: full width | Tablet: full width top | Desktop: col 1 */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            
              <img
                src="/Nigapepic/nigape1.png"
                alt="NIGAPE"
                className="w-[110px] h-auto object-contain "
              />

              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                India-first institute dedicated to Generative AI and Prompt Engineering outcomes.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#FF40EB]/10 border border-[#FF40EB]/30 flex items-center justify-center hover:bg-[#FF40EB]/20 hover:border-[#FF40EB] transition-all duration-300 group">
                  <Twitter className="w-4 h-4 text-[#FF40EB] group-hover:scale-110 transition" />
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#FF40EB]/10 border border-[#FF40EB]/30 flex items-center justify-center hover:bg-[#FF40EB]/20 hover:border-[#FF40EB] transition-all duration-300 group">
                  <MessageCircle className="w-4 h-4 text-[#FF40EB] group-hover:scale-110 transition" />
                </a>
                <a href="/contact-us"
                  className="w-9 h-9 rounded-full bg-[#FF40EB]/10 border border-[#FF40EB]/30 flex items-center justify-center hover:bg-[#FF40EB]/20 hover:border-[#FF40EB] transition-all duration-300 group">
                  <Globe className="w-4 h-4 text-[#FF40EB] group-hover:scale-110 transition" />
                </a>
              </div>

              {/* Contact */}
              <div className="pt-4 border-t border-[#FF40EB]/20 flex  gap-2">
                {/* <a href="mailto:info@nigape.com"
                  className="flex items-center gap-2 text-gray-300 text-sm hover:text-[#FF40EB] transition">
                  <span className="text-[#FF40EB]">✉</span>
                  info@nigape.com
                </a> */}
                <a href="tel:+917428114918"
                  className="flex items-center gap-2 text-gray-300 text-sm hover:text-[#FF40EB] transition">
                  <span className="text-[#FF40EB]">☎</span>
                  +91 74281 14918
                </a>
              </div>
            </div>

            {/* ── Programs ── */}
            {/* Mobile: full width | Tablet: left col | Desktop: col 2 */}
            <div className="col-span-1 flex flex-col gap-4">
              <h3 className="text-white font-semibold relative inline-block underline-pink pb-2">
                Programs
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Diploma in GenAI", href: "/courses/diploma-in-generative-ai-prompt-engineering" },
                  { label: "Advanced GenAI", href: "/courses/advanced-generative-ai-prompt-engineering" },
                  { label: "GenAI for Professionals", href: "/courses/generative-ai-for-professionals" },
                  { label: "AI Literacy", href: "/courses/ai-literacy-for-everyone" },
                  { label: "Deep Learning Pro", href: "/courses/deep-learning-professional" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}
                      className="text-gray-400 hover:text-[#FF40EB] transition-all duration-300 hover:translate-x-1 inline-block text-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Community ── */}
            {/* Mobile: full width | Tablet: right col | Desktop: col 3 */}
            <div className="col-span-1 flex flex-col gap-4">
              <h3 className="text-white font-semibold relative inline-block underline-pink pb-2">
                Community
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/national-institute-genai-and-prompt-engineering-116711381/" },
                  { label: "Instagram", href: "https://www.instagram.com/nigape.official/" },
                ].map((item) => (
                  <li key={item.href}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#FF40EB] transition-all duration-300 hover:translate-x-1 inline-block text-sm">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Legal ── */}
            {/* Mobile: full width | Tablet: left col | Desktop: col 4 */}
            <div className="col-span-1 flex flex-col gap-4">
              <h3 className="text-white font-semibold relative inline-block underline-pink pb-2">
                Legal
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms of Service", href: "/terms-of-service" },
                  { label: "Terms & Conditions", href: "/terms-and-conditions" },
                  { label: "Disclaimer", href: "/disclaimer" },
                  { label: "Sitemap XML", href: "/sitemap.xml" },
                  { label: "Sitemap HTML", href: "/sitemap.html" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}
                      className="text-gray-400 hover:text-[#FF40EB] transition-all duration-300 hover:translate-x-1 inline-block text-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ── Bottom Bar ──
          <div className="mt-12 pt-6 border-t border-[#FF40EB]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Copyright className="w-4 h-4" />
              <span>2025 NIGAPE. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF40EB] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF40EB]" />
              </span>
              <span className="text-[#FF40EB] font-semibold">Online</span>
            </div>
          </div> */}

        </div>


      </footer>
    </>
  );
}