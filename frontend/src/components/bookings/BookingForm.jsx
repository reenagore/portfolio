import { useState } from "react";
import { submitBooking } from "../../services/booking.service";
import { initializePayment } from "../../services/payment.service";

const initialForm = {
  fullName: "",
  email: "",
  company: "",
  phone: "",
  service: "Strategy Consultation",
  businessStage: "",
  annualRevenueRange: "",
  preferredContactMethod: "Email",
  preferredSessionType: "Virtual",
  preferredDate: "",
  preferredTime: "",
  challengeSummary: "",
  goals: "",
  source: "Website",
};

export default function BookingForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stepMessage, setStepMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAmountByService = (service) => {
    const pricing = {
      "Profit Pulse Audit": 250,
      "FPO Method Implementation": 500,
      "Executive & Corporate Programs": 750,
      "Strategy Consultation": 100,
    };

    return pricing[service] || 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStepMessage("Submitting your consultation request...");

    try {
      const bookingRes = await submitBooking(formData);
      const bookingId = bookingRes?.data?.id;

      if (!bookingId) {
        throw new Error("Booking created but booking ID was not returned.");
      }

      setStepMessage("Initializing payment...");

      const paymentRes = await initializePayment({
        email: formData.email,
        fullName: formData.fullName,
        amount: getAmountByService(formData.service),
        currency: "KES",
        purpose: "consultation",
        service: formData.service,
        bookingId,
      });

      const authorizationUrl = paymentRes?.data?.authorizationUrl;

      if (!authorizationUrl) {
        throw new Error("Payment initialized but authorization URL is missing.");
      }

      window.location.href = authorizationUrl;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong while submitting your booking.";
      setError(message);
      setLoading(false);
      setStepMessage("");
    }
  };

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-500/5">
      {/* Header with golden accent */}
      <div className="mb-8 border-b border-indigo-100 pb-4">
        <h2 className="font-serif text-3xl font-semibold text-black">
          Book a{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#FFD700]">Consultation</span>
            <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
          </span>
        </h2>
        <p className="mt-2 text-sm text-indigo-900/70">
          Fill in your details and proceed to payment
        </p>
      </div>

      {/* Alert messages with new colors */}
      {error ? (
        <div className="mb-4 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/5 p-4 text-sm text-black">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#FFD700]"></span>
          {error}
        </div>
      ) : null}

      {stepMessage ? (
        <div className="mb-4 rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 text-sm text-indigo-900">
          <div className="flex items-center">
            <svg className="mr-3 h-5 w-5 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {stepMessage}
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
        {/* Input fields with new styling */}
        <div className="group relative md:col-span-1">
          <input
            className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
            type="text"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="group relative md:col-span-1">
          <input
            className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="group relative md:col-span-1">
          <input
            className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div className="group relative md:col-span-1">
          <input
            className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
            type="text"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <select
          className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option>Strategy Consultation</option>
          <option>Profit Pulse Audit</option>
          <option>FPO Method Implementation</option>
          <option>Executive & Corporate Programs</option>
        </select>

        <select
          className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
          name="businessStage"
          value={formData.businessStage}
          onChange={handleChange}
        >
          <option value="" className="text-indigo-900/50">Business stage</option>
          <option>Startup</option>
          <option>Early Growth</option>
          <option>Scaling SME</option>
          <option>Established Business</option>
          <option>Corporate / Institution</option>
        </select>

        <select
          className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
          name="annualRevenueRange"
          value={formData.annualRevenueRange}
          onChange={handleChange}
        >
          <option value="" className="text-indigo-900/50">Annual revenue range</option>
          <option>Below $100K</option>
          <option>$100K - $500K</option>
          <option>$500K - $2M</option>
          <option>$2M - $10M</option>
          <option>$10M+</option>
        </select>

        <select
          className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
          name="preferredContactMethod"
          value={formData.preferredContactMethod}
          onChange={handleChange}
        >
          <option>Email</option>
          <option>Phone</option>
          <option>WhatsApp</option>
          <option>Either</option>
        </select>

        <select
          className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
          name="preferredSessionType"
          value={formData.preferredSessionType}
          onChange={handleChange}
        >
          <option>Virtual</option>
          <option>In Person</option>
          <option>Either</option>
        </select>

        <input
          className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
          type="date"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 md:col-span-2"
          type="text"
          name="preferredTime"
          placeholder="Preferred time"
          value={formData.preferredTime}
          onChange={handleChange}
        />

        <textarea
          className="min-h-[140px] w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 md:col-span-2"
          name="challengeSummary"
          placeholder="What is the main challenge you want to solve?"
          value={formData.challengeSummary}
          onChange={handleChange}
          required
        />

        <textarea
          className="min-h-[120px] w-full rounded-xl border border-indigo-200 bg-white px-4 py-3.5 text-black transition-all duration-200 placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 md:col-span-2"
          name="goals"
          placeholder="What outcomes are you looking for?"
          value={formData.goals}
          onChange={handleChange}
        />

        {/* Submit button with golden gradient */}
        <button
          type="submit"
          disabled={loading}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-5 py-4 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
        >
          <span className="relative z-10 flex items-center justify-center font-medium">
            {loading ? (
              <>
                <svg className="mr-3 h-5 w-5 animate-spin text-[#FFD700]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Submit and Continue to Payment"
            )}
          </span>
          <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
        </button>
      </form>

      {/* Decorative elements */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-indigo-900/50">
        <div className="h-1 w-1 rounded-full bg-[#FFD700]"></div>
        <span>Secure booking • Instant confirmation</span>
        <div className="h-1 w-1 rounded-full bg-[#FFD700]"></div>
      </div>
    </div>
  );
}