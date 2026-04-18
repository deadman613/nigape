import Link from 'next/link';

export default function HomeSection2() {
  const benefits = [
    {
      keyword: 'Skills',
      description:
        'Master Generative AI, Prompt Engineering, LLM workflows, automation, and deployment through structured, mentor-led projects.',
    },
    {
      keyword: 'Confidence',
      description:
        'Build confidence by solving real business use-cases from startups, agencies, and operations teams.',
    },
    {
      keyword: 'Exposure',
      description:
        'Work in sprint-based cohorts, get feedback from industry mentors, and build a portfolio that demonstrates practical prompt engineering outcomes.',
    },
    {
      keyword: 'Clarity & Readiness',
      description:
        'Get career counseling, resume feedback, and interview prep tailored for AI roles hiring across India and remote teams.',
    },
  ];

  return (
    <section className="bg-black text-white py-10 sm:py-28 lg:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-[#FF40EB] to-[#9234eb] bg-clip-text text-transparent">
            What You Will Gain
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            At NIGAPE, you move beyond theory and graduate with measurable outcomes:
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 mb-16">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col border-l-4 border-[#FF40EB] pl-6 transition-all duration-300 hover:border-pink-700"
            >
              <h3 className="text-2xl md:text-3xl font-black mb-3 text-[#FF40EB] group-hover:text-pink-700 transition-colors">
                {item.keyword}
              </h3>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-gray-400 italic text-lg mb-8">
            Ready to start with India's dedicated GenAI and Prompt Engineering institute?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="?enroll=1" passHref>
              <button className="px-8 py-4 bg-[#FF40EB] hover:bg-pink-600 text-white font-bold rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-[#FF40EB]/30 hover:shadow-xl transform hover:-translate-y-0.5">
                Enroll Now
              </button>
            </Link>
            <Link href="/courses" passHref>
              <button className="px-8 py-4 border-2 border-[#FF40EB] text-white hover:bg-[#FF40EB]/10 font-bold rounded-full text-lg transition-all duration-300 shadow-lg transform hover:-translate-y-0.5">
                Explore Courses
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}