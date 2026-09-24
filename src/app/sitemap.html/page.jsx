import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About NIGAPE" },
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/programs/degree-in-ai", label: "Degree in AI" },
  { href: "/programs/pg-in-ai", label: "PG in AI" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/terms-and-conditions", label: "Terms and Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/courses/diploma-in-generative-ai-prompt-engineering", label: "Diploma in GenAI" },
  { href: "/courses/advanced-generative-ai-prompt-engineering", label: "Advanced GenAI" },
  { href: "/courses/advanced-certification-in-generative-ai-prompt-engineering", label: "Advanced Certification in GenAI" },
  { href: "/courses/ai-literacy-for-everyone", label: "AI Literacy for Everyone" },
  { href: "/courses/generative-ai-for-professionals", label: "Generative AI for Professionals" },
  { href: "/courses/nlp-professional", label: "NLP Professional" },
  { href: "/courses/computer-vision-professional", label: "Computer Vision Professional" },
  { href: "/courses/deep-learning-professional", label: "Deep Learning Professional" },
  { href: "/sitemap.xml", label: "Sitemap XML" },
];

export default function SitemapHtmlPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Sitemap (HTML)</h1>
        <ul className="space-y-3 text-gray-300">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-[#FF40EB] transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
