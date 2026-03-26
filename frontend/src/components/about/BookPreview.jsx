import { Link } from "react-router-dom";

export default function BookPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-8 lg:py-10">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        
        
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
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Book Cover Image */}
          <div className="relative group">
            
            
            <div className="relative flex items-center justify-center ">
              {/* Book Cover */}
              <div className="relative w-full max-w-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-3xl">
                {/* Book Cover Image */}
                <img
                  src="/assets/book1.png"
                  alt="Decoding Business for Growth Book Cover"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay with book title for visual effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FFD700]">Coming Soon</p>
                    <p className="mt-2 text-sm font-medium">Decoding Business for Growth</p>
                  </div>
                </div>
                
                
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
                Decoding Business for Growth
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold leading-tight text-black md:text-3xl lg:text-4xl">
              A practical guide for SMEs trying to grow{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#FFD700]">without losing control</span>
              
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-indigo-900/70">
              <p>
                <strong className="text-black">Decoding Business for Growth</strong> brings together the
                lessons behind the FPO Method™ to help SME leaders understand why
                growth often creates pressure, confusion, and weak execution instead
                of stability.
              </p>

              <p>
                The book is designed for founders, executives, and business owners
                who need practical ways to improve financial clarity, strengthen
                people systems, and build operations that can actually support
                growth.
              </p>
            </div>

            

            {/* CTA Buttons */}
            <div className="mt-10 flex  gap-4 sm:flex-row">
              <Link
                to="/my-book"
                className="group relative overflow-hidden justify-center align-center rounded-xl bg-gradient-to-r from-indigo-900 to-black px-8 py-4 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore the Book
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </Link>

              <a
                href="/my-book#preorder"
                className="group inline-flex items-center justify-center rounded-xl border border-indigo-200 bg-white/80 px-8 py-4 text-sm font-medium text-indigo-900 backdrop-blur-sm transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700] hover:shadow-lg hover:shadow-[#FFD700]/10"
              >
                Pre-order Now
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Release Info */}
            <div className="mt-6 flex items-center text-center justify-center gap-4 text-xs text-indigo-900/50">
              <span className="flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Coming Q2 2024
              </span>
              <span className="h-3 w-px bg-indigo-200"></span>
              <span className="flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                First Edition
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
    </section>
  );
}