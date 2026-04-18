import { Award, BookOpen, Briefcase, Globe, ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

const phases = [
  {
    title: "Year 1: Core PG Foundations",
    points: [
      "Advanced ML, Deep Learning, NLP & Computer Vision.",
      "Bi-weekly industry visits to Delhi NCR tech companies.",
      "Research methodology and first semester AI project.",
    ],
  },
  {
    title: "Year 2: Specialisation & Launch",
    points: [
      "Choose from 5 deep-dives: GenAI, NLP, CV, AI for Business, or AI Ethics.",
      "Annual international business study tour (Singapore / Dubai / London).",
      "8-month internship or startup build + thesis / capstone.",
    ],
  },
];

const universities = [
  { name: "DU SOL", full: "University of Delhi – School of Open Learning", badge: "Government", color: "text-[#9234eb]", bg: "bg-[#9234eb]/10", border: "border-[#9234eb]/30" },
  { name: "Manipal University", full: "Manipal Academy of Higher Education (MAHE)", badge: "Private – NAAC A++", color: "text-[#FF40EB]", bg: "bg-[#FF40EB]/10", border: "border-[#FF40EB]/30" },
];

export default function HomesectionPG() {
  return (
    <section className="bg-black py-16 px-4 sm:px-6" id="pg-programs">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#9234eb]/40 bg-[#9234eb]/10 px-4 py-2 text-sm font-semibold text-[#9234eb]">
            <Award className="h-4 w-4" />
            2-Year Post Graduation Programs
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Post Graduation Program in Artificial Intelligence
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            A research and industry-integrated 2-year PG in AI with international exposure, deep specialisations, and elite placement outcomes — from DU SOL or Manipal University.
          </p>
        </div>

        {/* Phase cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {phases.map((phase, index) => (
            <article
              key={phase.title}
              className="rounded-2xl border border-[#9234eb]/25 bg-gradient-to-b from-[#9234eb]/15 to-black p-6 hover:border-[#9234eb]/60 transition-colors duration-300"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#9234eb]">Year {index + 1}</span>
                {index === 0 ? (
                  <BookOpen className="h-5 w-5 text-[#9234eb]" />
                ) : (
                  <Globe className="h-5 w-5 text-[#9234eb]" />
                )}
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">{phase.title}</h3>

              <ul className="space-y-3">
                {phase.points.map((point) => (
                  <li key={point} className="text-gray-300 text-sm leading-relaxed flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#9234eb] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Highlight: International Tour */}
        <div className="rounded-2xl border border-[#9234eb]/30 bg-gradient-to-r from-[#9234eb]/10 to-[#FF40EB]/10 p-6 mb-10 flex flex-col sm:flex-row items-center gap-5">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Annual International Business Study Tour</h3>
            <p className="text-gray-300 text-sm">Every PG student goes on a 7-day international tour — Singapore, Dubai, or London. Visit AI labs, network with global professionals, and explore career opportunities. Included in program fee.</p>
          </div>
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
            href="/programs/pg-in-ai"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#9234eb] to-[#FF40EB] px-8 py-3.5 font-bold text-white shadow-[0_0_30px_rgba(146,52,235,0.4)] hover:shadow-[0_0_50px_rgba(146,52,235,0.6)] hover:scale-105 transition"
          >
            Explore PG Programs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
