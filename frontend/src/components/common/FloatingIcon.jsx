import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FloatingEventIcon() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  useEffect(() => {
    // Check if user has closed the popup before
    const popupClosed = localStorage.getItem("eventPopupClosed");
    if (!popupClosed) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setHasBeenClosed(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("eventPopupClosed", "true");
    setHasBeenClosed(true);
  };

  const handleMouseEnter = () => {
    if (isVisible) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  if (hasBeenClosed && !isVisible) return null;

  return (
    <>
      {/* Floating Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
        }`}
      >
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          {/* Pulse animation ring */}
          <div className="absolute inset-0 rounded-full animate-ping-slow bg-[#FFD700]/40"></div>
          <div className="absolute inset-0 rounded-full animate-pulse bg-[#FFD700]/20"></div>
          
          {/* Main Button */}
          <Link
            to="/events"
            className="relative flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFD700] to-amber-500 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[#FFD700]/50"
            style={{
              width: isExpanded ? "auto" : "56px",
              height: "56px",
              paddingLeft: isExpanded ? "20px" : "0",
              paddingRight: isExpanded ? "20px" : "0",
            }}
          >
            {isExpanded ? (
              <span className="flex items-center gap-3 whitespace-nowrap font-medium text-black">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Explore Events
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            ) : (
              <svg
                className="h-7 w-7 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
          </Link>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-white transition-all hover:bg-gray-800 hover:scale-110"
            aria-label="Close"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Optional: Toast notification that appears before the floating button */}
      {isVisible && !hasBeenClosed && (
        <div className="fixed bottom-28 right-6 z-40 max-w-xs animate-slideInRight">
          <div className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg
                  className="h-5 w-5 text-[#FFD700]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-black">
                  Upcoming Events!
                </p>
                <p className="mt-1 text-xs text-indigo-900/70">
                  Discover workshops, intensives, and strategic sessions designed for business leaders.
                </p>
                <Link
                  to="/events"
                  className="mt-2 inline-block text-xs font-medium text-[#FFD700] hover:underline"
                >
                  Explore Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          75%,
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}