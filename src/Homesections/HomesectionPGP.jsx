import { Calendar, GraduationCap, Briefcase, ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

const years = [
  {
    title: "Year 1: Foundation + Core Skills",
    points: [
      "Build strong fundamentals in AI, prompt engineering, and workflows.",
      "Hands-on mini projects to turn concepts into practical skills.",
      "Weekly mentor support to build confidence from day one.",
    ],
  },
  {
    title: "Year 2: Specialization + Real Projects",
    points: [
      "Choose focused tracks based on your goals and strengths.",
      "Work on industry-style projects with portfolios and reviews.",
      "Weekly trips, social impact projects, and fun club activities.",
    ],
  },
  {
    title: "Year 3: Internship + Career Launch",
    points: [
      "Capstone implementation with deployment-ready outcomes.",
      "Annual outstation business tour to top tech cities.",
      "Career guidance to transition confidently into AI-first roles.",
    ],
  },
];

const universities = [
  { name: "DU SOL", full: "University of Delhi – School of Open Learning", badge: "Government", color: "text-[#FF40EB]", bg: "bg-[#FF40EB]/10", border: "border-[#FF40EB]/30" },
  { name: "Jain University", full: "Jain (Deemed-to-be University), Bengaluru", badge: "Private – NAAC A++", color: "text-[#9234eb]", bg: "bg-[#9234eb]/10", border: "border-[#9234eb]/30" },
];

export default function HomesectionPGP() {
  return (
    <section className="bg-black py-16 px-4 sm:px-6" id="degree-programs">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF40EB]/40 bg-[#FF40EB]/10 px-4 py-2 text-sm font-semibold text-[#FF40EB]">
            <GraduationCap className="h-4 w-4" />
            3-Year Degree Programs
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Degree Programs in Artificial Intelligence
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            A full 3-year university degree combining real AI skills, campus life, industry trips, and placement support — from DU SOL or Jain University.
          </p>
        </div>

        {/* Year cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {years.map((year, index) => (
            <article
              key={year.title}
              className="rounded-2xl border border-[#FF40EB]/25 bg-gradient-to-b from-[#FF40EB]/15 to-black p-6 hover:border-[#FF40EB]/60 transition-colors duration-300"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#FF40EB]">Phase {index + 1}</span>
                {index === 0 ? (
                  <GraduationCap className="h-5 w-5 text-[#FF40EB]" />
                ) : (
                  <Briefcase className="h-5 w-5 text-[#FF40EB]" />
                )}
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">{year.title}</h3>

              <ul className="space-y-3">
                {year.points.map((point) => (
                  <li key={point} className="text-gray-300 text-sm leading-relaxed flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FF40EB] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* University chips */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {universities.map((u) => (
            <div key={u.name} className={`flex items-center gap-3 rounded-xl border ${u.border} ${u.bg} px-5 py-3`}>
              <Building2 className={`w-4 h-4 ${u.color}`} />
              <div>
                <p className={`text-sm font-bold ${u.color}`}>{u.name}</p>
                <p className="text-xs text-gray-400">{u.full}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${u.bg} ${u.color} border ${u.border}`}>{u.badge}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/programs/degree-in-ai"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF40EB] px-8 py-3.5 font-bold text-white shadow-[0_0_30px_rgba(255,64,235,0.4)] hover:shadow-[0_0_50px_rgba(255,64,235,0.6)] hover:scale-105 transition"
          >
            Explore Degree Programs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
