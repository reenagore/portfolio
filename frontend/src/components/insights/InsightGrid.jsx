import InsightCard from "./InsightCard";

export default function InsightsGrid({ articles, loading }) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-lg shadow-indigo-900/5"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0"></div>
            
            {/* Image skeleton with article icon */}
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-indigo-900/20 to-black/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 animate-pulse rounded-full bg-indigo-200/50"></div>
              </div>
              {/* Article pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat'
                }}
              ></div>
            </div>

            {/* Content skeleton */}
            <div className="relative p-6">
              {/* Meta skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 animate-pulse rounded-full bg-indigo-100"></div>
                <div className="h-4 w-4 animate-pulse rounded-full bg-indigo-100"></div>
                <div className="h-4 w-20 animate-pulse rounded-full bg-indigo-100"></div>
              </div>

              {/* Title skeleton */}
              <div className="mt-4 space-y-2">
                <div className="h-6 w-3/4 animate-pulse rounded bg-indigo-100"></div>
                <div className="h-6 w-1/2 animate-pulse rounded bg-indigo-100"></div>
              </div>

              {/* Description skeleton */}
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-indigo-50"></div>
                <div className="h-4 w-5/6 animate-pulse rounded bg-indigo-50"></div>
                <div className="h-4 w-4/6 animate-pulse rounded bg-indigo-50"></div>
              </div>

              {/* Footer skeleton */}
              <div className="mt-6 flex items-center justify-between">
                <div className="h-4 w-24 animate-pulse rounded bg-indigo-100"></div>
                <div className="h-8 w-24 animate-pulse rounded-lg bg-indigo-100"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-12 text-center shadow-lg">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 h-32 w-32">
          <div className="absolute top-0 right-0 h-16 w-16 border-r-4 border-t-4 border-[#FFD700]/30"></div>
        </div>
        <div className="absolute bottom-0 left-0 h-32 w-32">
          <div className="absolute bottom-0 left-0 h-16 w-16 border-b-4 border-l-4 border-[#FFD700]/30"></div>
        </div>
        
        <div className="relative">
          {/* Article icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD700]/10">
            <svg className="h-10 w-10 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v8H7v-8z" />
            </svg>
          </div>
          
          <h3 className="font-serif text-2xl font-bold text-black">
            No articles found
          </h3>
          
          <p className="mx-auto mt-3 max-w-md text-indigo-900/70">
            Try changing the filters or search term. If no articles have been
            published yet, they will appear here once available.
          </p>

          {/* Suggested actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="group inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm text-indigo-900 transition-all hover:border-[#FFD700] hover:text-[#FFD700]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article, index) => (
        <div
          key={article._id}
          className="animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <InsightCard article={article} />
        </div>
      ))}
    </div>
  );
}

// Add this to your global CSS file
/*
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}
*/