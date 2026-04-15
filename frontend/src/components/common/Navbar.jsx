import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "FPO Method", path: "/fpo-method" },
  { label: "Services", path: "/services" },
  { label: "Podcast", path: "/podcast" },
  { label: "Events", path: "/events" },
  { label: "Programs", path: "/programs"},
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100/50' 
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo - Minimalist */}
          <Link 
            to="/" 
            className="text-lg font-light tracking-wide text-gray-900 hover:text-gray-600 transition-colors"
          >
            Reena Gore
          </Link>

          {/* Desktop Navigation - Clean & Minimal */}
          <nav className="hidden md:flex md:items-center md:gap-0.5 lg:gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 lg:px-4 py-2 text-sm font-light tracking-wide rounded-none transition-all duration-200 relative group ${
                    isActive 
                      ? "text-gray-900" 
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {/* Minimal underline indicator */}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gray-900 transition-all duration-300 group-hover:w-4/5 ${isActive ? 'w-4/5' : ''}`} />
                  </>
                )}
              </NavLink>
            ))}
            <Link
              to="/booking"
              className="ml-4 px-5 py-2 text-sm font-light text-white bg-gray-900 hover:bg-gray-800 transition-all duration-200  tracking-wide"
            >
              Book Consultation
            </Link>
          </nav>

          {/* Mobile Menu Button - Minimal */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mobile Menu - Clean & Minimal */}
          {isOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 md:hidden animate-fadeIn">
              <nav className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-base font-light transition-all duration-200 ${
                        isActive 
                          ? "text-gray-900 bg-gray-50" 
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <Link
                  to="/booking"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-light text-white bg-gray-900 hover:bg-gray-800 transition-all duration-200 text-center mt-4"
                >
                  Book Consultation
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Add this to your global CSS file
/*
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}
*/