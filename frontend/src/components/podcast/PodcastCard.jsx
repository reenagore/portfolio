export default function PodcastCard({ episode }) {
    const thumbnail = episode?.thumbnail?.url || "";
    const platform = episode?.platform || "podcast";
    const summary =
      episode?.summary ||
      "Listen to this episode for practical insights on systems, leadership, and sustainable growth.";
  
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
  
    const getPlatformColor = (platform) => {
      switch(platform?.toLowerCase()) {
        case 'youtube': return 'text-red-500';
        case 'spotify': return 'text-green-500';
        case 'apple': return 'text-purple-500';
        default: return 'text-[#FFD700]';
      }
    };
  
    return (
      <article className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/20">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        
        {/* Thumbnail Section */}
        <div className="relative h-52 overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={episode.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-900 to-black">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD700]/20">
                  <svg className="h-8 w-8 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFD700]">
                  Unleash and Thrive
                </p>
              </div>
            </div>
          )}
          
          {/* Platform Badge */}
          <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5">
            <span className={getPlatformColor(platform)}>
              {getPlatformIcon(platform)}
            </span>
            <span className="text-xs font-medium capitalize text-white">{platform}</span>
          </div>
  
          {/* Featured Badge */}
          {episode.featured && (
            <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#FFD700] to-amber-600 px-3 py-1.5">
              <span className="text-xs font-bold text-black">FEATURED</span>
            </div>
          )}
        </div>
  
        {/* Content Section */}
        <div className="relative p-6">
          {/* Episode Meta */}
          <div className="flex items-center gap-2 text-xs text-indigo-900/50">
            {episode.duration && (
              <span className="flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {episode.duration}
              </span>
            )}
            {episode.episodeNumber && (
              <>
                <span>•</span>
                <span>Episode {episode.episodeNumber}</span>
              </>
            )}
          </div>
  
          {/* Title */}
          <h2 className="mt-3 font-serif text-xl font-semibold leading-snug text-black group-hover:text-[#FFD700] transition-colors">
            {episode.title}
          </h2>
  
          {/* Summary */}
          <p className="mt-3 text-sm leading-relaxed text-indigo-900/70 line-clamp-2">
            {summary}
          </p>
  
          {/* Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-indigo-100 pt-4">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-indigo-900/50">
                {episode.publishedAt
                  ? new Date(episode.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : "Unpublished"}
              </span>
            </div>
  
            {episode.embedUrl ? (
              <a
                href={episode.embedUrl}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-900 to-black px-4 py-2 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Listen Now
                  <svg className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></div>
              </a>
            ) : (
              <span className="text-sm font-medium text-indigo-300">
                Coming Soon
              </span>
            )}
          </div>
        </div>
  
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
      </article>
    );
  }