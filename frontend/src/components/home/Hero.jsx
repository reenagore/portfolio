import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-white">
      {/* Background Elements - Responsive sizing */}
      <div className="absolute inset-0 -z-10">
        {/* Decorative blobs - smaller on mobile, larger on desktop */}
        <div className="absolute -left-24 top-0 h-40 w-40 rounded-full bg-[#FFD700]/5 blur-3xl xs:h-56 xs:w-56 sm:-left-20 sm:h-72 sm:w-72 md:-left-16 md:h-[420px] md:w-[420px] lg:h-[520px] lg:w-[520px]" />
        <div className="absolute -right-24 bottom-0 h-40 w-40 rounded-full bg-indigo-900/5 blur-3xl xs:h-56 xs:w-56 sm:-right-20 sm:h-72 sm:w-72 md:-right-16 md:h-[420px] md:w-[420px] lg:h-[520px] lg:w-[520px]" />
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FFD700]/10 to-indigo-900/10 blur-3xl xs:h-40 xs:w-40 sm:h-52 sm:w-52 md:h-72 md:w-72" />

        {/* Grid pattern - responsive spacing */}
        <div
          className="absolute inset-0 bg-indigo-900/[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(51,65,85,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(51,65,85,0.08) 1px, transparent 1px)",
            backgroundSize: "16px 16px sm:24px 24px md:32px 32px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-25 xs:py-10 sm:px-6 sm:py-8 md:py-10 lg:px-8 lg:py-15 xl:py-30">
        <div className="grid items-center gap-8 xs:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-20">
          
          {/* Left Content - Text Section */}
          <div className="relative order-2 lg:order-1">
            {/* Vertical accent line - hidden on mobile, visible on tablet+ */}
            <div className="hidden md:block absolute left-0 top-1 h-16 w-1 rounded-full bg-gradient-to-b from-[#FFD700] to-indigo-900 sm:h-20 lg:h-24" />

            <div className="md:pl-4 lg:pl-6 xl:pl-8">
              {/* Subheading - Responsive text sizes */}
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-900/60 xs:text-[11px] xs:tracking-[0.2em] sm:mb-3 sm:text-xs md:text-sm md:tracking-[0.24em]">
                Financial Systems Strategist • Executive Advisor
              </p>

              {/* Main Heading - Fluid typography */}
              <h1 className="font-serif text-2xl font-bold leading-[1.1] text-black xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                Build a business that{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#FFD700]">performs</span>
                  <span className="absolute bottom-1 left-0 -z-0 h-2 w-full bg-[#FFD700]/20 xs:h-2.5 sm:h-3 md:bottom-1.5 md:h-3.5 lg:bottom-2 lg:h-4" />
                </span>{" "}
                with clarity, discipline, and financial control.
              </h1>

              {/* Description - Responsive text and spacing */}
              <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-900/70 xs:mt-4 xs:text-base xs:leading-7 sm:mt-5 sm:leading-8 md:mt-6 md:text-lg">
                I help SMEs and leadership teams align finance, people, and
                operations so growth stops feeling chaotic and starts becoming
                measurable, structured, and profitable.
              </p>

              {/* CTA Buttons - Stack on mobile, row on tablet+ */}
              <div className="mt-5 flex flex-col gap-3 xs:mt-6 xs:gap-4 sm:mt-7 sm:flex-row sm:flex-wrap md:mt-8">
                <Link
                  to="/booking"
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-900 to-black px-4 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20 xs:rounded-xl xs:px-5 sm:w-auto sm:px-6 sm:py-3.5 md:px-8 md:py-4 md:text-base"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="hidden xs:inline">Book a Strategy Consultation</span>
                    <span className="xs:hidden">Book Consultation</span>
                    <svg
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 xs:h-4 xs:w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </Link>

                <Link
                  to="/fpo-method"
                  className="group inline-flex w-full items-center justify-center rounded-lg border border-indigo-200 bg-white/80 px-4 py-3 text-sm font-medium text-indigo-900 backdrop-blur-sm transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700] hover:shadow-lg hover:shadow-[#FFD700]/10 xs:rounded-xl xs:px-5 sm:w-auto sm:px-6 sm:py-3.5 md:px-8 md:py-4 md:text-base"
                >
                  <span>Explore the FPO Method™</span>
                  <svg
                    className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1 xs:h-4 xs:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              
         
            </div>
          </div>

          {/* Right Content - Image Section */}
          <div className="relative order-1 lg:order-2">
            {/* Corner decorations - hidden on mobile, visible on lg+ */}
            <div className="hidden lg:block absolute -left-6 -top-6 h-20 w-20">
              <div className="absolute left-0 top-0 h-12 w-12 border-l-4 border-t-4 border-[#FFD700]/30 lg:h-16 lg:w-16" />
            </div>

            <div className="hidden lg:block absolute -bottom-6 -right-6 h-20 w-20">
              <div className="absolute bottom-0 right-0 h-12 w-12 border-b-4 border-r-4 border-[#FFD700]/30 lg:h-16 lg:w-16" />
            </div>

            {/* Main Image Card */}
            <div className="relative overflow-hidden rounded-xl border border-indigo-200/50 bg-gradient-to-br from-indigo-900 to-black shadow-lg xs:rounded-2xl sm:rounded-[1.5rem] md:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <img
                src="/assets/11.jpeg"
                alt="Reena Gore - Financial Systems Strategist"
                className="w-full object-cover object-center xs:h-[250px] sm:h-[320px] md:h-[400px] lg:h-[400px] xl:h-[500px]"
                loading="eager"
              />
              
              {/* Image Caption - Responsive positioning and sizing */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white xs:p-4 sm:p-5 md:p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#FFD700] xs:text-[11px] sm:text-xs md:text-sm">
                  Reena Gore
                </p>
                <p className="text-sm font-semibold xs:text-base sm:text-lg md:text-xl lg:text-2xl">
                  Financial Systems Strategist
                </p>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line - Responsive height */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent md:h-1" />
    </section>
  );
}