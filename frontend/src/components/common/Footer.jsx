import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Decorative top border with golden gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-900/10 blur-3xl"></div>
        
        {/* Geometric pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
        {/* Main footer grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          
          {/* Brand column - larger */}
          <div className="lg:col-span-5">
            <Link 
              to="/" 
              className="group relative inline-block"
            >
              <h3 className="font-serif text-2xl font-semibold text-white">
                Reena Gore
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-400 transition-all duration-300 group-hover:w-full"></span>
              </h3>
            </Link>
            
            <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
              Financial Systems Strategist and Executive Advisor helping businesses
              align finance, people, and operations for scale.
            </p>

            {/* Social links with golden hover */}
            <div className="mt-6 flex items-center gap-3 sm:gap-4">
              {[
                { href: "#", icon: "linkedin", label: "LinkedIn" },
                { href: "#", icon: "twitter", label: "Twitter" },
                { href: "#", icon: "instagram", label: "Instagram" },
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  className="rounded-lg border border-gray-800 bg-gray-900/50 p-2 text-gray-400 backdrop-blur-sm transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700] hover:shadow-lg hover:shadow-[#FFD700]/10"
                  aria-label={social.label}
                >
                  {social.icon === "linkedin" && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"></path>
                    </svg>
                  )}
                  {social.icon === "twitter" && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  )}
                  {social.icon === "instagram" && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"></path>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div className="lg:col-span-3">
            <h4 className="relative inline-block text-sm font-semibold uppercase tracking-[0.15em] text-gray-300">
              Navigation
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-[#FFD700] to-transparent"></span>
            </h4>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-1">
              {[
                { label: "About", path: "/about" },
                { label: "FPO Method", path: "/fpo-method" },
                { label: "Services", path: "/services" },
                { label: "Podcast", path: "/podcast" },
                { label: "Insights", path: "/insights" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group relative w-fit text-sm text-gray-400 transition-all duration-200 hover:text-white"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Action column */}
          <div className="lg:col-span-4">
            <h4 className="relative inline-block text-sm font-semibold uppercase tracking-[0.15em] text-gray-300">
              Action
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-[#FFD700] to-transparent"></span>
            </h4>
            <div className="mt-6 flex flex-col gap-4">
              <Link
                to="/booking"
                className="group relative w-full sm:w-fit overflow-hidden rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Consultation
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </Link>

              <Link
                to="/contact"
                className="group relative w-fit text-sm text-gray-400 transition-all duration-200 hover:text-white"
              >
                <span className="relative">
                  Contact
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>

              <Link
                to="/admin/login"
                className="group relative w-fit text-xs text-gray-500 transition-all duration-200 hover:text-[#FFD700]"
              >
                <span className="flex items-center gap-1">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  Admin Login
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-12 rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm lg:mt-16">
          <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h5 className="font-serif text-lg font-medium text-white">
                Stay in the loop
              </h5>
              <p className="text-sm text-gray-400">
                Get financial strategy insights delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
              />
              <button className="rounded-lg bg-[#FFD700] px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-amber-500 hover:shadow-lg hover:shadow-[#FFD700]/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-8">
          <a href="mailto:hello@reenagore.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#FFD700] transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            hello@reenagore.com
          </a>
          <a href="tel:+254811181884" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#FFD700] transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +254 (7) 11 184 881
          </a>
        </div>
      </div>

      {/* Copyright section with golden accent */}
      <div className="relative border-t border-gray-800 bg-black/50">
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <p className="text-gray-500">
              © {new Date().getFullYear()} Reena Gore. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <Link to="/privacy" className="text-gray-500 transition-colors hover:text-[#FFD700] text-sm">
                Privacy Policy
              </Link>
              <span className="text-gray-700 hidden sm:inline">|</span>
              <Link to="/terms" className="text-gray-500 transition-colors hover:text-[#FFD700] text-sm">
                Terms of Service
              </Link>
              <span className="text-gray-700 hidden sm:inline">|</span>
              <Link to="/sitemap" className="text-gray-500 transition-colors hover:text-[#FFD700] text-sm">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}