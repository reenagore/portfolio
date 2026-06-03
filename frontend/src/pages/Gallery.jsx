import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicGalleries } from "../services/galleryPage.service";

export default function Galleries() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await getPublicGalleries();
        setGalleries(res.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-white">
        {/* Background decorative elements */}
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

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-6 lg:py-15">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
                Gallery
              </p>
            </div>

            
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-20 lg:py-24">
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-indigo-100 bg-white/80 overflow-hidden">
                  <div className="aspect-[4/3] bg-indigo-100"></div>
                  <div className="p-6">
                    <div className="h-6 w-3/4 rounded bg-indigo-100"></div>
                    <div className="mt-3 space-y-2">
                      <div className="h-4 w-full rounded bg-indigo-100"></div>
                      <div className="h-4 w-5/6 rounded bg-indigo-100"></div>
                      <div className="h-4 w-4/6 rounded bg-indigo-100"></div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="h-4 w-20 rounded bg-indigo-100"></div>
                      <div className="h-4 w-24 rounded bg-indigo-100"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : galleries.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white/50 p-12 text-center">
              <div className="rounded-full bg-indigo-50 p-4">
                <svg className="h-12 w-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-black">No galleries available</h3>
              <p className="mt-2 text-sm text-indigo-900/60">Check back soon for new photo collections.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {galleries.map((gallery, index) => (
                <Link
                  key={gallery._id}
                  to={`/galleries/${gallery.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 backdrop-blur-sm shadow-lg shadow-indigo-900/5 transition-all duration-500 hover:-translate-y-2 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  
                  {/* Image Section */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={gallery.coverImage?.url}
                      alt={gallery.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Image count badge */}
                    <div className="absolute right-3 top-3 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1">
                      <span className="text-xs font-medium text-white">
                        📷 {gallery.images?.length || 0}
                      </span>
                    </div>
                    {/* Golden overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    <h2 className="font-serif text-xl font-semibold leading-snug text-black group-hover:text-[#FFD700] transition-colors line-clamp-2">
                      {gallery.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-indigo-900/70">
                      {gallery.description
                        ?.replace(/<[^>]+>/g, "")
                        .substring(0, 140)}
                      {gallery.description?.length > 140 ? "..." : ""}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-indigo-100 pt-4">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
                        </svg>
                        <span className="text-xs text-indigo-900/50">
                          {gallery.images?.length || 0} Photos
                        </span>
                      </div>

                      <span className="flex items-center gap-1 text-sm font-medium text-[#FFD700] transition-all duration-300 group-hover:gap-2">
                        View Gallery
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-500 group-hover:w-full"></div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}