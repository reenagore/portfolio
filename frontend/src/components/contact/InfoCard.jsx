import { Link } from "react-router-dom";

export default function ContactInfoCard() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-indigo-100 bg-white/80 p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10 md:p-8">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      
      {/* Decorative corner elements */}
      <div className="absolute right-0 top-0 h-20 w-20">
        <div className="absolute right-0 top-0 h-10 w-10 border-r-4 border-t-4 border-[#FFD700]/30"></div>
      </div>
      
      <div className="relative">
        {/* Header with icon */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
            <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900/60">
            What this is for
          </p>
        </div>

    

        {/* Info sections */}
        <div className="mt-8 space-y-4">
          {/* Advisory Enquiries */}
          <div className="group/item relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/50 p-5 transition-all duration-300 hover:border-[#FFD700] hover:shadow-md">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity group-hover/item:opacity-100"></div>
            <div className="relative flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#FFD700]/10">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Advisory Enquiries</h3>
                <p className="mt-1 text-sm leading-relaxed text-indigo-900/70">
                  Reach out if you need guidance on which service best fits your
                  business situation.
                </p>
              </div>
            </div>
          </div>

          {/* Speaking & Corporate Engagements */}
          <div className="group/item relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/50 p-5 transition-all duration-300 hover:border-[#FFD700] hover:shadow-md">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity group-hover/item:opacity-100"></div>
            <div className="relative flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#FFD700]/10">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v8H7v-8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Speaking & Corporate Engagements</h3>
                <p className="mt-1 text-sm leading-relaxed text-indigo-900/70">
                  Use this channel for workshop, leadership program, and event-related
                  requests.
                </p>
              </div>
            </div>
          </div>

          {/* Strategy Sessions */}
          <div className="group/item relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/50 p-5 transition-all duration-300 hover:border-[#FFD700] hover:shadow-md">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity group-hover/item:opacity-100"></div>
            <div className="relative flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#FFD700]/10">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Strategy Sessions</h3>
                <p className="mt-1 text-sm leading-relaxed text-indigo-900/70">
                  If you are ready to move faster, use the booking page to request a
                  structured consultation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <Link
            to="/booking"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-black px-6 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Go to Booking Page
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
          </Link>
        </div>

        {/* Quick contact note */}
        <p className="mt-6 text-xs text-indigo-900/40 text-center">
          All enquiries are treated with confidentiality and typically receive a response within 24 hours
        </p>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
    </div>
  );
}