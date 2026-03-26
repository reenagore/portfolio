import { Link } from "react-router-dom";

export default function BookHeroSection() {
  return (
    <section className="relative h-[40vh] min-h-[500px] overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/book1.png"
          alt="Books and Knowledge"
          className="h-full w-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-indigo-900/60"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#FFD700]/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-900/20 blur-3xl"></div>
      
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      ></div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 text-center">
        <div className="grid lg:items-center">
          {/* Left Content - Text */}
          <div className="text-center lg:text-left">
            {/* Decorative line above */}
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-[#FFD700] to-transparent"></div>
            </div>

            <p className="text-sm font-semibold uppercase text-center tracking-[0.25em] text-[#FFD700]">
              Coming Soon
            </p>

            <h1 className="mt-4 font-serif text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
              Decoding Business for Growth
            </h1>

            <p className="mt-4 text-lg text-center font-medium text-indigo-200">
              Solutions for SMEs from the FPO Method™
            </p>

           

            <div className="mt-8 flex flex-wrap gap-4  justify-center ">
              <a
                href="#preorder"
                className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Pre-order the Book
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </a>

              
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center gap-4 justify-center">
              <div className="flex items-center gap-2">
                
                <span className="text-xs text-gray-400">Coming Q2 2024</span>
              </div>
              <div className="h-4 w-px bg-gray-700"></div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-400">First Edition</span>
              </div>
              <div className="h-4 w-px bg-gray-700"></div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-xs text-gray-400">FPO Method™ Framework</span>
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