import { useEffect, useState, useRef } from "react";
import { initiateProgrammeOrder } from "../../services/programOrder.service";

export default function ProgrammeCheckoutModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        role: "",
      });
      setError("");
      setLoading(false);
      setFocusedField(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && !loading) onClose?.();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      // Smooth scroll to top of modal
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, loading, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await initiateProgrammeOrder(formData);
      const authorizationUrl = res?.data?.authorizationUrl;

      if (!authorizationUrl) {
        throw new Error("Payment URL not returned");
      }

      window.location.href = authorizationUrl;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to start programme payment"
      );
      setLoading(false);
      // Smooth scroll to error message
      setTimeout(() => {
        const errorElement = document.getElementById("modal-error");
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  };

  const inputFields = [
    { name: "fullName", label: "Full Name", placeholder: "John Doe", icon: "user", required: true, colSpan: "full" },
    { name: "email", label: "Email Address", placeholder: "john@company.com", icon: "email", required: true, colSpan: "half" },
    { name: "phone", label: "Phone Number", placeholder: "+1 234 567 8900", icon: "phone", required: false, colSpan: "half" },
    { name: "company", label: "Company / Organization", placeholder: "Company Name", icon: "company", required: false, colSpan: "half" },
    { name: "role", label: "Role / Position", placeholder: "e.g., CEO, Director, Manager", icon: "role", required: false, colSpan: "half" },
  ];

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'user':
        return (
          <svg className="h-5 w-5 text-indigo-400 transition-colors group-focus-within/input:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'email':
        return (
          <svg className="h-5 w-5 text-indigo-400 transition-colors group-focus-within/input:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="h-5 w-5 text-indigo-400 transition-colors group-focus-within/input:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'company':
        return (
          <svg className="h-5 w-5 text-indigo-400 transition-colors group-focus-within/input:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'role':
        return (
          <svg className="h-5 w-5 text-indigo-400 transition-colors group-focus-within/input:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 transition-all duration-300 animate-fadeIn"
    >
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto animate-slideUp"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Decorative corner elements */}
        <div className="absolute -left-2 -top-2">
          <div className="h-8 w-8 border-l-2 border-t-2 border-[#FFD700]/30"></div>
        </div>
        <div className="absolute -bottom-2 -right-2">
          <div className="h-8 w-8 border-b-2 border-r-2 border-[#FFD700]/30"></div>
        </div>

        {/* Modal Content */}
        <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-2xl">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300"></div>
          
          {/* Header with golden accent line */}
          <div className="relative border-b border-indigo-100 bg-gradient-to-r from-white to-indigo-50/30 p-6">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] to-indigo-900"></div>
            
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/10">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-900/60">
                    Programme Registration
                  </p>
                </div>
                
                <h2 className="font-serif text-2xl font-bold text-black">
                  Finance for Non-Finance Professionals
                </h2>
                
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#FFD700] animate-pulse">KES 45,000</span>
                  <span className="text-xs text-indigo-900/40">per participant</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-lg border border-indigo-200 bg-white p-2 text-indigo-400 transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700] hover:scale-105 disabled:opacity-50"
                aria-label="Close modal"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Error Message */}
            {error && (
              <div 
                id="modal-error"
                className="mb-5 rounded-xl border border-red-200 bg-red-50/90 p-4 text-sm text-red-700 backdrop-blur-sm animate-shake"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                    <span className="text-xs font-bold text-red-600">!</span>
                  </div>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* Programme Info Card */}
            <div className="mb-6 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/30 to-white p-4 transition-all duration-300 hover:border-[#FFD700] hover:shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Programme Details</p>
              </div>
              <p className="text-sm text-indigo-900/70 leading-relaxed">
                This 2-day intensive programme includes live sessions, case studies, and practical exercises.
                You'll receive access to all materials upon registration.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              {inputFields.map((field) => (
                <div 
                  key={field.name} 
                  className={`space-y-2 ${field.colSpan === 'full' ? 'md:col-span-2' : ''}`}
                >
                  <label className="text-xs font-medium uppercase tracking-wider text-indigo-900/60">
                    {field.label} {field.required && <span className="text-[#FFD700]">*</span>}
                  </label>
                  <div className={`relative group/input transition-all duration-200 ${focusedField === field.name ? 'scale-[1.02]' : ''}`}>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      {getIcon(field.icon)}
                    </div>
                    <input
                      type={field.name === 'email' ? 'email' : 'text'}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className="w-full rounded-xl border border-indigo-200 bg-white py-3 pl-10 pr-4 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-200"
                      required={field.required}
                    />
                  </div>
                </div>
              ))}

              {/* Total Summary */}
              <div className="md:col-span-2 mt-2 rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/30 to-white p-4 transition-all duration-300 hover:border-[#FFD700]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-indigo-900/70">Total Amount:</span>
                  </div>
                  <p className="text-2xl font-bold text-[#FFD700]">KES 45,000</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-4 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
                    {loading ? (
                      <>
                        <svg className="h-5 w-5 animate-spin text-[#FFD700]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Register and Pay
                        <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                </button>
              </div>
            </form>

            {/* Security Note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-indigo-900/40">
              <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Your payment is secured with 256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}