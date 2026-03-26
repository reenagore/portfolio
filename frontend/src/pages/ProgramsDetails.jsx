import { Link, useParams } from "react-router-dom";
import { programs } from "../data/programs";
import { useEffect, useState } from "react";
import ProgramRegistrationForm from "../components/programs/ProgramRegistrationForm";

export default function ProgramDetails() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  const { slug } = useParams();
  const program = programs.find((item) => item.slug === slug);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!program) {
    return (
      <section className="relative min-h-[60vh] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Program Not Found"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center md:px-6">
          <div className="rounded-3xl border border-indigo-100 bg-white/80 p-10 backdrop-blur-sm shadow-lg">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-10 w-10 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <h1 className="font-serif text-3xl font-bold text-black">
              Program not found
            </h1>
            <p className="mt-4 text-indigo-900/70">
              The program you are looking for could not be found.
            </p>
            <Link
              to="/programs"
              className="group relative mt-6 inline-flex overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Back to Programs
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white">
      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
            <button
              onClick={() => setShowRegistrationModal(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-500 hover:text-gray-700 transition-colors shadow-md"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ProgramRegistrationForm program={program} onSuccess={() => setShowRegistrationModal(false)} />
          </div>
        </div>
      )}

      {/* Centered Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-white">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
          <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-indigo-900/5 blur-3xl"></div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-10 text-center md:px-6 lg:py-15">
          {/* Decorative line above */}
          <div className="flex justify-center mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </div>

          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/10 px-4 py-2 text-sm font-medium text-[#FFD700]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {program.category === "Virtual Programs" ? "Virtual Program" : "Speaker Program"}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl font-bold leading-tight text-black md:text-3xl lg:text-5xl">
              {program.title}
            </h1>

            {/* Description */}
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-indigo-900/70">
              {program.shortDescription}
            </p>

            {/* Register Button */}
            <div className="pt-4">
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#FFD700] px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Register for this Program
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </button>
            </div>
          </div>

          {/* Decorative line below */}
          <div className="flex justify-center mt-8">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Program Overview Section - Reduced spacing */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left Column */}
            <div>
              <div className="relative mb-6">
                <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
                <div className="pl-6">
                  <h2 className="font-serif text-2xl font-bold text-black">
                    Program Overview
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-indigo-100 bg-white/50 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFD700]/10">
                      <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-black">The Problem</h3>
                  </div>
                  <p className="text-base leading-relaxed text-indigo-900/70">
                    {program.problem}
                  </p>
                </div>

                <div className="rounded-xl border border-indigo-100 bg-white/50 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFD700]/10">
                      <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-black">The Promise</h3>
                  </div>
                  <p className="text-base leading-relaxed text-indigo-900/70">
                    {program.promise}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="relative mb-6">
                <div className="absolute -right-4 top-0">
                  <div className="h-8 w-8 border-r-4 border-t-4 border-[#FFD700]/30"></div>
                </div>
              </div>
              
              <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFD700]/10">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-black">
                    Quick Details
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="rounded-lg border border-indigo-100 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Format</p>
                    <p className="mt-1 text-sm font-light text-gray-500">{program.format}</p>
                  </div>

                  <div className="rounded-lg border border-indigo-100 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Audience</p>
                    <p className="mt-1 text-sm font-light text-gray-500">{program.audience}</p>
                  </div>

                  <div className="rounded-lg border border-indigo-100 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Group Size</p>
                    <p className="mt-1 text-sm font-light text-sans">{program.groupSize}</p>
                  </div>

                  <div className="rounded-lg border border-indigo-100 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Delivery</p>
                    <p className="mt-1 text-sm font-light text-gray-500">{program.delivery}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learnings & Takeaways Section - Reduced spacing */}
      <section className="bg-gradient-to-br from-indigo-50/30 to-white py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Learnings */}
            <div>
              <div className="relative mb-6">
                <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
                <div className="pl-6">
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-xl font-bold text-black">
                      What participants will learn
                    </h2>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {program.learnings.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 rounded-lg p-2 transition-all hover:bg-white/50"
                  >
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD700]/10">
                      <svg className="h-2.5 w-2.5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-sm leading-relaxed text-indigo-900/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Takeaways */}
            <div>
              <div className="relative mb-6">
                <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
                <div className="pl-6">
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-xl font-bold text-black">
                      Participant takeaways
                    </h2>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {program.takeaways.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 rounded-lg p-2 transition-all hover:bg-white/50"
                  >
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD700]/10">
                      <svg className="h-2.5 w-2.5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-sm leading-relaxed text-indigo-900/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Reduced spacing */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-black py-5">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>

        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <span className="inline-block rounded-full bg-[#FFD700]/20 px-4 py-1.5 text-xs font-medium text-[#FFD700] backdrop-blur-sm mb-4">
            Ideal For
          </span>
          
          <h2 className="font-san-serif text-xl font-semibold leading-tight text-white md:text-3xl lg:text-4xl">
            {program.idealFor}
          </h2>
          
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-3 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Register for This Program
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
            </button>
          </div>

          {/* Trust Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="text-xs text-indigo-300">Trusted by 50+ organizations</span>
          </div>
        </div>
      </section>
    </div>
  );
}