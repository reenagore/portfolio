const steps = [
    {
      step: "01",
      title: "Discovery",
      description:
        "We begin by understanding the business context, leadership pain points, and the real issues affecting visibility, flow, and performance.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "Diagnosis",
      description:
        "The business is examined through a systems lens to identify what is creating friction across finance, people, and operations.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Strategy",
      description:
        "A structured path is designed based on the level of intervention needed, from diagnostic insight to implementation support.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      step: "04",
      title: "Execution Support",
      description:
        "Where needed, support extends into implementation, leadership guidance, and practical alignment work to ensure change is not theoretical.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];
  
  export default function ServicesProcess() {
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
              <span className="inline-block rounded-full bg-[#FFD700]/10 px-4 py-2 text-sm font-medium text-[#FFD700] mb-4">
                How the work happens
              </span>
              
            
  
              <p className="mt-6 text-lg leading-relaxed text-indigo-900/80">
                My work is designed to move from insight to action. That means
                understanding the business honestly, identifying the real cause of
                pressure, and building a practical path forward.
              </p>
            </div>
          </div>
  
          {/* Process Steps */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                <div className="relative">
                  {/* Step Number with Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                      <span className="text-[#FFD700]">{item.icon}</span>
                    </div>
                    <span className="text-4xl font-bold text-indigo-900/10 group-hover:text-[#FFD700]/20 transition-colors duration-300">
                      {item.step}
                    </span>
                  </div>
  
                  {/* Content */}
                  <h3 className="font-serif text-xl font-semibold text-black">
                    {item.title}
                  </h3>
                  
                  <p className="mt-3 text-sm leading-relaxed text-indigo-900/70">
                    {item.description}
                  </p>
  
                  {/* Connection Line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="h-6 w-6 text-indigo-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
  
                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
              </div>
            ))}
          </div>
  
          {/* Process Flow Visualization */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-4 p-6 rounded-2xl border border-indigo-100 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              
              <span className="text-sm text-indigo-900/60">Discovery → Diagnosis → Strategy → Execution</span>
            </div>
            <div className="h-4 w-px bg-indigo-200"></div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-indigo-900/60">4-8 week typical engagement</span>
            </div>
          </div>
  
          {/* Trust Message */}
          <div className="mt-10 text-center">
            <p className="text-sm text-indigo-900/40">
              Every engagement is tailored to your business context and leadership needs
            </p>
          </div>
        </div>
  
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
      </section>
    );
  }