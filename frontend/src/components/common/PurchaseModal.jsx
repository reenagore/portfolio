import { useEffect, useState } from "react";
import { initializePayment } from "../../services/payment.service";

export default function PurchaseModal({
  isOpen,
  onClose,
  productTitle,
  amount,
  currency = "KES",
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: "",
        email: "",
      });
      setError("");
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && !loading) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
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
    if (e.target === e.currentTarget && !loading) {
      onClose?.();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await initializePayment({
        email: formData.email,
        fullName: formData.fullName,
        amount: Number(amount || 0),
        currency,
        purpose: "custom",
        service: productTitle || "Product Purchase",
      });

      const authorizationUrl = res?.data?.authorizationUrl;

      if (!authorizationUrl) {
        throw new Error("Payment link not returned.");
      }

      window.location.href = authorizationUrl;
    } catch (err) {
      console.error("Failed to initialize payment:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to start payment."
      );
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 transition-all duration-300"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-md animate-fadeInUp">
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
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          
          {/* Header with golden accent line */}
          <div className="relative border-b border-indigo-100 bg-gradient-to-r from-white to-indigo-50/30 p-6">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] to-indigo-900"></div>
            
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/10">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-900/60">
                    Complete Purchase
                  </p>
                </div>
                
                <h2 className="font-serif text-2xl font-bold text-black">
                  {productTitle}
                </h2>
                
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#FFD700]">
                    {currency} {amount?.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-lg border border-indigo-200 bg-white p-2 text-indigo-400 transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700] disabled:opacity-50"
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
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50/90 p-4 text-sm text-red-700 backdrop-blur-sm animate-slideDown">
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                    <span className="text-xs font-bold text-red-600">!</span>
                  </div>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-indigo-900/60">
                  Full Name <span className="text-[#FFD700]">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-indigo-400 transition-colors group-focus-within/input:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-200 bg-white py-3 pl-10 pr-4 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-indigo-900/60">
                  Email Address <span className="text-[#FFD700]">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-indigo-400 transition-colors group-focus-within/input:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-200 bg-white py-3 pl-10 pr-4 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-4 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20 disabled:cursor-not-allowed disabled:opacity-60 mt-2"
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
                      Continue to Payment
                      <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </button>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <svg className="h-4 w-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-xs text-indigo-900/40">
                  Your payment is secured with 256-bit encryption
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add these animations to your global CSS file
/*
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.3s ease-out forwards;
}

.animate-slideDown {
  animation: slideDown 0.3s ease-out forwards;
}
*/