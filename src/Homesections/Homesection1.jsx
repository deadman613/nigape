import React from 'react';
import Link from 'next/link';

export default function NigapeGallery() {
  const galleryItems = [
    { id: 1, src: "/Nigapepic/1.webp", alt: "AI Lab with students collaborating" },
    { id: 2, src: "/Nigapepic/2.webp", alt: "Mentor-led workshop session" },
    { id: 3, src: "/Nigapepic/3.webp", alt: "Modern classroom setup" },
    { id: 4, src: "/Nigapepic/4.webp", alt: "Students presenting AI projects" },
    { id: 5, src: "/Nigapepic/5.webp", alt: "Hackathon event" },
    { id: 6, src: "/Nigapepic/6.webp", alt: "Dedicated AI workspace" },
    { id: 7, src: "/Nigapepic/7.webp", alt: "One-on-one mentorship" },
    { id: 8, src: "/Nigapepic/8.webp", alt: "Group coding session" },
    { id: 9, src: "/Nigapepic/9.webp", alt: "AI infrastructure server room" },
  ];

  return (
    <div className="min-h-screen bg-black py-8 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8 font-['Geist',sans-serif]">
      <div className="max-w-[1200px] mx-auto">
        {/* First Row: Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {/* LEFT: Large Hero Card (spans 2 columns on desktop) */}
          <div className="lg:col-span-2 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#9234eb]/30 group bg-gradient-to-br from-[#1a1a2e] to-[#16213e] h-[280px] sm:h-[380px] md:h-[450px] lg:h-[500px]">
            <img
              src={galleryItems[0].src}
              alt={galleryItems[0].alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
           
            {/* Bottom Headline - Responsive positioning and sizing */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8 p-4 sm:p-5 lg:p-6 bg-black/60 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-[#9234eb]/50 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Learn, Build, and Launch <br />Your AI Career
              </h2>
            </div>
          </div>

          {/* RIGHT: Two Stacked Cards */}
          <div className="lg:col-span-1 flex flex-col gap-3 sm:gap-4 lg:gap-5">
            {/* TOP CARD */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#9234eb]/30 group bg-gradient-to-br from-[#1a1a2e] to-[#16213e] h-[180px] sm:h-[200px] md:h-[220px] lg:h-[245px]">
              <img
                src={galleryItems[1].src}
                alt={galleryItems[1].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Top-right Arrow Button */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-5 lg:right-5">
                <Link
                  href="/about-us"
                  aria-label="Visit About Us"
                  className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/80 backdrop-blur-sm text-white text-lg sm:text-xl font-bold shadow-lg border border-white/20 transition-all duration-300 hover:bg-black hover:scale-110"
                >
                  ↗
                </Link>
              </div>
            </div>

            {/* BOTTOM CARD */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#9234eb]/30 group bg-gradient-to-br from-[#1a1a2e] to-[#16213e] h-[180px] sm:h-[200px] md:h-[220px] lg:h-[245px]">
              <img
                src={galleryItems[2].src}
                alt={galleryItems[2].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Top-right CTA Button
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-5 lg:right-5">
                <a href="/About">
                  <button className="bg-[#FF40EB] backdrop-blur-sm border-2 border-[#FF40EB] text-black text-xs sm:text-sm font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap">
                    About us →
                  </button>
                </a>
              </div> */}
            </div>
          </div>
        </div>

        {/* Second Row: 3 Equal Cards - Stack on mobile, row on tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mt-3 sm:mt-4 lg:mt-5">
          {galleryItems.slice(3, 6).map((item) => (
            <div key={item.id} className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#9234eb]/30 group bg-gradient-to-br from-[#1a1a2e] to-[#16213e] h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px]">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Footer CTAs - Better mobile spacing */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-2 sm:px-0">
            <Link href="?enroll=1" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#9234eb] to-[#7b2cbf] text-white font-bold text-sm sm:text-base hover:from-[#8a2edc] hover:to-[#6a1fa8] hover:scale-105 transition-all duration-300 shadow-xl text-center">
              Enroll Now
            </Link>
            <Link href="/courses" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-transparent border-2 border-[#9234eb] text-white font-bold text-sm sm:text-base hover:bg-[#9234eb]/20 hover:scale-105 transition-all duration-300 shadow-lg text-center">
              Explore Our Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}