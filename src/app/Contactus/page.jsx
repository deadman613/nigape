// app/contact/page.jsx
'use client';

import { Home, Info, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { memo } from "react";
import Iridescence from '@/bits/Iridescence';


const navItems = [
  { name: "About", icon: Info, href: "About" },
  { name: "Courses", icon: BookOpen, href: "/courses" },
];

const socials = ["X", "Discord", "Telegram", "Instagram"];

const Navbar = memo(() => (
  <motion.nav
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="fixed top-6 sm:top-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
  >
    <div className="pointer-events-auto w-full max-w-4xl">
      <div
        className="
        flex items-center justify-between 
        px-5 py-4 sm:px-8 sm:py-5 
        bg-black/70 backdrop-blur-xl 
        rounded-2xl sm:rounded-full 
        shadow-2xl border border-white/10
        overflow-x-auto scrollbar-hide
      "
      >
        {/* Home Button */}
        <Link
          href="/"
          className="
            flex items-center gap-3 
            px-5 py-3 rounded-full 
            text-white font-bold text-sm 
            bg-gradient-to-r from-purple-500 to-pink-500
            shadow-lg hover:shadow-purple-500/50 
            transition-all duration-300 
            whitespace-nowrap shrink-0
          "
        >
          <Home size={22} strokeWidth={2.8} />
          <span className="hidden sm:inline">Home</span>
        </Link>

        {/* Icons */}
        <div className="flex items-center gap-5 sm:gap-7 shrink-0">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-label={item.name}
              className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 shrink-0"
            >
              <item.icon size={26} strokeWidth={2.2} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </motion.nav>
));

Navbar.displayName = "ContactNavbar";

export default function ContactPage() {
  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <Iridescence
          color={[1, 1, 1]}        
          mouseReact={false}       
          amplitude={0.1}
          speed={1.0}
        />
      </div>
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-36 pb-40 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl font-extrabold text-black mb-6 tracking-tight"
          >
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
          >
            Due to high volume of orders and interactions, it may take longer
            to respond. We appreciate your patience.
          </motion.p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="px-6 pb-32 bg-black/95 pt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">

          {/* LEFT: FORM */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                We’re happy to help!
              </h2>
              <p className="text-pink-200/85 text-lg leading-relaxed">
                Questions or concerns? Send us a message below.
              </p>
            </div>

            <form className="space-y-7">
              <input
                type="text"
                placeholder="* Your Name"
                required
                className="w-full px-6 py-5 bg-white/10 border border-pink-500/30 rounded-xl text-white placeholder-pink-300/70 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
              />

              <input
                type="email"
                placeholder="* Your Email"
                required
                className="w-full px-6 py-5 bg-white/10 border border-pink-500/30 rounded-xl text-white placeholder-pink-300/70 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
              />

              <textarea
                rows={7}
                placeholder="Your message..."
                required
                className="w-full px-6 py-5 bg-white/10 border border-pink-500/30 rounded-xl text-white placeholder-pink-300/70 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 resize-none backdrop-blur-sm"
              />

              <button
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* RIGHT: INFO */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-16 text-white"
          >
            {/* FAQ */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-pink-400 mb-5">
                FAQs
              </h3>
              <p className="text-pink-100/90 leading-relaxed">
                Have a quick question?
                Check our FAQs for instant answers.
              </p>
              <a
                href="#"
                className="inline-block mt-5 text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4 transition"
              >
                View FAQs →
              </a>
            </div>

            {/* OFFICE */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-pink-400 mb-5">
                Office
              </h3>
              <p className="text-pink-100/90 leading-relaxed">
                1520 Luna Road Carrollton,<br />
                TX 75006, United States
              </p>
            </div>

            {/* SOCIALS */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-pink-400 mb-6">
                Follow Us
              </h3>
              <div className="flex gap-5">
                {socials.map((s) => (
                  <div
                    key={s}
                    className="w-14 h-14 rounded-full bg-white/10 border border-pink-500/40 flex items-center justify-center text-lg font-semibold hover:bg-pink-500/20 hover:border-pink-400 cursor-pointer transition-all duration-300"
                  >
                    {s[0]}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GLOBAL FONT */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </>
  );
}
