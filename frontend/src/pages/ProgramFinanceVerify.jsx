import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyProgrammeOrder } from "../services/programOrder.service";

export default function ProgrammePaymentVerify() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [params] = useSearchParams();
  const reference = params.get("reference");

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const runVerification = async () => {
      try {
        const res = await verifyProgrammeOrder(reference);
        setResult({
          success: res?.data?.paymentStatus === "paid",
          data: res?.data,
        });
      } catch (error) {
        setResult({
          success: false,
          data: null,
        });
      } finally {
        setLoading(false);
      }
    };

    if (reference) {
      runVerification();
    } else {
      setLoading(false);
      setResult({ success: false, data: null });
    }
  }, [reference]);

  if (loading) {
    return (
      <section className="relative min-h-[60vh] overflow-hidden flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
          <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-indigo-900/5 blur-3xl"></div>
        </div>

        <div className="text-center">
          <div className="relative mx-auto h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-[#FFD700] animate-spin"></div>
          </div>
          <h2 className="mt-6 font-serif text-2xl font-semibold text-black">Verifying Payment</h2>
          <p className="mt-2 text-indigo-900/60">Please wait while we confirm your transaction...</p>
        </div>
      </section>
    );
  }

  const isSuccess = result?.success;

  return (
    <section className="relative min-h-[70vh] overflow-hidden flex items-center">
      {/* Background Image for Success/Error */}
      <div className="absolute inset-0">
        <img
          src={isSuccess 
            ? "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            : "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          }
          alt={isSuccess ? "Payment Success" : "Payment Failed"}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-indigo-900/5 blur-3xl"></div>
        
        {/* Geometric pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-16 md:px-6">
        <div className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm shadow-2xl transition-all duration-300 ${
          isSuccess 
            ? "border-emerald-200 bg-white/80" 
            : "border-red-200 bg-white/80"
        }`}>
          {/* Decorative corner elements */}
          <div className="absolute -left-2 -top-2">
            <div className={`h-8 w-8 border-l-2 border-t-2 ${isSuccess ? 'border-emerald-300' : 'border-red-300'}`}></div>
          </div>
          <div className="absolute -bottom-2 -right-2">
            <div className={`h-8 w-8 border-b-2 border-r-2 ${isSuccess ? 'border-emerald-300' : 'border-red-300'}`}></div>
          </div>

          {/* Header accent line */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${isSuccess ? 'from-emerald-500 to-[#FFD700]' : 'from-red-500 to-orange-500'}`}></div>

          <div className="p-8 md:p-10">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className={`relative flex h-20 w-20 items-center justify-center rounded-full ${
                isSuccess ? 'bg-emerald-100' : 'bg-red-100'
              }`}>
                {isSuccess ? (
                  <svg className="h-10 w-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {/* Animated ring */}
                <div className={`absolute inset-0 rounded-full animate-ping ${
                  isSuccess ? 'bg-emerald-400/20' : 'bg-red-400/20'
                }`}></div>
              </div>
            </div>

            {/* Title */}
            <h1 className={`font-serif text-3xl font-bold text-center md:text-4xl ${
              isSuccess ? 'text-emerald-800' : 'text-red-800'
            }`}>
              {isSuccess ? "Payment Successful!" : "Payment Verification Failed"}
            </h1>

            {/* Message */}
            <p className="mt-4 text-center text-indigo-900/70">
              {isSuccess
                ? "Your programme registration has been confirmed. A confirmation email has been sent to your inbox."
                : "We could not confirm your payment. Please check your payment status or contact support if you were charged."}
            </p>

            {/* Payment Details (if successful) */}
            {isSuccess && result?.data && (
              <div className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50/30 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FFD700] mb-3">
                  Registration Details
                </h3>
                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p className="text-indigo-900/50">Programme</p>
                    <p className="font-medium text-black">Finance for Non-Finance Professionals</p>
                  </div>
                  <div>
                    <p className="text-indigo-900/50">Amount Paid</p>
                    <p className="font-semibold text-[#FFD700]">KES {result?.data?.amount?.toLocaleString() || "45,000"}</p>
                  </div>
                  <div>
                    <p className="text-indigo-900/50">Payment Reference</p>
                    <p className="font-mono text-sm text-black">{result?.data?.paymentReference || reference}</p>
                  </div>
                  <div>
                    <p className="text-indigo-900/50">Date</p>
                    <p className="text-black">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {isSuccess ? (
                <>
                  <Link
                    to="/programmes/finance-for-non-finance-professionals"
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-8 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Back to Programme
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="group inline-flex items-center justify-center rounded-xl border border-indigo-200 bg-white/80 px-8 py-3 text-sm font-medium text-indigo-900 backdrop-blur-sm transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700]"
                  >
                    Go to Dashboard
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/programmes/finance-for-non-finance-professionals"
                    className="group inline-flex items-center justify-center rounded-xl border border-indigo-200 bg-white/80 px-8 py-3 text-sm font-medium text-indigo-900 backdrop-blur-sm transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700]"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Programme
                  </Link>
                  <Link
                    to="/contact"
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-8 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Contact Support
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                  </Link>
                </>
              )}
            </div>

            {/* Next Steps */}
            {isSuccess && (
              <div className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50/30 p-4 text-center">
                <p className="text-sm text-indigo-900/70">
                  <span className="font-semibold text-[#FFD700]">Next Steps:</span> You'll receive programme details and access links within 24 hours. 
                  Check your email for confirmation and joining instructions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}