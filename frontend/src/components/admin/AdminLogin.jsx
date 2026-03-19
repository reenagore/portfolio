import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/admin";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Check your credentials.";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 to-white px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-indigo-900/5 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FFD700]/10 to-indigo-900/10 blur-3xl"></div>
      </div>

      {/* Main login card */}
      <div className="relative w-full max-w-md">
        

        {/* Card with glass morphism effect */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-200/50 bg-white/80 p-8 shadow-2xl shadow-indigo-900/10 backdrop-blur-xl">
          {/* Golden gradient top border */}
  

          {/* Header with branding */}
          <div className="mb-8 text-center">
            
            
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-indigo-900/60">
              Admin Access
            </p>
            
            <h1 className="font-serif text-3xl font-bold text-black">
              Welcome back
            </h1>
            
            <p className="mt-2 text-sm text-indigo-900/60">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Error message with golden accent */}
          {error ? (
            <div className="mb-6 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/5 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD700]/20">
                  <span className="text-xs font-bold text-[#FFD700]">!</span>
                </div>
                <p className="text-sm text-indigo-900/80">{error}</p>
              </div>
            </div>
          ) : null}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-wider text-indigo-900/60">
                Email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-indigo-400 transition-colors group-focus-within:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 12H8m8 4H8m8-8H8M3 8h.01M3 12h.01M3 16h.01M7 8h10a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2z"></path>
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@reenagore.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-indigo-200 bg-white/50 py-3.5 pl-10 pr-4 text-black placeholder:text-indigo-300 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium uppercase tracking-wider text-indigo-900/60">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-indigo-900/50 transition-colors hover:text-[#FFD700]"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-indigo-400 transition-colors group-focus-within:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-indigo-200 bg-white/50 py-3.5 pl-10 pr-4 text-black placeholder:text-indigo-300 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl bg-black px-6 py-4 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
                {loading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin text-[#FFD700]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </>
                )}
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
            </button>
          </form>

          {/* Security notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-indigo-900/40">
              Secure admin access • Protected by encryption
            </p>
          </div>

          
        </div>

        {/* Footer links */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1 text-xs text-indigo-900/50 transition-colors hover:text-[#FFD700]"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Return to website
          </a>
        </div>
      </div>
    </section>
  );
}