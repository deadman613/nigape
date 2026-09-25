import React from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase, TrendingUp, Clock, Users } from 'lucide-react';

// Ensure Geist is loaded globally or via next/font
// Example in _app.tsx: import { Geist } from 'next/font/google';

export default function NigapePlacements() {
  const metrics = [
    {
      icon: TrendingUp,
      stat: "95%+",
      title: "Career Outcomes",
      desc: "Learners report new roles, promotions, or AI career transitions."
    },
    {
      icon: Briefcase,
      stat: "Industry-Ready",
      title: "AI Portfolios",
      desc: "GenAI, NLP, Computer Vision & LLM-based capstone projects."
    },
    {
      icon: Clock,
      stat: "30–90 Days",
      title: "to Interviews",
      desc: "Typical timeline after portfolio completion."
    },
    {
      icon: Users,
      stat: "Mentor-Led",
      title: "Career Support",
      desc: "Resume reviews, mock interviews & role clarity."
    }
  ];

  const companies = [
    { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Amazon", logo: "/logos/amazon.jpg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Meta", logo: "/logos/meta.png" },
    { name: "Apple", logo: "/logos/apple.png" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Adobe", logo: "/logos/adobe.png" },
    { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
    { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
    { name: "SAP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" },
    { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg" }
  ];

  const careerStats = [
    { label: "Career Transitions", value: "95%", desc: "AI learners report new roles or promotions" },
    { label: "AI Skills Gap", value: "1M+", desc: "Skilled AI professionals needed in India" },
    { label: "GenAI Surge", value: "3.6M", desc: "Learners already upskilling in AI" }
  ];

  return (
    <div className="min-h-screen bg-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-[1350px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
          
          {/* LEFT SIDE - Content & Outcomes */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div className="inline-block">
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#9234eb]/20 to-[#9234eb]/10 border border-[#9234eb]/40">
                Placements & Career Outcomes
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              See Where Our Learners Are Building Their{' '}
              <span className="text-[#FF40EB]">AI Careers</span>
            </h2>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
              We focus on outcomes — not just course completion. With corporate-style AI training, real-world GenAI projects, and mentorship, our learners convert skills into real opportunities.
            </p>

            {/* Metrics Cards */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="group relative bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF40EB]/30 hover:border-[#FF40EB]/70 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-[#FF40EB]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <metric.icon className="w-6 h-6 text-[#FF40EB]" />
                    </div>
                    
                    <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                      {metric.stat}
                    </div>
                    
                    <div className="text-[#FF40EB] font-semibold mb-2">
                      {metric.title}
                    </div>
                    
                    <p className="text-white/70 text-sm leading-relaxed">
                      {metric.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col h-auto w-auto sm:flex-row gap-4 pt-2">
              <Link href="?enroll=1" className="group relative px-4 sm:px-8 py-1 sm:py-4 rounded-xl bg-gradient-to-r from-[#FF40EB] to-[#a045eb] text-white font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] text-center">
                <span className="flex items-center justify-center text-l gap-2">
                  Enroll Now
                  <ArrowRight className="w-5 h-auto group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link href="/courses" className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-transparent border-2 border-[#FF40EB] text-white font-semibold text-base sm:text-lg hover:bg-[#9234eb]/10 transition-all duration-300 text-center">
                Explore Our Courses
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - Company Logos */}
          <div className="relative">
            <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#FF40EB]/40">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  WHERE OUR LEARNERS WORK
                </h2>
                <p className="text-white/80 mb-4">
                  Alumni are building AI careers at leading tech companies
                </p>
                <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#FF40EB]/10 border border-[#FF40EB]/30">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    ✓ Verified placements | 2024–25
                  </span>
                </div>
              </div>

              {/* Career Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {careerStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-[#FF40EB]/30 text-center"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-[#FF40EB] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-white/70 text-xs leading-tight">
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Company Logos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {companies.map((company, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-[#FF40EB]/30 hover:border-[#FF40EB]/70 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  >
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="w-full h-auto max-h-12 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    {/* Glow effect on hover */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl bg-[#FF40EB]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}