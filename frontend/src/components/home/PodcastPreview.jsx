import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicPodcasts } from "../../services/podcast.service";

export default function PodcastPreview() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingEpisode, setPlayingEpisode] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await getPublicPodcasts({
          limit: 3,
        });

        setEpisodes(res?.data || []);
      } catch (error) {
        console.error("Failed to fetch podcast preview:", error);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-indigo-900/5 blur-3xl"></div>
        
        {/* Sound wave pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10v40M10 20v20M50 20v20M20 5v50M40 5v50' stroke='%23334155' stroke-width='0.5' fill='none' stroke-opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-5 md:px-6 lg:py-15">
        {/* Header Section */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="relative max-w-3xl">
            {/* Decorative line */}
            <div className="absolute -left-4 top-0 h-20 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
            
            <div className="pl-2">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/10">
                  <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-900/60">
                  Podcast Preview
                </p>
              </div>

              <h2 className="font-serif text-2xl font-bold leading-tight text-black md:text-3xl">
                Conversations that translate complex business challenges{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#FFD700]">into practical clarity</span>
                 
                </span>
                .
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-indigo-900/70">
                The podcast extends Reena's authority through honest conversations
                on financial systems, leadership discipline, operational strain,
                and the realities of scaling SMEs.
              </p>
            </div>
          </div>

          <Link
            to="/podcast"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-indigo-200 bg-white/80 px-6 py-4 text-sm font-medium text-indigo-900 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:text-[#FFD700] hover:shadow-lg hover:shadow-[#FFD700]/10"
          >
            <span className="relative z-10 flex items-center gap-2">
              Visit Podcast Hub
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
          </Link>
        </div>

        {/* Episodes Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-indigo-100 bg-white/80 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-200"></div>
                  <div className="h-4 w-24 rounded bg-indigo-200"></div>
                </div>
                <div className="mt-6 h-6 w-3/4 rounded bg-indigo-200"></div>
                <div className="mt-2 h-6 w-1/2 rounded bg-indigo-200"></div>
                <div className="mt-6 space-y-2">
                  <div className="h-4 w-full rounded bg-indigo-100"></div>
                  <div className="h-4 w-5/6 rounded bg-indigo-100"></div>
                  <div className="h-4 w-4/6 rounded bg-indigo-100"></div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="h-4 w-20 rounded bg-indigo-200"></div>
                  <div className="h-8 w-24 rounded bg-indigo-200"></div>
                </div>
              </div>
            ))
          ) : episodes.length > 0 ? (
            episodes.map((episode, index) => {
              const youtubeId = episode.platform?.toLowerCase() === 'youtube' && episode.embedUrl 
                ? getYouTubeId(episode.embedUrl) 
                : null;

              return (
                <div
                  key={episode._id}
                  className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  
                  {/* Episode Header */}
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                        <span className={
                          episode.platform?.toLowerCase() === 'youtube' ? 'text-red-500' :
                          episode.platform?.toLowerCase() === 'spotify' ? 'text-green-500' :
                          episode.platform?.toLowerCase() === 'apple' ? 'text-purple-500' :
                          'text-[#FFD700]'
                        }>
                          {getPlatformIcon(episode.platform)}
                        </span>
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-900/50">
                        {episode.platform || "Unleash and Thrive"}
                      </p>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold leading-snug text-black">
                      {episode.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-indigo-900/70 line-clamp-3">
                      {episode.summary ||
                        "Listen to this episode for deeper insights into business systems, leadership, and growth."}
                    </p>

                    {/* Episode Meta */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        </span>
                        <span className="text-xs text-indigo-900/40">New episode</span>
                      </div>

                      {youtubeId ? (
                        // YouTube Play Button
                        <button
                          onClick={() => setPlayingEpisode(playingEpisode === episode._id ? null : episode._id)}
                          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-lg hover:shadow-red-600/20"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          {playingEpisode === episode._id ? 'Close Player' : 'Play Now'}
                        </button>
                      ) : (
                        // Other platforms link
                        <a
                          href={episode.embedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:gap-3"
                        >
                          Listen on {episode.platform}
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>

                    {/* YouTube Player */}
                    {youtubeId && playingEpisode === episode._id && (
                      <div className="mt-6 animate-slideDown overflow-hidden rounded-xl border border-indigo-200">
                        <div className="relative pt-[56.25%]">
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                            title={episode.title}
                            className="absolute left-0 top-0 h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
                </div>
              );
            })
          ) : (
            <div className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-12 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>
                
                <div className="relative">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD700]/10">
                    <svg className="h-10 w-10 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  
                  <h3 className="mt-6 font-serif text-2xl font-semibold text-black">
                    Podcast episodes coming soon
                  </h3>
                  
                  <p className="mx-auto mt-3 max-w-md text-indigo-900/70">
                    Fresh conversations on finance, leadership, systems, and SME growth
                    will appear here once published.
                  </p>

                  <div className="mt-8 flex items-center justify-center gap-4">
                    <span className="flex items-center gap-2 text-sm text-indigo-900/50">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD700] opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD700]"></span>
                      </span>
                      Subscribe to be notified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Podcast Stats */}
        {!loading && episodes.length > 0 && (
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-indigo-100 bg-white/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-black">Weekly episodes</p>
                <p className="text-xs text-indigo-900/50">New insights every week</p>
              </div>
            </div>
            
            <div className="h-8 w-px bg-indigo-200"></div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-black">Industry leaders</p>
                <p className="text-xs text-indigo-900/50">Featuring expert guests</p>
              </div>
            </div>
            
            <div className="h-8 w-px bg-indigo-200"></div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-black">100+ episodes</p>
                <p className="text-xs text-indigo-900/50">And growing every month</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
    </section>
  );
}

// Add this to your global CSS file
/*
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideDown {
  animation: slideDown 0.3s ease-out;
}
*/