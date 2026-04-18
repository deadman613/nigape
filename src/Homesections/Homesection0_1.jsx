'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AboutUsSection() {
  return (
    <section className="relative bg-black py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Hero Text - Large and Bold */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">1st</span>
            <div className="h-px bg-gray-700 flex-grow max-w-[100px]"></div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8">
            NIGAPE <span className="inline-block align-middle w-16 h-16 md:w-20 md:h-20 bg-gray-700 rounded-lg"></span> is<br />
            <span className="inline-block align-middle w-16 h-16 md:w-20 md:h-20 bg-gray-700 rounded-lg"></span> Known for<br />
            <span className="text-[#FF40EB]">Industry-Ready AI Training</span>
          </h1>
          <p className="text-sm text-gray-400 max-w-xs ml-auto">
            Campus + live online cohorts<br />
            <span className="text-gray-200 font-medium">India-first GenAI & Prompt Engineering institute</span><br />
            Career-focused programs built with<br />
            practical projects and mentor feedback
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div>
            <div className="text-6xl md:text-7xl font-bold text-white mb-2">1M+</div>
            <div className="text-gray-400 text-sm">AI Roles Opening Across India</div>
          </div>
          <div>
            <div className="text-6xl md:text-7xl font-bold text-white mb-2">1200+</div>
            <div className="text-gray-400 text-sm">Learners Trained Across India</div>
          </div>
          <div>
            <div className="text-6xl md:text-7xl font-bold text-white mb-2">92%</div>
            <div className="text-gray-400 text-sm">Interview Conversion Support</div>
          </div>
          <div>
            <div className="text-6xl md:text-7xl font-bold text-white mb-2">400+</div>
            <div className="text-gray-400 text-sm">Portfolio Projects Reviewed</div>
          </div>
        </div>

        {/* Three Large Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Mission */}
          <div className="relative group overflow-hidden rounded-3xl aspect-[4/5] bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <img 
              src="/Nigapepic/4.webp" 
              alt="AI Training"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-sm text-gray-200 mb-4">
                Build India&apos;s strongest AI talent pipeline through practical GenAI training
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">→</span>
                  <span>Prompt engineering-first curriculum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">→</span>
                  <span>Real-world projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">→</span>
                  <span>Expert mentorship</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2 - Learning Method */}
          <div className="relative group overflow-hidden rounded-3xl aspect-[4/5] bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <img 
              src="/Nigapepic/5.webp" 
              alt="Corporate Learning"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Corporate-Style Learning</h3>
              <p className="text-sm text-gray-200 mb-4">
                Learn AI exactly how modern product and automation teams work
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400">→</span>
                  <span>Professional lab setups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400">→</span>
                  <span>Sprint-based learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400">→</span>
                  <span>Team collaboration</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3 - Career Outcomes */}
          <div className="relative group overflow-hidden rounded-3xl aspect-[4/5] bg-gradient-to-br from-purple-900/30 to-pink-900/30">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <img 
              src="/Nigapepic/6.webp" 
              alt="Career Success"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Career Outcomes</h3>
              <p className="text-sm text-gray-200 mb-4">
                Placement-focused support from experienced mentors
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400">→</span>
                  <span>Portfolio development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400">→</span>
                  <span>Interview coaching</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400">→</span>
                  <span>Industry networking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          {/* <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h3> */}
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Start your GenAI and Prompt Engineering journey with India&apos;s dedicated institute
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="?enroll=1" className="bg-[#FF40EB] text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 text-center">
              Enroll Now
            </Link>
            <Link href="/courses" className="border-2 border-[#FF40EB] text-white hover:bg-[#FF40EB] hover:text-black font-semibold px-10 py-4 rounded-full transition-all duration-300 text-center">
              Explore Our Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}