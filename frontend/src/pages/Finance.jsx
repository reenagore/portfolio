import { useState } from "react";
import ProgrammeCheckoutModal from "../components/programs/ProgramCheckoutModal";

const objectives = [
  "Read and interpret financial statements with confidence",
  "Use key financial ratios to evaluate business health",
  "Understand budgeting and cost management in the African context",
  "Bridge the gap between operational decisions and financial outcomes",
  "Make pricing, investment, and resource allocation decisions with financial logic",
  "Connect finance, people, and operations using the FPO Method™",
  "Navigate KRA compliance essentials with confidence",
];

const takeaways = [
  "Comprehensive programme workbook with templates",
  "Financial health diagnostic toolkit",
  "FPO Method™ reference guide",
  "Certificate of completion",
  "30-day post-programme email support",
  "Access to the LYNKRZ e-learning module",
];

const day1Topics = [
  "The WHY of Financial Literacy",
  "Understanding the Income Statement (Profit & Loss)",
  "The Balance Sheet – Your Business Health Check",
  "The Cash Flow Statement – Following the Money",
  "Financial Ratios That Matter",
  "Budgeting as a Leadership Tool",
  "Cost Behaviour & Break-Even Analysis",
];

const day2Topics = [
  "Forecasting & Scenario Planning",
  "Working Capital Management",
  "Capital Investment Decisions",
  "Tax Compliance Essentials for Leaders",
  "Financial Communication for Boards & Investors",
  "The FPO Integration Challenge (Capstone Simulation)",
  "Creating Your Personal Financial Leadership Action Plan",
];

export default function FinanceForNonFinanceProgramme() {
  const [openCheckout, setOpenCheckout] = useState(false);

  return (
    <div className="bg-white">
      <ProgrammeCheckoutModal
        isOpen={openCheckout}
        onClose={() => setOpenCheckout(false)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
          <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-indigo-900/5 blur-3xl"></div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 lg:py-30">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/10">
                  <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
                  LYNKRZ Two-Day Intensive Program
                </p>
              </div>

              <h1 className="font-serif text-3xl font-bold leading-tight text-black md:text-5xl lg:text-6xl">
                Finance for Non-Finance Professionals
              </h1>

              <p className="mt-4 text-lg font-medium text-indigo-800">
                From Numbers to Strategy: Building Financial Fluency for African Business Leaders
              </p>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-indigo-900/70">
                A two-day immersive programme designed for leaders who make financial
                decisions every day without being accountants.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setOpenCheckout(true)}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-8 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Register and Pay
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                </button>

                <a
                  href="#overview"
                  className="group inline-flex items-center justify-center rounded-xl border border-indigo-200 bg-white/80 px-8 py-3 text-sm font-medium text-indigo-900 backdrop-blur-sm transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700]"
                >
                  Preview Course
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Programme Snapshot */}
            <div className="relative">
              <div className="absolute -right-4 -top-4">
                <div className="h-16 w-16 border-r-4 border-t-4 border-[#FFD700]/30"></div>
              </div>
              <div className="rounded-2xl border border-indigo-100 bg-white/80 p-6 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                 
                  <h2 className="font-serif text-xl font-semibold text-black">
                    Programme Snapshot
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-indigo-100 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400">Facilitator</p>
                    <p className="mt-1 text-sm font-medium text-black">Reena Gore, CFO | CEO, LYNKRZ</p>
                  </div>

                  <div className="rounded-xl border border-indigo-100 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber">Duration</p>
                    <p className="mt-1 text-sm font-medium text-black">2 Full Days (08:30 – 17:00 each day)</p>
                  </div>

                  <div className="rounded-xl border border-indigo-100 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400">Format</p>
                    <p className="mt-1 text-sm font-medium text-black">In-person, interactive workshop</p>
                  </div>

                  <div className="rounded-xl border border-indigo-100 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400">Investment</p>
                    <p className="mt-1 text-2xl font-bold text-amber-400">KES 45,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Overview */}
      <section id="overview" className="relative overflow-hidden bg-white py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
                Programme Overview
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-black md:text-4xl">
              From Numbers to Strategy
            </h2>

            <div className="mt-6 space-y-6 text-lg leading-relaxed text-indigo-900/70">
              <p>
                This programme is designed for non-finance managers, directors, and entrepreneurs
                who need to make financially informed decisions every day, without being accountants.
              </p>

              <p>
                Grounded in the FPO Method™, the programme bridges the gap between financial
                statements and strategic action, helping leaders understand the numbers that drive
                business performance.
              </p>

              <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/30 to-white p-6 mt-6">
                <p className="text-lg font-medium text-black italic">
                  "Leaders who understand the numbers make better decisions, build stronger teams,
                  and grow sustainable businesses."
                </p>
                <p className="mt-2 text-sm text-indigo-900/60">— Reena Gore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives & Takeaways */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50/30 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Programme Objectives */}
            <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10">
              <div className="flex items-center gap-3 mb-6">
                
                <h2 className="font-serif text-2xl font-bold text-black">
                  Programme Objectives
                </h2>
              </div>

              <div className="space-y-4">
                {objectives.map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD700]/10">
                      <svg className="h-2.5 w-2.5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-base leading-relaxed text-indigo-900/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What Participants Receive */}
            <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10">
              <div className="flex items-center gap-3 mb-6">
                
                
                <h2 className="font-serif text-2xl font-bold text-black">
                  What You'll Receive
                </h2>
              </div>

              <div className="space-y-4">
                {takeaways.map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD700]/10">
                      <svg className="h-2.5 w-2.5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-base leading-relaxed text-indigo-900/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Outline */}
      <section className="relative overflow-hidden bg-white py-8 lg:py-15">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
             
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
                Programme Outline
              </p>
            </div>
            <h2 className="font-serif text-2xl font-bold text-black md:text-4xl">
              What You'll Learn
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Day 1 */}
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                  <span className="text-lg font-bold text-[#FFD700]">01</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-black">Day 1</h3>
              </div>

              <div className="space-y-3">
                {day1Topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                    </span>
                    <p className="text-sm text-indigo-900/70">{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Day 2 */}
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                  <span className="text-lg font-bold text-[#FFD700]">02</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-black">Day 2</h3>
              </div>

              <div className="space-y-3">
                {day2Topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                    </span>
                    <p className="text-sm text-indigo-900/70">{topic}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilitator Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50/30 to-white py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
               
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
                  About the Facilitator
                </p>
              </div>

              <h2 className="font-serif text-3xl font-bold text-black md:text-4xl">
                Reena Gore
              </h2>

              <div className="mt-6 space-y-6 text-lg leading-relaxed text-indigo-900/70">
                <p>
                  Reena Gore brings over 20 years of experience as a CFO and operations executive
                  across manufacturing and packaging sectors in Kenya and Africa.
                </p>

                <p>
                  She has coached 50+ CEOs scaling their businesses and is the creator of the FPO Method™.
                </p>

                <p>
                  Her strength lies in translating complex financial concepts into practical strategies
                  that non-finance leaders can apply immediately.
                </p>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute -left-4 -top-4">
                <div className="h-16 w-16 border-l-4 border-t-4 border-[#FFD700]/30"></div>
              </div>
              <div className="absolute -right-4 -bottom-4">
                <div className="h-16 w-16 border-r-4 border-b-4 border-[#FFD700]/30"></div>
              </div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-[#FFD700]/20 shadow-2xl">
                <img
                  src="/assets/11.jpeg"
                  alt="Reena Gore"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-black py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>

        <div className="relative mx-auto max-w-7xl px-4 text-center md:px-6">
          <span className="inline-block rounded-full bg-[#FFD700]/20 px-4 py-1.5 text-xs font-medium text-[#FFD700] backdrop-blur-sm mb-4">
            Ready to Join?
          </span>
          
          <h2 className="font-serif text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Move from reading numbers to using them as a leadership advantage.
          </h2>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-200">
            Secure your place in the programme and take the next step toward stronger
            financial confidence and strategic leadership.
          </p>
          
          <div className="mt-10">
            <button
              type="button"
              onClick={() => setOpenCheckout(true)}
              className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Register and Pay
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}