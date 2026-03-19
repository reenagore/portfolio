import { useEffect, useMemo, useState } from "react";
import { getPublicPodcasts } from "../../services/podcast.service";
import PodcastGrid from "./PodcastGrid";

const platformOptions = [
  { label: "All Platforms", value: "", icon: "🎙️" },
  { label: "YouTube", value: "youtube", icon: "🎥" },
  { label: "Spotify", value: "spotify", icon: "🎵" },
  { label: "Apple", value: "apple", icon: "🎧" },
  { label: "SoundCloud", value: "soundcloud", icon: "☁️" },
  { label: "Other", value: "other", icon: "📻" },
];

export default function PodcastFilters() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCount, setFilteredCount] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    platform: "",
    featured: "",
  });

  const queryParams = useMemo(() => {
    const params = {
      limit: 12,
    };

    if (filters.search.trim()) {
      params.search = filters.search.trim();
    }

    if (filters.platform) {
      params.platform = filters.platform;
    }

    if (filters.featured) {
      params.featured = filters.featured === "true";
    }

    return params;
  }, [filters]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const res = await getPublicPodcasts(queryParams);
        setEpisodes(res?.data || []);
        setFilteredCount(res?.data?.length || 0);
      } catch (error) {
        console.error("Failed to fetch podcast episodes:", error);
        setEpisodes([]);
        setFilteredCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [queryParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      platform: "",
      featured: "",
    });
  };

  const hasActiveFilters = filters.search || filters.platform || filters.featured;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-8 lg:py-10">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-indigo-900/5 blur-3xl"></div>
        
        {/* Sound wave pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10v40M10 20v20M50 20v20M20 5v50M40 5v50' stroke='%23334155' stroke-width='0.5' fill='none' stroke-opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="relative max-w-3xl mb-10">
          <div className="absolute -left-4 top-0 h-16 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
          <div className="pl-6">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-900/60">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-3 w-3 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </span>
              Browse Episodes
            </span>
            <h2 className="mt-2 font-serif text-xl md:text-2xl font-bold text-black">
              Find the right conversation
            </h2>
          </div>
        </div>

        {/* Filters Card */}
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/5">
          {/* Decorative corner */}
          <div className="absolute right-0 top-0 h-20 w-20">
            <div className="absolute right-0 top-0 h-10 w-10 border-r-4 border-t-4 border-[#FFD700]/30"></div>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-900">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search episodes
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleChange}
                  placeholder="Search by title, summary, or description..."
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 pl-10 text-sm text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-900">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                Platform
              </label>
              <select
                name="platform"
                value={filters.platform}
                onChange={handleChange}
                className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-sm text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
              >
                {platformOptions.map((option) => (
                  <option key={option.value || "all"} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Filter */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-900">
                <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Featured
              </label>
              <select
                name="featured"
                value={filters.featured}
                onChange={handleChange}
                className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-sm text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
              >
                <option value="">All Episodes</option>
                <option value="true">Featured Only</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-indigo-100 pt-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD700] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD700]"></span>
              </span>
              <p className="text-sm text-indigo-900/60">
                {loading ? "Loading..." : `Showing ${episodes.length} episodes`}
              </p>
              {hasActiveFilters && (
                <>
                  <span className="text-indigo-200">|</span>
                  <p className="text-xs text-indigo-900/40">
                    Filtered from {filteredCount} total
                  </p>
                </>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="group inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-xs font-medium text-indigo-900 transition-all hover:border-[#FFD700] hover:text-[#FFD700]"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        <PodcastGrid episodes={episodes} loading={loading} />

        {/* Load More (optional - can be implemented later) */}
        {!loading && episodes.length > 0 && episodes.length >= 12 && (
          <div className="mt-10 text-center">
            <button
              className="group inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-6 py-3 text-sm font-medium text-indigo-900 transition-all hover:border-[#FFD700] hover:text-[#FFD700] hover:shadow-lg hover:shadow-[#FFD700]/10"
            >
              Load More Episodes
              <svg className="h-4 w-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7m14-6l-7-7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}