import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useState } from "react";

const navItems = [
  { 
    name: "Dashboard", 
    path: "/admin",
    icon: (isActive) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
      </svg>
    )
  },
  { 
    name: "Bookings", 
    path: "/admin/bookings",
    icon: (isActive) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    )
  },
  { 
    name: "Payments", 
    path: "/admin/payments",
    icon: (isActive) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
    )
  },
  { 
    name: "Articles", 
    path: "/admin/articles",
    icon: (isActive) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v8H7v-8z"></path>
      </svg>
    )
  },

  {
    name: "Events",
    path: "/admin/events",
    icon: (isActive) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    )
  },

  {
    name: "Gallery",
    path: "/admin/galleries",
    icon: (isActive) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L20 16M6 10h.01M10 6h.01M14 10h.01M18 6h.01M3 16v-5h18v5M3 7v5h18V7"></path>
      </svg>
    )
  },

  {
    name: "Products",
    path: "/admin/products",
    icon: (isActive) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
    )
  },

  { 
    name: "Book Preorders", 
    path: "/admin/book-preorders",
    icon: (isActive) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v8H7v-8z"></path>
      </svg>
    )
  },


  
  { 
    name: "Programs", 
    path: "/admin/programs",
    icon: (isActive) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v8H7v-8z"></path>
      </svg>
    )
  },
  { 
    name: "Podcasts", 
    path: "/admin/podcasts",
    icon: (isActive) => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
      </svg>
    )
  }
  // { 
  //   name: "Landing Pages", 
  //   path: "/admin/landing-pages",
  //   icon: (isActive) => (
  //     <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v8H7v-8z"></path>
  //     </svg>
  //   )
  // }
];

export default function AdminHeader() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header - Visible on small screens */}
      <div className="sticky top-0 z-30 border-b border-indigo-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="font-serif text-lg font-semibold text-black">Admin Panel</h1>
            <p className="flex items-center gap-1 text-xs text-indigo-900/60">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD700] opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FFD700]"></span>
              </span>
              {admin?.fullName || "Reena Gore"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="rounded-lg border border-indigo-200 p-2 text-indigo-900 transition-colors hover:border-[#FFD700] hover:text-[#FFD700]"
              title="Logout"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
            </button>
            <button
              onClick={toggleMobileMenu}
              className="rounded-lg border border-indigo-200 p-2 text-indigo-900 transition-colors hover:border-[#FFD700] hover:text-[#FFD700]"
              aria-label="Toggle menu"
            >
              <div className="relative flex flex-col items-center justify-center gap-1">
                <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
                <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-0 top-full border-t border-indigo-100 bg-white shadow-lg">
            <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FFD700]/10 to-transparent text-[#FFD700]"
                        : "text-indigo-900/70 hover:bg-indigo-50 hover:text-black"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={isActive ? "text-[#FFD700]" : "text-indigo-400"}>
                        {item.icon(isActive)}
                      </span>
                      <span className="relative">
                        {item.name}
                        {isActive && (
                          <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-[#FFD700] to-transparent"></span>
                        )}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}

              {/* Mobile Admin Info */}
              <div className="mt-4 border-t border-indigo-100 pt-4">
                <div className="flex items-center gap-3 rounded-lg bg-indigo-50/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                    <span className="font-serif text-lg font-semibold text-black">
                      {admin?.fullName?.charAt(0) || "R"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black">{admin?.fullName || "Admin User"}</p>
                    <p className="text-xs text-indigo-900/50">{admin?.role || "Administrator"}</p>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Sidebar - Fixed on the left */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 transform border-r border-indigo-100 bg-gradient-to-b from-white to-indigo-50/30 lg:block">
        {/* Sidebar Header */}
        <div className="relative border-b border-indigo-100 px-6 py-6">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          
          <div>
            <h2 className="font-serif text-xl font-semibold text-black">Admin Panel</h2>
            <p className="flex items-center gap-1 text-xs text-indigo-900/60">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD700] opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FFD700]"></span>
              </span>
              {admin?.fullName || "Reena Gore"}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#FFD700]/10 to-transparent text-[#FFD700]"
                    : "text-indigo-900/70 hover:bg-indigo-50 hover:text-black"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`transition-colors duration-200 ${isActive ? "text-[#FFD700]" : "text-indigo-400 group-hover:text-[#FFD700]"}`}>
                    {item.icon(isActive)}
                  </span>
                  <span className="relative">
                    {item.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-[#FFD700] to-transparent"></span>
                    )}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer with Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-indigo-100 bg-white/50 p-4">
          {/* User Info */}
          <div className="mb-4 rounded-lg bg-indigo-50/50 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                <span className="text-sm font-semibold text-black">
                  {admin?.fullName?.charAt(0) || "R"}
                </span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-black">{admin?.fullName || "Admin User"}</p>
                <p className="truncate text-xs text-indigo-900/50">{admin?.role || "Administrator"}</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="group relative w-full overflow-hidden rounded-lg border border-indigo-200 bg-white px-4 py-2.5 text-sm font-medium text-indigo-900 transition-all duration-200 hover:border-[#FFD700] hover:shadow-lg hover:shadow-[#FFD700]/10"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
          </button>

          {/* Version Info */}
          <p className="mt-3 text-center text-xs text-indigo-900/40">
            v2.0.0 • Admin Portal
          </p>
        </div>
      </aside>
    </>
  );
}