import { Link } from "react-router-dom";

export default function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -right-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute -left-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-indigo-900/5 blur-3xl"></div>
        
        {/* Geometric pattern - fixed SVG string */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left Content - About Text */}
          <div className="relative">
            {/* Decorative line */}
            <div className="absolute -left-4 top-0 h-32 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
            
            <div className="pl-2">
              <div className="inline-flex items-center gap-3 mb-4">
                
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
                  About Reena Gore
                </p>
              </div>

              <h2 className="font-serif text-2xl font-bold leading-tight text-black md:text-4xl">
                Strategic finance leadership{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#FFD700]">rooted in execution</span>
                  
                </span>
                , not theory.
              </h2>

              <div className="mt-8 space-y-6 text-indigo-900/70">
                <p className="text-lg leading-relaxed">
                  I bring more than two decades of experience across
                  finance, operations, and executive advisory. My work has supported
                  businesses in manufacturing, plastics, textiles, and printing,
                  helping leaders move from reactive management to structured growth.
                </p>

                <p className="text-lg leading-relaxed">
                  I have worked with leadership teams navigating scale, complexity,
                  and operational strain, bringing together financial discipline,
                  systems thinking, and execution alignment through the{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 font-semibold text-[#FFD700]">FPO Method™</span>
                    <span className="absolute bottom-0 left-0 h-2 w-full bg-[#FFD700]/20 -z-0"></span>
                  </span>
                  .
                </p>
              </div>

              <div className="mt-10">
                <Link
                  to="/about"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-indigo-200 bg-white/80 px-6 py-4 text-sm font-medium text-indigo-900 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:text-[#FFD700] hover:shadow-lg hover:shadow-[#FFD700]/10"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Learn More About Reena
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Grid */}
          <div className="relative">
            {/* Decorative corner elements */}
            <div className="absolute -right-4 -top-4">
              <div className="relative h-20 w-20">
                <div className="absolute right-0 top-0 h-12 w-12 border-r-4 border-t-4 border-[#FFD700]/30"></div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4">
              <div className="relative h-20 w-20">
                <div className="absolute bottom-0 left-0 h-12 w-12 border-b-4 border-l-4 border-[#FFD700]/30"></div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Years of Experience */}
              <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-4 flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-[#FFD700]">20+</p>
                  <p className="mt-2 text-sm leading-6 text-indigo-900/70">
                    Years of experience in finance and operations leadership
                  </p>
                </div>
                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
              </div>

              {/* SAP FI */}
              <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-4 flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-[#FFD700]">SAP FI</p>
                  <p className="mt-2 text-sm leading-6 text-indigo-900/70">
                    Deep expertise in financial systems and structured reporting
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
              </div>

              {/* CEOs Supported */}
              <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-4 flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-[#FFD700]">50+</p>
                  <p className="mt-2 text-sm leading-6 text-indigo-900/70">
                    CEOs and leadership teams engaged through strategic work
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
              </div>

              {/* Growth Impact */}
              <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-4 flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-[#FFD700]">$40M+</p>
                  <p className="mt-2 text-sm leading-6 text-indigo-900/70">
                    Growth journeys supported through stronger systems and controls
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
    </section>
  );
}