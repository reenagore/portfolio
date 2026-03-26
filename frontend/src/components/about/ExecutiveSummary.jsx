export default function AboutExecutiveSummary() {
    const achievements = [
      {
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        value: "$40M+",
        label: "Growth Impact",
        description: "Business growth supported through stronger systems and controls"
      },
      {
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        value: "100+",
        label: "Projects",
        description: "Successful financial and operational transformations"
      },
      {
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
        value: "50+",
        label: "CEOs Supported",
        description: "Leadership teams guided through strategic advisory"
      },
      {
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ),
        value: "SAP FI",
        label: "Systems Expertise",
        description: "Deep expertise in financial systems and structured reporting"
      }
    ];
  
    const industries = [
      "Manufacturing", "Plastics", "Textiles", "Printing", "SME Growth"
    ];
  
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white">
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
  
        <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
            {/* Left Content - Text Section */}
            <div className="relative">
              {/* Decorative line */}
              <div className="absolute -left-4 top-0 h-24 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
              
              <div className="pl-2">
                <div className="inline-flex items-center gap-3 mb-4">
                  
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
                    Executive Summary
                  </p>
                </div>
  
                <h2 className="font-serif text-2xl font-bold leading-tight text-black md:text-3xl">
                  A career built at the intersection of{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#FFD700]">finance, operations, and business execution</span>
                    <span className="absolute bottom-2 left-0 h-4 w-full"></span>
                  </span>
                  
                </h2>
  
                <div className="mt-8 space-y-6 text-base leading-relaxed text-indigo-900/80">
                  <p>
                    My work is rooted in a simple reality: businesses do not
                    struggle only because they lack ambition. They struggle because
                    growth without structure creates confusion, slow decisions, weak
                    accountability, and poor financial visibility. Over the years, I
                    have worked closely with leadership teams facing exactly these
                    pressures and helped them build clearer systems that support
                    better performance.
                  </p>
  
                  <p>
                    My background spans finance and operations leadership across
                    sectors such as manufacturing, plastics, textiles, and printing.
                    That depth matters because these are environments where
                    complexity is real, margins can be tight, execution errors are
                    costly, and leadership cannot afford to operate on guesswork.
                    My strength has been in helping businesses create control
                    without creating paralysis.
                  </p>
  
                  <p>
                  Beyond my professional work, I am a <span className="font-bold">Rotarian</span> with the <span className="font-bold">Rotary Club of Nairobi South</span> and an active member of <span className="font-bold">BNI Nairobi Pearl Charter</span>. These networks reflect my commitment to leadership, service, and building meaningful business relationships that extend beyond the boardroom.
                  </p>
                </div>
  
                {/* Industries Badges */}
                <div className="mt-8">
                  <p className="text-sm font-medium text-indigo-900/60 mb-3">Industries Served:</p>
                  <div className="flex flex-wrap gap-2">
                    {industries.map((industry) => (
                      <span
                        key={industry}
                        className="rounded-full border border-indigo-200 bg-white/50 px-4 py-2 text-xs font-medium text-indigo-900 backdrop-blur-sm"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
  
            {/* Right Content - Image and Cards */}
            <div className="relative">
              {/* Decorative corner elements */}
              <div className="absolute -right-4 -top-4">
                <div className="relative h-20 w-20">
                  <div className="absolute right-0 top-0 h-12 w-12 border-r-4 border-t-4 border-[#FFD700]/30"></div>
                </div>
              </div>
  
              {/* Professional Image */}
              <div className="relative mb-8 overflow-hidden rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-indigo-900 to-black shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <img
                  src="/assets/7.jpeg"
                  alt="Reena Gore - Executive Advisor"
                  className="h-[350px] w-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm font-medium uppercase tracking-wider text-[#FFD700]">Reena Gore</p>
                  <p className="text-xl font-semibold">Strategy Meeting</p>
                </div>
              </div>
  
              {/* Achievement Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl border border-indigo-100 bg-white/80 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:shadow-lg hover:shadow-[#FFD700]/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    
                    <div className="relative">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                        <span className="text-[#FFD700]">{achievement.icon}</span>
                      </div>
                      
                      <p className="md:text-xl text-lg font-bold text-[#FFD700]">{achievement.value}</p>
                      <p className="mt-1 text-sm font-semibold text-black">{achievement.label}</p>
                      <p className="mt-1 text-xs text-indigo-900/60 line-clamp-2">
                        {achievement.description}
                      </p>
                    </div>
  
                    {/* Bottom gradient line */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
                  </div>
                ))}
              </div>
  
              
            </div>
          </div>
        </div>
  
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
      </section>
    );
  }