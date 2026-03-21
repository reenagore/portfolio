import { Link } from "react-router-dom";

const items = [
  {
    title: "Create Event Landing Page",
    description:
      "For conferences, workshops, training sessions, executive gatherings, and ticketed events.",
    link: "/admin/landing-pages/new?type=event",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-amber-500 to-orange-500",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    title: "Create Product Landing Page",
    description:
      "For digital products, programs, paid offers, service packages, and product-based campaigns.",
    link: "/admin/landing-pages/new?type=product",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    color: "from-indigo-600 to-indigo-800",
    badgeColor: "bg-indigo-100 text-indigo-700",
  },
  {
    title: "Create Event Gallery Page",
    description:
      "For event recaps, galleries, visual storytelling, testimonials, and brand proof.",
    link: "/admin/landing-pages/new?type=gallery",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-[#FFD700] to-amber-600",
    badgeColor: "bg-amber-100 text-amber-700",
  },
];

export default function LandingPagesIndex() {
  return (
    <div className="space-y-6">
      {/* Header with golden accent */}
      <div className="relative">
        <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
        <div className="pl-6">
          <h2 className="font-serif text-3xl font-bold text-black">
            Landing{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#FFD700]">Pages</span>
              <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
            </span>
          </h2>
          <p className="mt-2 text-indigo-900/70">
            Choose the kind of landing page you want to create.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/20"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            {/* Icon with gradient background */}
            <div className={`relative mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <span className="text-white">{item.icon}</span>
            </div>

            {/* Content */}
            <div className="relative">
              <h3 className="font-serif text-xl font-semibold text-black">
                {item.title}
              </h3>
              
              <p className="mt-3 text-sm leading-relaxed text-indigo-900/70">
                {item.description}
              </p>

              {/* Start Link */}
              <Link
                to={item.link}
                className="group/link mt-6 inline-flex items-center gap-2 rounded-lg px-0 py-2 text-sm font-medium text-[#FFD700] transition-all duration-200 hover:gap-3"
              >
                <span className="relative">
                  Start Creating
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#FFD700] transition-all duration-300 group-hover/link:w-full"></span>
                </span>
                <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="mt-8 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-serif text-lg font-semibold text-black">
              Need help choosing?
            </h3>
            <p className="mt-1 text-sm text-indigo-900/60">
              Not sure which landing page type is right for your needs? We're here to help.
            </p>
          </div>
          <Link
            to="/admin/support"
            className="group inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-6 py-3 text-sm font-medium text-indigo-900 transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700]"
          >
            Contact Support
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}