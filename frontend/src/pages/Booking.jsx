import { useEffect } from "react";
import BookingForm from "../components/bookings/BookingForm";

export default function Booking() {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 md:py-30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-indigo-900/5 blur-3xl"></div>
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-5xl">
        {/* Header section with golden accents */}
        <div className="relative mb-16 border-l-4 border-[#FFD700] pl-6 md:pl-8">
          {/* Breadcrumb/Section indicator */}
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD700] text-xs font-bold text-black">
              1
            </span>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-900/70">
              Book Your Session
            </span>
            <span className="h-px w-12 bg-gradient-to-r from-[#FFD700] to-transparent"></span>
          </div>

          {/* Main heading */}
          <h1 className="font-serif text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
            Start the{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#FFD700]">conversation</span>
             
            </span>
            <br />
            with a structured advisory session
          </h1>

          {/* Description with subtle indigo styling */}
          <p className="mt-6 max-w-2xl text-lg text-indigo-900/80 md:text-xl">
            Share your business context, define the challenge clearly, and move to
            secure payment to confirm your request.
          </p>

          {/* Stats/Features highlight */}
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span className="text-sm text-indigo-900/70">60-min session</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <span className="text-sm text-indigo-900/70">Secure payment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span className="text-sm text-indigo-900/70">Instant confirmation</span>
            </div>
          </div>
        </div>

        {/* Main content area with the form */}
        <div className="relative">
          {/* Decorative corner elements */}
          <div className="absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-[#FFD700]/30"></div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-[#FFD700]/30"></div>

          {/* Form container */}
          <div className="relative rounded-3xl bg-white/80 backdrop-blur-sm">
            <BookingForm />
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-4">
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-[#FFD700] to-transparent"></div>
            <p className="text-xs text-indigo-900/60">
              By booking, you agree to our{' '}
              <a href="/terms" className="font-medium text-indigo-900 underline decoration-[#FFD700]/30 hover:text-[#FFD700] transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="font-medium text-indigo-900 underline decoration-[#FFD700]/30 hover:text-[#FFD700] transition-colors">
                Privacy Policy
              </a>
            </p>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-[#FFD700] to-transparent"></div>
          </div>

          {/* Payment method icons or trust badges */}
          <div className="flex items-center gap-3 text-indigo-900/40">
            <span className="text-sm">Secure payments</span>
            <span>•</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <span>•</span>
            <span className="text-sm">256-bit SSL</span>
          </div>
        </div>
      </div>
    </section>
  );
}