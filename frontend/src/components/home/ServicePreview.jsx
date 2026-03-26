import { Link } from "react-router-dom";

const services = [
  {
    title: "Profit Pulse Audit",
    description:
      "A focused diagnostic to identify financial leaks, cashflow blind spots, operational inefficiencies, and decision bottlenecks.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-amber-500 to-orange-500",
    features: ["Financial Leaks", "Cashflow Analysis", "Operational Review"]
  },
  {
    title: "FPO Method™ Implementation",
    description:
      "A structured engagement to align finance, people, and operations into a system that supports growth and strategic execution.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    color: "from-indigo-600 to-indigo-800",
    features: ["Systems Alignment", "Strategic Planning", "Team Integration"]
  },
  {
    title: "Executive & Corporate Programs",
    description:
      "Tailored advisory and leadership programs for teams that need stronger systems, execution discipline, and cross-functional alignment.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "from-[#FFD700] to-amber-600",
    features: ["Leadership Development", "Team Alignment", "Strategic Execution"]
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-indigo-900/5 blur-3xl"></div>
        
        {/* Geometric pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-15">
        {/* Header Section */}
        <div className="relative max-w-3xl">
          {/* Decorative line */}
          <div className="absolute -left-4 top-0 h-20 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
          
          <div className="pl-2">
            <div className="inline-flex items-center gap-3 mb-4">
              
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
                Services
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold leading-tight text-black md:text-4xl">
              Advisory Services designed to move businesses{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#FFD700]">from strain to structure</span>
               
              </span>
              .
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-indigo-900/70">
              Every engagement is built around one goal: helping leadership teams
              see clearly, decide better, and operate with stronger systems.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              {/* Icon with gradient background */}
              

              {/* Content */}
              <div className="relative">
                <h3 className="font-serif text-xl font-semibold text-black">
                  {service.title}
                </h3>
                
                <p className="mt-3 text-sm leading-relaxed text-indigo-900/70">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="mt-6 space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFD700]/10">
                        <svg className="h-3 w-3 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-indigo-900/60">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-indigo-100 bg-white/50 p-8 backdrop-blur-sm sm:flex-row">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-black">
              Ready to transform your business?
            </h3>
            <p className="mt-2 text-indigo-900/60">
              Explore all services and find the right fit for your organization.
            </p>
          </div>
          
          <Link
            to="/services"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-8 py-4 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Services
              <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
          </Link>
        </div>

        </div>
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
    </section>
  );
}