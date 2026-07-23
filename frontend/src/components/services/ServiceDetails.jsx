import { Link } from "react-router-dom";

const serviceDetails = [
  {
    title: "Profit Pulse Audit",
    subtitle: "For leaders who need clarity before making bigger moves.",
    forWho:
      "Ideal for SMEs experiencing growth pressure, cashflow confusion, operational drag, or decision fatigue.",
    includes: [
      "Review of financial visibility and reporting gaps",
      "Assessment of cashflow pressure points and cost leaks",
      "Operational bottleneck diagnosis",
      "Leadership and execution alignment review",
      "Strategic recommendations and next-step priorities",
    ],
    outcome:
      "You leave with a clearer view of what is really slowing the business down, what needs urgent attention, and where stronger systems are required.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "FPO Method™ Implementation",
    subtitle: "For businesses that need more than advice, they need structure.",
    forWho:
      "Best for businesses ready to strengthen the way finance, people, and operations work together.",
    includes: [
      "Application of the FPO Method™ framework",
      "Finance, people, and operations alignment work",
      "Systems and process improvement",
      "Leadership decision-flow strengthening",
      "Practical implementation support",
    ],
    outcome:
      "The business becomes easier to read, easier to manage, and better positioned for disciplined growth instead of reactive survival.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    color: "from-indigo-600 to-indigo-800",
  },
  {
    title: "Executive & Corporate Programs",
    subtitle: "For leadership teams that need sharper alignment and stronger thinking.",
    forWho:
      "Designed for executive teams, institutions, and organizations navigating complexity, change, or performance strain.",
    includes: [
      "Leadership workshops and executive advisory",
      "Strategic planning and execution support",
      "Systems thinking for cross-functional teams",
      "Decision-making and accountability reinforcement",
      "Tailored program delivery based on organizational context",
    ],
    outcome:
      "Teams gain clearer strategic direction, better leadership cohesion, and stronger execution rhythm across the organization.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "from-[#FFD700] to-amber-600",
  },
];

export default function ServicesDetails() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-8 lg:py-15">
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
        {/* Section Header */}
        <div className="relative max-w-3xl mb-16">
          <div className="absolute -left-4 top-0 h-20 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
          <div className="pl-6">
            <span className="inline-block rounded-full bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-400 mb-4">
              What I Do
            </span>
            
          </div>
        </div>

        {/* Service Cards */}
        <div className="space-y-8 lg:space-y-12">
          {serviceDetails.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-3xl border border-indigo-100 bg-white/80 p-6 backdrop-blur-sm transition-all duration-500 hover:border-[#FFD700] hover:shadow-2xl hover:shadow-[#FFD700]/10 md:p-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-8"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              
              {/* Left Column - Main Content */}
              <div className="relative space-y-6">
                {/* Title with Icon */}
                <div className="flex items-start gap-4">
                  
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900/50">
                      {service.title}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-black md:text-3xl">
                      {service.subtitle}
                    </h3>
                  </div>
                </div>

                {/* For Who Section */}
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-5">
                  <p className="text-sm font-semibold text-indigo-900/60 mb-2">Ideal for:</p>
                  <p className="text-base leading-relaxed text-indigo-900/80">
                    {service.forWho}
                  </p>
                </div>

                {/* Outcome Section */}
                <div className="relative overflow-hidden rounded-xl border border-indigo-100 bg-white p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <p className="text-sm font-semibold text-amber-400 mb-2">Outcome:</p>
                  <p className="text-base leading-relaxed text-indigo-900/80">
                    {service.outcome}
                  </p>
                </div>
              </div>

              {/* Right Column - Includes */}
              <div className="relative mt-6 lg:mt-0">
                <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-inner">
                  <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-indigo-900/60">
                    <span className="h-4 w-1 bg-[#FFD700]"></span>
                    What this includes
                  </p>

                  <div className="mt-6 space-y-4">
                    {service.includes.map((item, idx) => (
                      <div key={idx} className="flex gap-3 group/item">
                        <div className="relative mt-1.5">
                          <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${service.color} opacity-80 group-hover/item:scale-110 transition-transform`}></div>
                          <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${service.color} opacity-20 blur-sm`}></div>
                        </div>
                        <p className="flex-1 text-sm leading-relaxed text-indigo-900/70 group-hover/item:text-indigo-900 transition-colors">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Decorative element */}
                  <div className="mt-6 flex justify-end">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#FFD700]/10 to-indigo-900/10 flex items-center justify-center">
                      <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom gradient line on hover */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-500 group-hover:w-full"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-900/40 mb-4">
            Not sure which service is right for you?
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-xl border border-indigo-200 bg-white px-8 py-4 text-sm font-medium text-indigo-900 transition-all duration-300 hover:border-[#FFD700] hover:text-[#FFD700] hover:shadow-lg hover:shadow-[#FFD700]/10"
          >
            Let's discuss your needs
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
    </section>
  );
}
