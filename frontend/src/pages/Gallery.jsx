import { useEffect, useState } from "react";
import { getPublicEventGalleries } from "../services/eventGallery.service";
import { Link } from "react-router-dom";
import GalleryHero from "../components/events/GalleryHero";
export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getPublicEventGalleries();
        setItems(res.data || []);
      } catch (error) {
        console.error("Failed to fetch previous events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <GalleryHero/>

      {/* Gallery Grid Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-indigo-100 bg-white/80 overflow-hidden">
                  <div className="h-56 bg-indigo-100"></div>
                  <div className="p-6">
                    <div className="h-6 w-3/4 rounded bg-indigo-100"></div>
                    <div className="mt-3 h-4 w-1/2 rounded bg-indigo-100"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white/50 p-12 text-center">
              <div className="rounded-full bg-indigo-50 p-4">
                <svg className="h-12 w-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-black">No previous events yet</h3>
              <p className="mt-2 text-sm text-indigo-900/60">
                Check back soon to see moments from our past events.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item, index) => (
                <div
                  key={item._id}
                  className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 backdrop-blur-sm shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    {item.coverImage?.url ? (
                      <img
                        src={item.coverImage.url}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-900 to-black">
                        <div className="text-center">
                          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD700]/20">
                            <svg className="h-8 w-8 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFD700]">
                            Event Gallery
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Image count badge */}
                    {item.images && item.images.length > 0 && (
                      <div className="absolute right-3 top-3 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1">
                        <span className="text-xs font-medium text-white">
                          📷 {item.images.length}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Title */}
                    <h2 className="font-serif text-xl font-semibold leading-snug text-black group-hover:text-[#FFD700] transition-colors line-clamp-2">
                      {item.title}
                    </h2>

                    {/* Event Date */}
                    {item.eventDate && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-indigo-900/70">
                        <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(item.eventDate)}</span>
                      </div>
                    )}

                    {/* Image count indicator */}
                    {item.images && item.images.length > 0 && (
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {item.images.slice(0, 3).map((image, idx) => (
                            <div
                              key={idx}
                              className="h-8 w-8 rounded-full border-2 border-white bg-cover bg-center shadow-sm"
                              style={{ backgroundImage: `url(${image.url})` }}
                            ></div>
                          ))}
                        </div>
                        <span className="text-xs text-indigo-900/50">
                          {item.images.length} photo{item.images.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Optional */}
      {!loading && items.length > 0 && (
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-black py-16 lg:py-20">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>

          <div className="relative mx-auto max-w-7xl px-4 text-center md:px-6">
            <span className="inline-block rounded-full bg-[#FFD700]/20 px-4 py-1.5 text-xs font-medium text-[#FFD700] backdrop-blur-sm mb-4">
              Want to Be Part of Future Events?
            </span>
            
            <h2 className="font-serif text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Join us at our next event
            </h2>
            
            <p className="mx-auto mt-6 max-w-2xl md:text-lg text-sm leading-relaxed text-indigo-200">
              Subscribe to our newsletter to stay updated about upcoming events, programmes, and workshops.
            </p>
            
            <Link
              to="/contact"
              className="mt-8 inline-block rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] px-8 py-3 text-sm font-light text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
            >
              Contact Us Today
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}