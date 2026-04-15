import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicEvents } from "../services/events.service";
import EventHero from "../components/events/EventHero";

export default function Events() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getPublicEvents();
        setItems(res.data || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBD";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white">
      <EventHero/>
      

      {/* Events Grid Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-9xl px-4 md:px-6">
          {/* Search Bar */}
          <div className="mb-10 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search events by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-indigo-200 bg-white py-3 pl-10 pr-4 text-sm text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
              />
            </div>
          </div>

          {loading ? (
            // Loading skeletons
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-indigo-100 bg-white/80 p-6">
                  <div className="h-56 w-full rounded-xl bg-indigo-100"></div>
                  <div className="mt-4 h-6 w-3/4 rounded bg-indigo-100"></div>
                  <div className="mt-2 h-4 w-1/2 rounded bg-indigo-100"></div>
                  <div className="mt-2 h-4 w-1/3 rounded bg-indigo-100"></div>
                  <div className="mt-4 h-10 w-24 rounded bg-indigo-100"></div>
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white/50 p-12 text-center">
              <div className="rounded-full bg-indigo-50 p-4">
                <svg className="h-12 w-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-black">No events found</h3>
              <p className="mt-2 text-sm text-indigo-900/60">
                {searchTerm ? "Try adjusting your search term" : "Check back soon for upcoming events"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-sm text-[#FFD700] hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item, index) => (
                <article
                  key={item._id}
                  className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden rounded-xl">
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFD700]">
                            Event
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Price Badge */}
                    <div className="absolute right-3 top-3">
                      <span className={`rounded-full px-3 py-1.5 text-xs font-bold text-white ${
                        Number(item.cost) > 0 ? "bg-[#FFD700] text-black" : "bg-emerald-500"
                      }`}>
                        {Number(item.cost) > 0 ? `KES ${item.cost.toLocaleString()}` : "FREE"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative mt-5">
                    {/* Title */}
                    <h2 className="font-serif text-xl font-semibold leading-snug text-black group-hover:text-[#FFD700] transition-colors">
                      {item.title}
                    </h2>

                    {/* Event Details */}
                    <div className="mt-4 space-y-2">
                      {item.date && (
                        <div className="flex items-center gap-2 text-sm text-indigo-900/70">
                          <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(item.date)}</span>
                        </div>
                      )}
                      
                      {item.location && (
                        <div className="flex items-center gap-2 text-sm text-indigo-900/70">
                          <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={`/events/${item.slug}`}
                      className="group/btn mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-900 to-black px-5 py-2.5 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        View Event
                        <svg className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></div>
                    </Link>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      
    
    </div>
  );
}