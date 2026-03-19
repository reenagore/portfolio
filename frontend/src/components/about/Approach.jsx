import { Link } from "react-router-dom";

export default function AboutApproach() {
  const principles = [
    {
      title: "Financial Discipline",
      description: "Building systems that provide real-time visibility and control over cashflow, costs, and financial decisions.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Operational Clarity",
      description: "Streamlining processes to reduce friction, eliminate bottlenecks, and create scalable execution systems.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Leadership Alignment",
      description: "Ensuring every leader understands their role, accountability, and how their decisions impact business outcomes.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  const fpoElements = [
    {
      name: "Finance",
      color: "from-amber-500 to-orange-500",
      description: "Visibility, discipline, and control",
      icon: "💰"
    },
    {
      name: "People",
      color: "from-indigo-600 to-indigo-800",
      description: "Accountability, alignment, execution",
      icon: "👥"
    },
    {
      name: "Operations",
      color: "from-[#FFD700] to-amber-600",
      description: "Systems, flow, scalability",
      icon: "⚙️"
    }
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 lg:items-start">
          {/* Left Content - Main Text */}
          <div className="relative">
            {/* Decorative line */}
            <div className="absolute -left-4 top-0 h-24 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
            
            <div className="pl-2">
              <div className="inline-flex items-center gap-3 mb-4">
                
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
                  The Way I Works
                </p>
              </div>

              <h2 className="font-serif text-2xl font-bold leading-tight text-black md:text-3xl">
                Clear thinking.{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#FFD700]">Strong systems.</span>
                  <span className="absolute bottom-2 left-0 h-4 w-full bg-[#FFD700]/20 -z-0"></span>
                </span>{' '}
                <br/>
                 Practical execution.
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-relaxed text-indigo-900/80">
                <p>
                  My approach is shaped by one belief: sustainable growth is
                  never built on energy alone. It is built on financial discipline,
                  operational clarity, and leadership alignment. When those three
                  are disconnected, businesses start to feel heavier than they
                  should. Teams slow down, decisions take longer, cashflow becomes
                  harder to read, and leaders begin reacting instead of steering.
                </p>

                <p>
                  That is why my work focuses on helping businesses align finance,
                  people, and operations as one connected system. Instead of solving
                  symptoms in isolation, I helps leadership teams identify the
                  deeper structural issues behind recurring pressure. The result is
                  not just better reporting or cleaner processes. It is greater
                  confidence in how the business is being run.
                </p>

                <div className="rounded-xl border border-indigo-100 bg-white/50 p-6 backdrop-blur-sm">
                  <p className="text-lg font-medium text-black">
                    "This thinking is what shaped the FPO Method™ — a framework that
                    brings finance, people, and operations into strategic alignment."
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  to="/fpo-method"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-8 py-4 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Learn About the FPO Method™
                    <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Image and FPO Cards */}
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

            {/* Reena's Image */}
            <div className="relative mb-8 overflow-hidden rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-indigo-900 to-black shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <img
                src="/assets/6.jpeg"
                alt="Reena Gore - Financial Systems Strategist"
                className="h-[300px] w-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm font-medium uppercase tracking-wider text-[#FFD700]">Reena Gore</p>
                <p className="text-xl font-semibold">Financial Systems Strategist</p>
              </div>
              
              {/* Quote overlay */}
              <div className="absolute top-4 right-4 max-w-[200px] rounded-lg bg-black/50 p-3 backdrop-blur-sm">
                <p className="text-xs text-white/90 italic">
                  "Building systems that scale businesses"
                </p>
              </div>
            </div>

            {/* FPO Cards */}
            <div className="space-y-4">
              {/* FPO Method Header */}
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-[#FFD700]/10 px-4 py-2 text-sm font-medium text-[#FFD700]">
                  The FPO Method™
                </span>
              </div>

              

              {/* Core Principles Cards */}
              <div className="mt-6 grid grid-cols-1 gap-3">
                {principles.map((principle, index) => (
                  <div
                    key={index}
                    className="group relative flex items-start gap-3 rounded-lg border border-indigo-100 bg-white/50 p-4 backdrop-blur-sm transition-all duration-200 hover:border-[#FFD700]"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#FFD700]/10 text-[#FFD700]">
                      {principle.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-black">{principle.title}</p>
                      <p className="text-xs text-indigo-900/60">{principle.description}</p>
                    </div>
                  </div>
                ))}
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