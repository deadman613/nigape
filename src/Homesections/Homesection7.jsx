'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is NIGAPE?",
      answer: "NIGAPE is an India-first institute dedicated to Generative AI and Prompt Engineering with project-first training for students, graduates, and professionals."
    },
    {
      question: "Who can join NIGAPE courses?",
      answer: "Anyone from Class 12 students to working professionals and career switchers can join. We provide beginner and advanced tracks, with coding support where needed."
    },
    {
      question: "What makes NIGAPE different from other AI institutes?",
      answer: "Our curriculum is focused on real Prompt Engineering workflows, GenAI tools, sprint projects, and career mentoring instead of only theoretical lectures."
    },
    {
      question: "Do I need coding experience to start?",
      answer: "No. We have beginner-friendly pathways and guided labs for non-coders, plus advanced tracks for technical learners."
    },
    {
      question: "What kind of projects will I build?",
      answer: "You will build GenAI assistants, prompt libraries, automation workflows, chatbots, and domain projects relevant to real business use-cases."
    },
    {
      question: "Will I get placement support after the course?",
      answer: "Yes. We provide resume refinement, mock interviews, project reviews, and role guidance for opportunities across India and remote teams."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="bg-black py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto border-t border-gray-800/40 pt-8">
        {/* Header */}
        <div className="text-center mb-4 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about our institute
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 ">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#FF40EB] animate-slide-up hover:bg-gradient-to-l from-[#FF40EB] to-black/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between bg-black hover:bg-gradient-to-l from-[#FF40EB] to-black/30 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-[#FF40EB]' : 'text-gray-400'
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 py-5 bg-gray-900/50 border-t border-gray-800">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">Still have questions?</p>
          <Link href="?enroll=1" className="inline-block px-8 py-3 bg-[#FF40EB] text-white font-semibold rounded-lg hover:bg-[#ff2de6] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#FF40EB]/50">
            Enroll Now
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  );
}
