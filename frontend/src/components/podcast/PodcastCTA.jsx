import { Link } from "react-router-dom";

export default function PodcastCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-black">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Geometric pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>
        
        {/* Sound wave pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10v40M10 20v20M50 20v20M20 5v50M40 5v50' stroke='%23ffffff' stroke-width='0.5' fill='none' stroke-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>

      {/* Decorative glow elements */}
      <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#FFD700]/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-900/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-15">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Decorative line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFD700]"></div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                Continue the conversation
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFD700]"></div>
            </div>

            <h2 className="font-serif text-2xl font-bold leading-tight text-white md:text-3xl lg:text-3xl xl:text-3xl">
              If these conversations reflect the challenges in your business,{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#FFD700]">the next step is strategy</span>
                <span className="absolute bottom-2 left-0 h-4 w-full bg-[#FFD700]/20 blur-md -z-0"></span>
              </span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-indigo-200 md:text-lg">
              Move beyond listening and get direct advisory support on the systems,
              leadership, and financial structure your business needs.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/booking"
                className="group inline-flex items-center justify-center rounded-xl bg-[#FFD700] px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20 md:px-8 md:py-4"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book a Consultation
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </Link>

              <Link
                to="/services"
                className="group inline-flex items-center justify-center rounded-xl border border-indigo-400/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:bg-white/20 hover:shadow-lg hover:shadow-[#FFD700]/10 md:px-8 md:py-4"
              >
                Explore Services
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            
          </div>

          {/* Right Content - Reena's Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Decorative elements around image */}
            <div className="absolute -left-4 -top-4">
              <div className="h-16 w-16 border-l-4 border-t-4 border-[#FFD700]/30 md:h-20 md:w-20"></div>
            </div>
            <div className="absolute -bottom-4 -right-4">
              <div className="h-16 w-16 border-b-4 border-r-4 border-[#FFD700]/30 md:h-20 md:w-20"></div>
            </div>

            {/* Image Container */}
            <div className="relative z-10 overflow-hidden rounded-2xl border-2 border-[#FFD700]/20 shadow-2xl w-full h-64 md:h-80 lg:w-136 lg:h-96">
              <img
                src="/assets/13.png"
                alt="Reena Gore - Financial Systems Strategist"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent"></div>
              
              {/* Image caption - visible on larger screens */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                <p className="text-sm font-medium text-[#FFD700]">Reena Gore</p>
                <p className="text-xs text-white/80">Unleash and Thrive Podcast</p>
              </div>
            </div>

            {/* Floating podcast indicator */}
            <div className="absolute -right-2 -top-2 md:-right-4 md:-top-4">
              <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#FFD700] shadow-lg shadow-[#FFD700]/30">
                <svg className="h-5 w-5 md:h-7 md:w-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-12 flex justify-start lg:mt-16">
          <div className="h-1 w-40 bg-gradient-to-r from-[#FFD700] to-transparent"></div>
        </div>
      </div>
    </section>
  );
}