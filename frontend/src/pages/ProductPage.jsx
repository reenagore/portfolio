import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPublicLandingPageBySlug } from "../services/events.service";
import PurchaseModal from "../components/common/PurchaseModal";

export default function ProductLandingPage() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const { slug } = useParams();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await getPublicLandingPageBySlug(slug);
        const item = res?.data || null;

        if (item?.type === "product") {
          setPage(item);
        } else {
          setPage(null);
        }
      } catch (err) {
        console.error("Failed to fetch product landing page:", err);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
          <div className="rounded-3xl border border-indigo-100 bg-white/80 p-8 backdrop-blur-sm shadow-lg">
            <div className="h-4 w-32 animate-pulse rounded bg-indigo-100"></div>
            <div className="mt-5 h-10 w-full max-w-3xl animate-pulse rounded bg-indigo-100"></div>
            <div className="mt-3 h-10 w-2/3 animate-pulse rounded bg-indigo-100"></div>
            <div className="mt-6 h-5 w-full max-w-2xl animate-pulse rounded bg-indigo-50"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!page) {
    return (
      <section className="relative min-h-[60vh] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Product Not Found"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center md:px-6">
          <div className="rounded-3xl border border-indigo-100 bg-white/80 p-10 backdrop-blur-sm shadow-lg">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-10 w-10 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <h1 className="font-serif text-3xl font-bold text-black">
              Product page not found
            </h1>
            <p className="mt-4 text-indigo-900/70">
              The product you are looking for is unavailable or has not been published.
            </p>
            <Link
              to="/"
              className="group relative mt-6 inline-flex overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Return Home
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

  const heroImage = page?.hero?.coverImage?.url || "";
  const eyebrow = page?.hero?.eyebrow || "Product";
  const headline = page?.hero?.headline || page?.title;
  const subheadline = page?.hero?.subheadline || "";
  const paymentLabel =
    page?.productDetails?.paymentLabel || page?.hero?.ctaText || "Buy Now";
  const price = Number(page?.productDetails?.price || 0);
  const currency = page?.productDetails?.currency || "KES";
  const deliveryType = page?.productDetails?.deliveryType || "";
  const paymentEnabled = Boolean(page?.productDetails?.paymentEnabled);
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <div className="bg-white">
      <PurchaseModal
        isOpen={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        productTitle={page.title}
        amount={price}
        currency={currency}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          {heroImage ? (
            <>
              <img
                src={heroImage}
                alt={page.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-black"></div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#FFD700]/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-900/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/20 backdrop-blur-sm">
                  <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                  {eyebrow}
                </p>
              </div>

              <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                {headline}
              </h1>

              {subheadline && (
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
                  {subheadline}
                </p>
              )}

              {/* Product Details Cards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
                <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 transition-all hover:border-[#FFD700]">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Price</p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {currency} {price.toLocaleString()}
                  </p>
                </div>

                {deliveryType && (
                  <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 transition-all hover:border-[#FFD700]">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Delivery</p>
                    <p className="mt-2 text-base font-semibold text-white">{deliveryType}</p>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                {paymentEnabled ? (
                  <button
                    type="button"
                    onClick={() => setPurchaseOpen(true)}
                    className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-3 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {paymentLabel}
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                  </button>
                ) : (
                  <Link
                    to="/contact"
                    className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-3 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Enquire Now
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
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            {!heroImage && (
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-4 rounded-full bg-[#FFD700]/20 blur-2xl"></div>
                  <div className="relative overflow-hidden rounded-2xl border border-indigo-200 bg-white/10 backdrop-blur-sm p-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD700]/20">
                      <svg className="h-10 w-10 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{page.title}</h3>
                    <p className="mt-2 text-sm text-gray-300">Transform your business with this offering</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Overview Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#FFD700]"></div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                  Product Overview
                </p>
              </div>

              <div
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-black prose-p:text-indigo-900/70 prose-strong:text-black prose-a:text-[#FFD700] prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{
                  __html:
                    page.description ||
                    "<p>Product details will be shared here soon.</p>",
                }}
              />
            </div>

            {/* Quick Details Card */}
            <div className="relative">
              <div className="absolute -right-4 -top-4">
                <div className="h-20 w-20 border-r-4 border-t-4 border-[#FFD700]/30"></div>
              </div>
              <div className="absolute -bottom-4 -left-4">
                <div className="h-20 w-20 border-b-4 border-l-4 border-[#FFD700]/30"></div>
              </div>
              
              <div className="relative rounded-3xl border border-indigo-100 bg-white/80 p-6 backdrop-blur-sm shadow-lg">
                <h2 className="font-serif text-xl font-semibold text-black">
                  Quick Details
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-indigo-100 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Price</p>
                    <p className="mt-2 text-sm font-medium text-black">
                      {currency} {price.toLocaleString()}
                    </p>
                  </div>

                  {deliveryType && (
                    <div className="rounded-2xl border border-indigo-100 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Delivery</p>
                      <p className="mt-2 text-sm font-medium text-black">{deliveryType}</p>
                    </div>
                  )}
                </div>

                {paymentEnabled ? (
                  <button
                    type="button"
                    onClick={() => setPurchaseOpen(true)}
                    className="group mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-900 to-black px-5 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                  >
                    <span className="flex items-center gap-2">
                      {paymentLabel}
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                ) : (
                  <Link
                    to="/contact"
                    className="group mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-900 to-black px-5 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                  >
                    <span className="flex items-center gap-2">
                      Enquire Now
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Sections */}
      {sections.length > 0 && (
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50/30 to-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div
                  key={`${section.type}-${index}`}
                  className="relative group overflow-hidden rounded-3xl border border-indigo-100 bg-white p-8 shadow-lg transition-all hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                  
                  <div className="relative">
                    {section.title && (
                      <h2 className="font-serif text-2xl font-semibold text-black">
                        {section.title}
                      </h2>
                    )}

                    {section.subtitle && (
                      <p className="mt-3 text-base leading-relaxed text-indigo-900/70">
                        {section.subtitle}
                      </p>
                    )}

                    {section.content && (
                      <div
                        className="prose prose-lg mt-6 max-w-none prose-headings:font-serif prose-headings:text-black prose-p:text-indigo-900/70"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    )}

                    {Array.isArray(section.items) && section.items.length > 0 && (
                      <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {section.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 p-5 transition-all hover:border-[#FFD700]"
                          >
                            {typeof item === "string" ? (
                              <p className="text-sm leading-relaxed text-indigo-900/70">
                                {item}
                              </p>
                            ) : (
                              <>
                                {item?.title && (
                                  <h3 className="text-lg font-semibold text-black">
                                    {item.title}
                                  </h3>
                                )}
                                {item?.content && (
                                  <p className="mt-2 text-sm leading-relaxed text-indigo-900/70">
                                    {item.content}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-black">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center md:px-6 lg:py-24">
          <span className="inline-block rounded-full bg-[#FFD700]/20 px-4 py-2 text-sm font-medium text-[#FFD700] backdrop-blur-sm mb-6">
            Ready to Purchase?
          </span>

          <h2 className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Take the next step and get access to this offer.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-200">
            Move from interest to action. Complete your payment securely and
            continue from there.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {paymentEnabled ? (
              <button
                type="button"
                onClick={() => setPurchaseOpen(true)}
                className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {paymentLabel}
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
                  Enquire Now
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              </Link>
            )}

            <Link
              to="/contact"
              className="group inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-medium text-white transition-all duration-200 hover:border-[#FFD700] hover:bg-white/20 hover:shadow-lg hover:shadow-[#FFD700]/10"
            >
              Contact Us
              <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}