import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePodcast, getAdminPodcasts } from "../../services/podcast.service";

export default function AdminPodcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchPodcasts = async () => {
    try {
      const res = await getAdminPodcasts();
      setPodcasts(res.data || []);
    } catch (error) {
      console.error("Failed to fetch podcasts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePodcast(id);
      setDeleteConfirm(null);
      await fetchPodcasts();
    } catch (error) {
      console.error("Failed to delete podcast:", error);
      alert(error.response?.data?.message || "Failed to delete podcast episode");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      published: "bg-emerald-100 text-emerald-700 border-emerald-200",
      draft: "bg-amber-100 text-amber-700 border-amber-200",
      scheduled: "bg-purple-100 text-purple-700 border-purple-200",
      archived: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return colors[status?.toLowerCase()] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getPlatformIcon = (platform) => {
    switch(platform?.toLowerCase()) {
      case 'youtube':
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'spotify':
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.14-1.26 9.479-.6 13.08 1.56.36.24.479.78.239 1.26zm.12-3.48c-3.84-2.28-10.14-2.52-13.8-1.38-.6.18-1.26-.18-1.44-.78-.18-.6.18-1.26.78-1.44 4.14-1.26 11.28-1.02 15.6 1.56.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
          </svg>
        );
      case 'apple':
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.69 3.56-1.702z"/>
          </svg>
        );
      default:
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "—";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const filteredPodcasts = podcasts.filter((podcast) => {
    const matchesStatus = filterStatus === "all" || podcast.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesPlatform = filterPlatform === "all" || podcast.platform?.toLowerCase() === filterPlatform.toLowerCase();
    const matchesSearch = 
      podcast.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.platform?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPlatform && matchesSearch;
  });

  const statusCounts = podcasts.reduce((acc, podcast) => {
    const status = podcast.status?.toLowerCase() || 'unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const platformCounts = podcasts.reduce((acc, podcast) => {
    const platform = podcast.platform?.toLowerCase() || 'other';
    acc[platform] = (acc[platform] || 0) + 1;
    return acc;
  }, {});

  const platforms = [...new Set(podcasts.map(p => p.platform).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Header with golden accent */}
      <div className="relative">
        <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pl-6">
          <div>
            <h2 className="font-serif text-3xl font-bold text-black">
              Podcast{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#FFD700]">Episodes</span>
                <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
              </span>
            </h2>
            <p className="mt-2 text-indigo-900/70">
              Manage your podcast episodes across all platforms
            </p>
          </div>

          <Link
            to="/admin/podcasts/new"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-3 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              New Episode
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
          </Link>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {/* Status Filters */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm text-indigo-900 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
          >
            <option value="all">All Status ({podcasts.length})</option>
            <option value="published">Published ({statusCounts.published || 0})</option>
            <option value="draft">Draft ({statusCounts.draft || 0})</option>
            <option value="scheduled">Scheduled ({statusCounts.scheduled || 0})</option>
            <option value="archived">Archived ({statusCounts.archived || 0})</option>
          </select>

          {/* Platform Filters */}
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm text-indigo-900 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
          >
            <option value="all">All Platforms</option>
            {platforms.map(platform => (
              <option key={platform} value={platform.toLowerCase()}>
                {platform} ({platformCounts[platform?.toLowerCase()] || 0})
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search episodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-indigo-200 bg-white py-2 pl-10 pr-4 text-sm text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 lg:w-64"
          />
        </div>
      </div>

      {/* Episodes List */}
      <div className="space-y-4">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-indigo-100 bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-6 w-64 rounded bg-indigo-100"></div>
                  <div className="mt-2 h-4 w-32 rounded bg-indigo-100"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-10 w-16 rounded bg-indigo-100"></div>
                  <div className="h-10 w-16 rounded bg-indigo-100"></div>
                </div>
              </div>
            </div>
          ))
        ) : filteredPodcasts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white p-12">
            <div className="rounded-full bg-indigo-50 p-4">
              <svg className="h-12 w-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold text-black">No episodes found</h3>
            <p className="mt-2 text-sm text-indigo-900/60">
              {searchTerm || filterStatus !== "all" || filterPlatform !== "all"
                ? "Try adjusting your filters or search term"
                : "Get started by creating your first podcast episode"}
            </p>
            {(searchTerm || filterStatus !== "all" || filterPlatform !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                  setFilterPlatform("all");
                }}
                className="mt-4 text-sm text-[#FFD700] hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          filteredPodcasts.map((episode) => (
            <div
              key={episode._id}
              className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#FFD700]/10"
            >
              {/* Decorative gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              <div className="relative">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  {/* Episode Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      {/* Platform Icon */}
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/10 to-indigo-900/10">
                        <span className={episode.platform === 'youtube' ? 'text-red-500' : 
                                        episode.platform === 'spotify' ? 'text-green-500' : 
                                        episode.platform === 'apple' ? 'text-purple-500' : 
                                        'text-[#FFD700]'}>
                          {getPlatformIcon(episode.platform)}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-serif text-lg font-semibold text-black">
                            {episode.title}
                          </h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(episode.status)}`}>
                            {episode.status}
                          </span>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                          <span className="flex items-center gap-1 text-indigo-900/60">
                            {getPlatformIcon(episode.platform)}
                            <span className="capitalize">{episode.platform}</span>
                          </span>
                          
                          {episode.duration && (
                            <>
                              <span className="text-indigo-200">•</span>
                              <span className="flex items-center gap-1 text-indigo-900/60">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formatDuration(episode.duration)}
                              </span>
                            </>
                          )}
                          
                          {episode.episodeNumber && (
                            <>
                              <span className="text-indigo-200">•</span>
                              <span className="flex items-center gap-1 text-indigo-900/60">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                </svg>
                                Ep. {episode.episodeNumber}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Summary preview */}
                        {episode.summary && (
                          <p className="mt-2 text-sm text-indigo-900/60 line-clamp-2">
                            {episode.summary}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/podcasts/${episode._id}/edit`}
                      className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-[#FFD700]"
                      title="Edit episode"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    
                    {episode.embedUrl && (
                      <a
                        href={episode.embedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-[#FFD700]"
                        title="Play episode"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </a>
                    )}

                    {deleteConfirm === episode._id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(episode._id)}
                          className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-red-700"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="rounded-lg border border-indigo-200 px-3 py-2 text-xs font-medium text-indigo-900/60 transition-colors hover:border-indigo-300"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(episode._id)}
                        className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-red-100 hover:text-red-600"
                        title="Delete episode"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Metadata Footer */}
                <div className="mt-4 flex items-center gap-4 border-t border-indigo-100 pt-4 text-xs text-indigo-900/40">
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(episode.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  
                  {episode.featured && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#FFD700]">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Featured
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom gradient line on hover */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))
        )}
      </div>

      {/* Summary Footer */}
      {!loading && filteredPodcasts.length > 0 && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-indigo-900/60">
              Showing {filteredPodcasts.length} of {podcasts.length} episodes
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-indigo-900/40">
                Total listening time: {formatDuration(podcasts.reduce((acc, p) => acc + (parseInt(p.duration) || 0), 0))}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}