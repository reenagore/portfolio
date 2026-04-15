import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPublicEventBySlug } from "../services/events.service";
import EventCheckoutModal from "../components/events/EventCheckout";

export default function EventLandingPage() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCheckout, setOpenCheckout] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await getPublicEventBySlug(slug);
        setItem(res.data || null);
      } catch (error) {
        console.error("Failed to fetch event:", error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [slug]);

  if (loading) {
    return (
      <section className="relative min-h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-[#FFD700] animate-spin"></div>
          </div>
          <p className="mt-4 text-indigo-900/60">Loading event details...</p>
        </div>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="relative min-h-[60vh] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Event Not Found"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center md:px-6">
          <div className="rounded-3xl border border-indigo-100 bg-white/80 p-10 backdrop-blur-sm shadow-lg">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-10 w-10 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h1 className="font-serif text-3xl font-bold text-black">
              Event not found
            </h1>
            <p className="mt-4 text-indigo-900/70">
              The event you are looking for could not be found.
            </p>
            <Link
              to="/events"
              className="group relative mt-6 inline-flex overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Back to Events
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white">
      <EventCheckoutModal
        isOpen={openCheckout}
        onClose={() => setOpenCheckout(false)}
        eventTitle={item.title}
        amount={item.cost}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
            <span className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></span>
        </div>



        

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#FFD700]/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-900/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-9xl px-4 py-25 md:px-6 lg:py-25">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content - Details */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/20 backdrop-blur-sm">
                  <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                  Featured Event
                </p>
              </div>

              <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                {item.title}
              </h1>

              {/* Event Details Cards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
                {item.date && (
                  <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 transition-all hover:border-[#FFD700]">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Date</p>
                    <p className="mt-2 text-base font-semibold text-white">{formatDate(item.date)}</p>
                  </div>
                )}

                {item.time && (
                  <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 transition-all hover:border-[#FFD700]">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Time</p>
                    <p className="mt-2 text-base font-semibold text-white">{item.time}</p>
                  </div>
                )}

                {item.location && (
                  <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 transition-all hover:border-[#FFD700]">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Location</p>
                    <p className="mt-2 text-base font-semibold text-white">{item.location}</p>
                  </div>
                )}

                <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 transition-all hover:border-[#FFD700]">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Investment</p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {Number(item.cost) > 0 ? `KES ${item.cost.toLocaleString()}` : "Free Event"}
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex gap-2">
                {item.paymentEnabled && Number(item.cost) > 0 ? (
                  <button
                    type="button"
                    onClick={() => setOpenCheckout(true)}
                    className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-3 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                  >
                    <span className="relative z-10 flex text-xs font-light items-center gap-2">
                      Secure Your Spot
                      
                    </span>
                    <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                  </button>
                 ) : (
                  <Link
                    to="/contact"
                    className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-3 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Register Interest
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                  </Link>
                )}

                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-[#FFD700] hover:bg-white/20 hover:shadow-lg hover:shadow-[#FFD700]/10"
                >
                  Ask a Question
                  {/* <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg> */}
                </Link>
              </div>
            </div>

            {/* Right Content - Cover Image */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              {item.coverImage?.url ? (
                <div className="relative w-full max-w-md lg:max-w-full">
                  {/* Decorative elements around image */}
                  <div className="absolute -left-4 -top-4 z-0">
                    <div className="h-16 w-16 border-l-4 border-t-4 border-[#FFD700]/30"></div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 z-0">
                    <div className="h-16 w-16 border-r-4 border-b-4 border-[#FFD700]/30"></div>
                  </div>
                  
                  {/* Image Container */}
                  <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={item.coverImage.url}
                      alt={item.title}
                      className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {/* Gradient overlay for better blending */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-4 rounded-full bg-[#FFD700]/20 blur-2xl"></div>
                  <div className="relative overflow-hidden rounded-2xl border border-indigo-200 bg-white/10 backdrop-blur-sm p-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD700]/20">
                      <svg className="h-10 w-10 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-300">Join us for this exclusive event</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-9xl px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-[#FFD700]"></div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                Event Details
              </p>
            </div>

            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-black prose-p:text-indigo-900/70 prose-strong:text-black prose-a:text-[#FFD700] prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: item.description || "<p>Event details will be shared here soon.</p>" }}
            />
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
            Secure Your Spot
          </span>
          
          <h2 className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Ready to transform your business?
          </h2>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-200">
            Don't miss this opportunity to gain valuable insights and connect with like-minded leaders.
          </p>
          
          <div className="mt-10">
            {item.paymentEnabled && Number(item.cost) > 0 ? (
              <button
                type="button"
                onClick={() => setOpenCheckout(true)}
                className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Register Now
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </button>
            ) : (
              <Link
                to="/contact"
                className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Register Interest
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}