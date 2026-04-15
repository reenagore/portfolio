import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { verifyPayment } from "../services/payment.service";
import BookingSuccessCard from "../components/bookings/BookingSuccess";

export default function PaymentVerify() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const runVerification = async () => {
      if (!reference) {
        setError("Missing payment reference.");
        setLoading(false);
        return;
      }

      try {
        const res = await verifyPayment(reference);
        setPayment(res.data);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          "We could not verify your payment at the moment.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    runVerification();
  }, [reference]);

  // Loading State
  if (loading) {
    return (
      <section className="relative mx-auto max-w-3xl px-4 py-20">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-900/5 blur-3xl"></div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-indigo-200/50 bg-white/80 p-8 shadow-xl shadow-indigo-900/5 backdrop-blur-sm">
          {/* Decorative corner */}
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#FFD700]/10 blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-indigo-900/10 blur-2xl"></div>

          {/* Loading animation */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="h-20 w-20 rounded-full border-4 border-indigo-100 border-t-[#FFD700] animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFD700]/50 opacity-20 animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="font-serif text-3xl font-bold text-black">
              Verifying{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#FFD700]">payment</span>
                <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
              </span>
            </h1>
            
            <p className="mt-4 text-indigo-900/70">
              Please wait while we confirm your transaction.
            </p>

            {/* Progress bar */}
            <div className="mt-8 h-1.5 w-64 overflow-hidden rounded-full bg-indigo-100">
              <div className="h-full w-1/2 animate-[progress_2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-[#FFD700] to-indigo-900"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="relative mx-auto max-w-3xl px-4 py-20">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-red-900/5 blur-3xl"></div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-red-200/50 bg-white/80 p-8 shadow-xl shadow-red-900/5 backdrop-blur-sm">
          {/* Decorative elements */}
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-red-500/10 blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-indigo-900/10 blur-2xl"></div>

          <div className="flex flex-col items-center text-center">
            {/* Error icon */}
            <div className="relative mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-red-500/5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/20">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
            </div>

            <h1 className="font-serif text-3xl font-bold text-black">
              Verification{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-red-500">failed</span>
                <span className="absolute bottom-1 left-0 h-3 w-full bg-red-500/20 -z-0"></span>
              </span>
            </h1>
            
            <p className="mt-4 text-indigo-900/70">{error}</p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/booking"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-3 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Booking
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </Link>

              <button
                onClick={() => window.location.reload()}
                className="rounded-xl border border-indigo-200 bg-white px-6 py-3 text-indigo-900 transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700]"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Success State
  return (
    <section className="relative mx-auto max-w-4xl px-4 py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-900/5 blur-3xl"></div>
      </div>

      {/* Success content */}
      <div className="space-y-8">
        <BookingSuccessCard payment={payment} />

        {/* Additional confirmation card */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-200/50 bg-white/80 p-8 shadow-xl shadow-indigo-900/5 backdrop-blur-sm">
          {/* Decorative elements */}
          <div className="absolute right-0 top-0 h-32 w-32">
            <div className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-[#FFD700]/30"></div>
          </div>

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            {/* Message */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700]/10">
                  <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-black">
                  Confirmation recorded
                </h3>
              </div>
              <p className="mt-2 ml-13 text-indigo-900/70">
                A confirmation has been recorded. The team will follow up with the next steps within 24 hours.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-3 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Go to Dashboard
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </Link>

              <Link
                to="/"
                className="rounded-xl border border-indigo-200 bg-white px-6 py-3 text-indigo-900 transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700]"
              >
                Return Home
              </Link>
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-6 flex items-center gap-4 border-t border-indigo-100 pt-6 text-sm text-indigo-900/50">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Confirmation email sent</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>24h response time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Add this to your global CSS file or tailwind.config.js for the custom animation
// @keyframes progress {
//   0% { transform: translateX(-100%); }
//   50% { transform: translateX(0); }
//   100% { transform: translateX(100%); }
// }