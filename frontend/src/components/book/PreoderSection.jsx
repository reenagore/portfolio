import BookPreorderForm from "./PreOrderForm";

export default function BookPreorderSection() {
  return (
    <section id="preorder" className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-20 lg:py-24">
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
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
                Pre-order Details
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold leading-tight text-black md:text-3xl lg:text-4xl">
              Be among the first to access{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#FFD700]">Decoding Business for Growth</span>
                
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-indigo-900/70">
              Pre-order your copy now and secure early access to a practical SME
              growth guide built around the FPO Method™.
            </p>

            {/* Book Details Card */}
            <div className="mt-8 rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                  <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-black">Book Information</h3>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-indigo-100">
                  <p className="text-sm font-medium text-indigo-900/60">Book:</p>
                  <p className="text-sm font-semibold text-black">Decoding Business for Growth</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-indigo-100">
                  <p className="text-sm font-medium text-indigo-900/60">Subtitle:</p>
                  <p className="text-sm text-indigo-900/70">Solutions for SMEs from the FPO Method™</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3">
                  <p className="text-sm font-medium text-indigo-900/60">Price:</p>
                  <p className="text-xl font-bold text-[#FFD700]">KES 2,250 <span className="text-sm font-normal text-indigo-900/50">per copy</span></p>
                </div>
              </div>

              {/* Bulk Order Note */}
              <div className="mt-6 flex items-center gap-2 text-xs text-indigo-900/40">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Bulk orders available. Contact us for corporate pricing.</span>
              </div>
            </div>

            {/* Early Bird Badge */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-[#FFD700]/10 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD700] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD700]"></span>
                </span>
                <span className="text-xs font-medium text-[#FFD700]">Early Bird Special</span>
              </div>
              <span className="text-xs text-indigo-900/50">First 100 orders get signed copies</span>
            </div>
          </div>

          {/* Right Column - Pre-order Form */}
          <div>
            <BookPreorderForm />
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
    </section>
  );
}