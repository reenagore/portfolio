import { useState } from "react";
import { submitContactForm } from "../../services/contact.service";

const initialForm = {
  fullName: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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
    setSuccessMessage("");

    try {
      const res = await submitContactForm(formData);

      setSuccessMessage(
        res?.message || "Your message has been sent successfully."
      );
      setFormData(initialForm);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong while sending your message.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-indigo-100 bg-white/80 p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10 md:p-8">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      
      {/* Decorative corner elements */}
      <div className="absolute right-0 top-0 h-20 w-20">
        <div className="absolute right-0 top-0 h-10 w-10 border-r-4 border-t-4 border-[#FFD700]/30"></div>
      </div>
      
      <div className="relative">
        {/* Header with icon */}
        <div className="flex items-start gap-3 mb-6">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
            <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900/60">
              Send a Message
            </p>
            <h2 className=" text-2xl font-semibold text-black">
              Tell us what you need
            </h2>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50/90 p-4 text-sm text-emerald-700 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-3 w-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50/90 p-4 text-sm text-red-700 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                <span className="text-xs font-bold text-red-600">!</span>
              </div>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-indigo-900/60">
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
                className="w-full rounded-xl border border-indigo-200 bg-white/50 py-3 pl-10 pr-4 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-indigo-900/60">
              Email <span className="text-[#FFD700]">*</span>
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
                className="w-full rounded-xl border border-indigo-200 bg-white/50 py-3 pl-10 pr-4 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-indigo-900/60">
              Company
            </label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-400 transition-colors group-focus-within/input:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <input
                type="text"
                name="company"
                placeholder="Your Company Ltd"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded-xl border border-indigo-200 bg-white/50 py-3 pl-10 pr-4 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-indigo-900/60">
              Subject <span className="text-[#FFD700]">*</span>
            </label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-400 transition-colors group-focus-within/input:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                </svg>
              </div>
              <input
                type="text"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-xl border border-indigo-200 bg-white/50 py-3 pl-10 pr-4 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-medium uppercase tracking-wider text-indigo-900/60">
              Message <span className="text-[#FFD700]">*</span>
            </label>
            <div className="relative group/input">
              <div className="absolute top-3 left-0 pl-3">
                <svg className="h-5 w-5 text-indigo-400 transition-colors group-focus-within/input:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <textarea
                name="message"
                placeholder="Tell us about your enquiry..."
                value={formData.message}
                onChange={handleChange}
                className="min-h-[180px] w-full rounded-xl border border-indigo-200 bg-white/50 py-3 pl-10 pr-4 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-2">
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
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
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

        {/* Privacy note */}
        <p className="mt-6 text-center text-xs text-indigo-900/40">
          Your information is kept confidential and will not be shared with third parties.
        </p>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
    </div>
  );
}