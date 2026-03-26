import { Link } from "react-router-dom";

const audience = [
  "SME founders trying to scale without losing grip on the business",
  "CEOs and executives who need stronger financial visibility",
  "Leadership teams dealing with operational bottlenecks and weak accountability",
  "Business owners who want a practical growth framework, not theory",
];

const outcomes = [
  "Understand why growth creates pressure instead of stability",
  "Identify breakdowns across Finance, People, and Operations",
  "Learn how to build better systems for decision-making and execution",
  "Apply the FPO Method™ as a practical growth framework",
];

export default function BookWhySection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-10 lg:py-14">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-indigo-900/5 blur-3xl"></div>
        
        {/* Geometric pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Why This Book Matters Section */}
        <div className="max-w-6xl mx-auto text-center lg:text-left">
        
        
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/10">
              <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
              Why this book matters
            </p>
          </div>

          <h2 className="font-serif text-2xl font-bold leading-tight text-black md:text-3xl lg:text-4xl">
            Most SMEs do not struggle because they lack ambition.{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#FFD700]">They struggle because growth exposes what was never structured.</span>
              
            </span>
          </h2>

          <div className="mt-8 space-y-6 text-lg text-start leading-relaxed text-indigo-900/70">
            <p>
              Revenue can grow while clarity disappears. Teams can get busier
              while accountability weakens. More clients can come in while cash
              becomes tighter. That is the contradiction many SMEs face.
            </p>

            <p>
              <strong className="text-black">Decoding Business for Growth</strong> explains why this
              happens and gives leaders a practical framework for responding to
              it. Instead of treating finance as a separate technical function,
              the book shows how Finance, People, and Operations must work
              together if a business is going to scale well. Built around the FPO Method™, the book is designed to help SME
              leaders move from reactive management to structured performance.
            </p>

           
          </div>
        </div>

        {/* Audience & Outcomes Section */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          {/* Who this book is for */}
          <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                  <svg className="h-6 w-6 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-bold text-black">
                  Who this book is for
                </h2>
              </div>

              <div className="space-y-4">
                {audience.map((item) => (
                  <div key={item} className="flex gap-3 group/item">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD700]/10">
                      <svg className="h-3 w-3 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-base leading-relaxed text-indigo-900/70 group-hover/item:text-indigo-900 transition-colors">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
          </div>

          {/* What readers will gain */}
          <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                  <svg className="h-6 w-6 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-bold text-black">
                  What readers will gain
                </h2>
              </div>

              <div className="space-y-4">
                {outcomes.map((item) => (
                  <div key={item} className="flex gap-3 group/item">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD700]/10">
                      <svg className="h-3 w-3 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-base leading-relaxed text-indigo-900/70 group-hover/item:text-indigo-900 transition-colors">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-indigo-900/50 mb-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FFD700]"></span>
            <span>Ready to transform your business?</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#FFD700]"></span>
          </div>
          <a
            href="#preorder"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-8 py-4 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Pre-order Your Copy
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
          </a>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
    </section>
  );
}