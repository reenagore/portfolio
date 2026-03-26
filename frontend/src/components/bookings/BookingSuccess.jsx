export default function BookingSuccessCard({ payment }) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-[#FFD700]/20 bg-gradient-to-br from-white to-indigo-50/50 p-6 shadow-xl shadow-indigo-900/5">
        {/* Decorative corner accents */}
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#FFD700]/10 blur-2xl"></div>
        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-indigo-900/10 blur-2xl"></div>
        
        {/* Success header with golden accents */}
        <div className="relative flex items-start gap-4">
          {/* Animated success icon */}
          <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#FFD700]/20"></div>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFD700]/80 shadow-lg shadow-[#FFD700]/20">
              <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="font-serif text-2xl font-bold text-black">
              Payment{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#FFD700]">confirmed</span>
                <span className="absolute bottom-1 left-0 h-2 w-full bg-[#FFD700]/20 -z-0"></span>
              </span>
            </h2>
            <p className="mt-2 text-indigo-900/70">
              Your consultation request has been received and your payment was verified
              successfully.
            </p>
          </div>
        </div>
  
        {/* Payment details card */}
        <div className="relative mt-8 rounded-xl border border-indigo-200/50 bg-white/80 p-6 backdrop-blur-sm">
          {/* Corner decoration */}
          <div className="absolute right-2 top-2 h-8 w-8 border-r-2 border-t-2 border-[#FFD700]/30"></div>
          
          <h3 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-indigo-900/60">
            <span className="h-px w-4 bg-[#FFD700]"></span>
            Transaction Details
            <span className="h-px w-4 bg-[#FFD700]"></span>
          </h3>
  
          <div className="grid gap-4 text-sm md:grid-cols-2">
            {/* Reference */}
            <div className="group relative rounded-lg border border-indigo-100 bg-indigo-50/30 p-3 transition-all duration-200 hover:border-[#FFD700]/30 hover:bg-[#FFD700]/5">
              <span className="mb-1 block text-xs text-indigo-900/50">Reference</span>
              <span className="font-mono font-medium text-black">{payment.reference}</span>
            </div>
  
            {/* Amount */}
            <div className="group relative rounded-lg border border-indigo-100 bg-indigo-50/30 p-3 transition-all duration-200 hover:border-[#FFD700]/30 hover:bg-[#FFD700]/5">
              <span className="mb-1 block text-xs text-indigo-900/50">Amount</span>
              <span className="font-medium text-black">
                <span className="text-[#FFD700]">{payment.currency}</span> {payment.amount}
              </span>
            </div>
  
            {/* Status - with custom styling */}
            <div className="group relative rounded-lg border border-indigo-100 bg-indigo-50/30 p-3 transition-all duration-200 hover:border-[#FFD700]/30 hover:bg-[#FFD700]/5">
              <span className="mb-1 block text-xs text-indigo-900/50">Status</span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD700] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD700]"></span>
                </span>
                <span className="font-medium capitalize text-black">{payment.status}</span>
              </div>
            </div>
  
            {/* Service */}
            <div className="group relative rounded-lg border border-indigo-100 bg-indigo-50/30 p-3 transition-all duration-200 hover:border-[#FFD700]/30 hover:bg-[#FFD700]/5">
              <span className="mb-1 block text-xs text-indigo-900/50">Service</span>
              <span className="font-medium text-black">{payment.service}</span>
            </div>
          </div>
  
          {/* Additional metadata if available */}
          {payment.date && (
            <div className="mt-4 flex items-center gap-2 border-t border-indigo-100 pt-4 text-xs text-indigo-900/50">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Transaction date: {payment.date}</span>
            </div>
          )}
        </div>
  
        {/* Next steps section */}
        <div className="relative mt-6 rounded-lg bg-gradient-to-r from-indigo-900/5 to-transparent p-4">
          <h4 className="flex items-center gap-2 text-sm font-medium text-black">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFD700] text-xs text-black">
              →
            </span>
            Next steps
          </h4>
          <p className="mt-2 text-sm text-indigo-900/70">
            You'll receive a confirmation email shortly with calendar details and preparation materials.
            Our team will reach out within 24 hours to confirm your session.
          </p>
        </div>
  
        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm text-indigo-900 transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
            </svg>
            Print receipt
          </button>
          
          <a
            href="/"
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-900 to-black px-6 py-2 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Go back
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
          </a>
        </div>
      </div>
    );
  }