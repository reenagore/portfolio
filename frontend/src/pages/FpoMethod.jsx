import { Link } from "react-router-dom";

const pillars = [
  {
    title: "Finance",
    description:
      "Finance brings visibility, control, and discipline. It helps leaders understand where the business stands, what the numbers are saying, and where action is needed before problems become expensive.",
    points: [
      "Cashflow visibility",
      "Financial discipline",
      "Profitability clarity",
      "Reporting and decision support",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "People",
    description:
      "People determine whether strategy holds or collapses in execution. This pillar focuses on leadership accountability, role clarity, decision ownership, and building a team structure that supports performance.",
    points: [
      "Leadership alignment",
      "Team accountability",
      "Role clarity",
      "Decision ownership",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-indigo-600 to-indigo-800",
  },
  {
    title: "Operations",
    description:
      "Operations turn plans into repeatable results. This pillar addresses process efficiency, workflow discipline, bottlenecks, and the systems required for growth without chaos.",
    points: [
      "Process design",
      "Execution consistency",
      "Bottleneck reduction",
      "Scalable systems",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-[#FFD700] to-amber-600",
  },
];

const outcomes = [
  "Stronger financial visibility and better cashflow discipline",
  "Clearer leadership accountability and team alignment",
  "More efficient processes and less operational friction",
  "Better decisions backed by structure, not guesswork",
  "A business that can grow without constant internal strain",
  "A framework leaders can use to scale with more confidence",
];



export default function FpoMethod() {
  return (
    <div className="bg-white">
      {/* Hero Section with Image */}
      <section className="relative min-h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Business Strategy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#FFD700]/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-900/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-6 lg:py-15">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                The FPO Method™
              </span>
            </div>

            <h1 className=" text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              A framework that aligns{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-amber-400">finance, people, and operations</span>
                <span className="absolute bottom-3 left-0 h-5 w-full -z-0"></span>
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-sm md:text-xl leading-relaxed text-gray-300">
              Move beyond fragmented fixes. Build a stronger operating foundation 
              where every part of your business works together.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-6 py-4 text-lg font-light text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 text-lg font-light text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Exists Section with Image Split */}
      <section className="relative overflow-hidden bg-white py-8 lg:py-15">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div className="relative">
              <div className="absolute -left-4 top-0 h-24 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
              <div className="pl-2">
                <span className="inline-block rounded-full bg-[#FFD700]/10 px-4 py-2 text-sm font-medium text-[#FFD700] mb-6">
                  Why It Exists
                </span>
                
                <h2 className=" text-2xl font-bold leading-tight text-black md:text-3xl lg:text-4xl">
                  Because growth breaks where{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-amber-400">alignment is weak</span>
                   
                  </span>
                </h2>

                <div className="mt-8 space-y-6 text-lg leading-relaxed text-gray-600">
                  <p>
                    Many businesses try to solve performance problems one issue at a time. 
                    They improve reporting but ignore execution. They hire people but do not 
                    fix accountability. They push for growth while operations remain overloaded.
                  </p>
                  <p>
                    The FPO Method™ exists because finance, people, and operations cannot be 
                    treated as separate. When they are misaligned, the business feels heavier 
                    at every level.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute -right-4 -top-4">
                <div className="h-24 w-24 border-r-4 border-t-4 border-[#FFD700]/30"></div>
              </div>
              <div className="absolute -bottom-4 -left-4">
                <div className="h-24 w-24 border-b-4 border-l-4 border-[#FFD700]/30"></div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/assets/5.jpeg"
                  alt="Business Alignment"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section with Images */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white py-8 lg:py-15">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block rounded-full bg-black/10 px-4 py-2 text-sm font-medium text-black mb-6">
              The Three Pillars
            </span>
            
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${pillar.color} opacity-60`}></div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className={`inline-block bg-gradient-to-r ${pillar.color} bg-clip-text text-2xl font-bold text-transparent`}>
                    {pillar.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    {pillar.description}
                  </p>

                  <div className="mt-6 space-y-2">
                    {pillar.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${pillar.color}`}></span>
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative overflow-hidden bg-white py-8 lg:py-15">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block rounded-full bg-[#FFD700]/10 px-4 py-2 text-sm font-medium text-[#FFD700] mb-6">
                How It Works
              </span>
              
              <h2 className="font-serif text-2xl font-bold leading-tight text-black md:text-3xl lg:text-4xl">
                The power is not in the parts alone.{' '}
                <span className="text-amber-400">It is in the alignment.</span>
              </h2>

              <div className="mt-8 space-y-4 text-lg leading-relaxed text-gray-600">
                <p>
                  Finance without operational discipline creates visibility without action. 
                  People without clarity create effort without alignment. Operations without 
                  strong financial thinking create motion without control.
                </p>
                <p>
                  The FPO Method™ works by addressing these areas together, so the business 
                  does not keep solving one problem only to create pressure somewhere else.
                </p>
              </div>
            </div>

            {/* Right Visual - Minimalist Design */}
            <div className="relative">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white rounded-3xl"></div>
              
              <div className="relative p-8">
                {/* Connection Diagram - Minimalist */}
                <div className="flex flex-col items-center space-y-6">
                  
                  {/* Finance - Top */}
                  <div className="w-full max-w-sm">
                    <div className="relative border-b border-indigo-100 pb-4 mb-4">
                      <div className="absolute left-0 top-0 h-8 w-1 bg-amber-400"></div>
                      <p className="pl-4 text-xs font-semibold uppercase tracking-wider text-indigo-900/50">
                        Pillar One
                      </p>
                    </div>
                    <div className="pl-2">
                      <p className="text-2xl font-light text-black">Finance</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="text-xs text-indigo-900/60">Visibility</span>
                        <span className="text-xs text-indigo-900/30">•</span>
                        <span className="text-xs text-indigo-900/60">Control</span>
                        <span className="text-xs text-indigo-900/30">•</span>
                        <span className="text-xs text-indigo-900/60">Discipline</span>
                      </div>
                    </div>
                  </div>

                 
                  {/* People - Middle */}
                  <div className="w-full max-w-sm">
                    <div className="relative border-b border-indigo-100 pb-4 mb-4">
                      <div className="absolute left-0 top-0 h-8 w-1 bg-indigo-400"></div>
                      <p className="pl-4 text-xs font-semibold uppercase tracking-wider text-indigo-900/50">
                        Pillar Two
                      </p>
                    </div>
                    <div className="pl-4">
                      <p className="text-2xl font-light text-black">People</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="text-xs text-indigo-900/60">Accountability</span>
                        <span className="text-xs text-indigo-900/30">•</span>
                        <span className="text-xs text-indigo-900/60">Alignment</span>
                        <span className="text-xs text-indigo-900/30">•</span>
                        <span className="text-xs text-indigo-900/60">Execution</span>
                      </div>
                    </div>
                  </div>

                 

                  {/* Operations - Bottom */}
                  <div className="w-full max-w-sm">
                    <div className="relative border-b border-indigo-100 pb-4 mb-4">
                      <div className="absolute left-0 top-0 h-8 w-1 bg-indigo-400"></div>
                      <p className="pl-4 text-xs font-semibold uppercase tracking-wider text-indigo-900/50">
                        Pillar Three
                      </p>
                    </div>
                    <div className="pl-4">
                      <p className="text-2xl font-light text-black">Operations</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="text-xs text-indigo-900/60">Systems</span>
                        <span className="text-xs text-indigo-900/30">•</span>
                        <span className="text-xs text-indigo-900/60">Flow</span>
                        <span className="text-xs text-indigo-900/30">•</span>
                        <span className="text-xs text-indigo-900/60">Scalability</span>
                      </div>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Section with Image Background */}
      <section className="relative overflow-hidden py-8 lg:py-15">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Success"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/95 to-black/95"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-[#FFD700]/20 px-4 py-2 text-sm font-medium text-[#FFD700] backdrop-blur-sm mb-6">
              Business Outcomes
            </span>
            
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((item, index) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-[#FFD700]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                
                <div className="relative flex items-start gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD700]/20">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-white/90">{item}</p>
                </div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-500 transition-all duration-300 group-hover:w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Business Meeting"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-black/90"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-8 text-center md:px-6 lg:py-15">
          <span className="inline-block rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-black mb-6">
            Work With the Framework
          </span>

          <h2 className=" text-xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
            Ready to apply the FPO Method™
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-l leading-relaxed text-gray-300">
            Whether you need a diagnostic, implementation support, or executive advisory, 
            the next step is to identify where finance, people, and operations are misaligned.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/booking"
              className="group relative overflow-hidden rounded-xl bg-amber-400 px-8 py-4 text-lg font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book a Consultation
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              View All Services
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-sm text-gray-400">Trusted by 50+ businesses</span>
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-400">Proven methodology</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}