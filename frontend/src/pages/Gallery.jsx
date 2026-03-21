import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPublicLandingPageBySlug } from "../services/landingPage.service";

export default function GalleryLandingPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await getPublicLandingPageBySlug(slug);
        const item = res?.data || null;

        if (item?.type === "gallery") {
          setPage(item);
        } else {
          setPage(null);
        }
      } catch (error) {
        console.error("Failed to fetch gallery landing page:", error);
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
            alt="Gallery Not Found"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center md:px-6">
          <div className="rounded-3xl border border-indigo-100 bg-white/80 p-10 backdrop-blur-sm shadow-lg">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-10 w-10 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h1 className="font-serif text-3xl font-bold text-black">
              Gallery page not found
            </h1>
            <p className="mt-4 text-indigo-900/70">
              The gallery you are looking for is unavailable or has not been published.
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
  const eyebrow = page?.hero?.eyebrow || "Event Gallery";
  const headline = page?.hero?.headline || page?.title;
  const subheadline = page?.hero?.subheadline || "";
  const ctaText = page?.hero?.ctaText || "Contact Us";
  const ctaLink = page?.hero?.ctaLink || "/contact";

  const eventDate = page?.galleryDetails?.eventDate
    ? new Date(page.galleryDetails.eventDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : "";
  const location = page?.galleryDetails?.location || "";
  const videoEmbedUrl = page?.galleryDetails?.videoEmbedUrl || "";
  const galleryImages = Array.isArray(page?.galleryDetails?.galleryImages)
    ? page.galleryDetails.galleryImages
    : [];
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <div className="bg-white">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage.url}
              alt="Gallery full view"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

              {/* Event Details Cards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
                {eventDate && (
                  <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 transition-all hover:border-[#FFD700]">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Event Date</p>
                    <p className="mt-2 text-base font-semibold text-white">{eventDate}</p>
                  </div>
                )}

                {location && (
                  <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 transition-all hover:border-[#FFD700]">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Location</p>
                    <p className="mt-2 text-base font-semibold text-white">{location}</p>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={ctaLink}
                  target={ctaLink.startsWith("http") ? "_blank" : "_self"}
                  rel={ctaLink.startsWith("http") ? "noreferrer" : undefined}
                  className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-3 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {ctaText}
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                </a>

                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-[#FFD700] hover:bg-white/20 hover:shadow-lg hover:shadow-[#FFD700]/10"
                >
                  Enquire About This Event
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{page.title}</h3>
                    <p className="mt-2 text-sm text-gray-300">Relive the moments from this special event</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Event Recap Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Recap Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#FFD700]"></div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                  Event Recap
                </p>
              </div>

              <div
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-black prose-p:text-indigo-900/70 prose-strong:text-black"
                dangerouslySetInnerHTML={{
                  __html:
                    page.description ||
                    "<p>Gallery details and event recap will be shared here soon.</p>",
                }}
              />
            </div>

            {/* Gallery Snapshot Card */}
            <div className="relative">
              <div className="absolute -right-4 -top-4">
                <div className="h-20 w-20 border-r-4 border-t-4 border-[#FFD700]/30"></div>
              </div>
              <div className="absolute -bottom-4 -left-4">
                <div className="h-20 w-20 border-b-4 border-l-4 border-[#FFD700]/30"></div>
              </div>
              
              <div className="relative rounded-3xl border border-indigo-100 bg-white/80 p-6 backdrop-blur-sm shadow-lg">
                <h2 className="font-serif text-xl font-semibold text-black">
                  Gallery Snapshot
                </h2>

                <div className="mt-6 space-y-4">
                  {eventDate && (
                    <div className="rounded-2xl border border-indigo-100 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Date</p>
                      <p className="mt-2 text-sm font-medium text-black">{eventDate}</p>
                    </div>
                  )}

                  {location && (
                    <div className="rounded-2xl border border-indigo-100 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Location</p>
                      <p className="mt-2 text-sm font-medium text-black">{location}</p>
                    </div>
                  )}

                  <div className="rounded-2xl border border-indigo-100 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]">Media Count</p>
                    <p className="mt-2 text-sm font-medium text-black">
                      {galleryImages.length} image{galleryImages.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                <a
                  href={ctaLink}
                  target={ctaLink.startsWith("http") ? "_blank" : "_self"}
                  rel={ctaLink.startsWith("http") ? "noreferrer" : undefined}
                  className="group mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-900 to-black px-5 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                >
                  <span className="flex items-center gap-2">
                    {ctaText}
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Video */}
      {videoEmbedUrl && (
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50/30 to-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-8 max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#FFD700]"></div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                  Highlight Video
                </p>
              </div>
              <h2 className="font-serif text-3xl font-bold text-black">
                Watch the experience
              </h2>
            </div>

            <div className="overflow-hidden rounded-3xl border border-indigo-100 bg-black shadow-xl">
              <div className="aspect-video w-full">
                <iframe
                  src={videoEmbedUrl}
                  title={page.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#FFD700]"></div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                Photo Gallery
              </p>
            </div>
            <h2 className="font-serif text-3xl font-bold text-black">
              Moments from the event
            </h2>
          </div>

          {galleryImages.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <div
                  key={`${image.url}-${index}`}
                  className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#FFD700]/10 hover:-translate-y-1"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <img
                    src={image.url}
                    alt={`${page.title} gallery ${index + 1}`}
                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="rounded-full bg-black/60 p-2 backdrop-blur-sm">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-12 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>
              <div className="relative">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD700]/10">
                  <svg className="h-10 w-10 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-black">
                  Gallery images coming soon
                </h3>
                <p className="mt-3 text-sm text-indigo-900/70">
                  Event visuals will appear here once uploaded.
                </p>
              </div>
            </div>
          )}
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
            Want to host or document something similar?
          </span>

          <h2 className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Start a conversation about your event, collaboration, or recap needs.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-200">
            Reach out if you want to discuss future events, speaking,
            partnerships, or media coverage opportunities.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={ctaLink}
              target={ctaLink.startsWith("http") ? "_blank" : "_self"}
              rel={ctaLink.startsWith("http") ? "noreferrer" : undefined}
              className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                {ctaText}
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
            </a>

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