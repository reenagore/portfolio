import { Link } from "react-router-dom";

export default function InsightCard({ article }) {
  const coverImage = article?.coverImage?.url || "";
  const excerpt =
    article?.excerpt ||
    "Read this article for deeper insights into systems, leadership, and sustainable business growth.";

  const getCategoryColor = (category) => {
    const colors = {
      "Financial Systems & Cashflow": "from-amber-500 to-orange-500",
      "Leadership & Decision-Making": "from-indigo-600 to-indigo-800",
      "Operations & Efficiency": "from-[#FFD700] to-amber-600",
      "SME Growth Strategy": "from-emerald-500 to-teal-600",
      "Market & Economic Insights": "from-purple-500 to-pink-600",
    };
    return colors[category] || "from-indigo-600 to-indigo-800";
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/20">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-900 to-black">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD700]/20">
                <svg className="h-8 w-8 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v8H7v-8z" />
                </svg>
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFD700]">
                Insight Article
              </p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        {article.category && (
          <div className="absolute left-3 top-3">
            <span className={`inline-block rounded-full bg-gradient-to-r ${getCategoryColor(article.category)} px-3 py-1.5 text-xs font-bold text-white shadow-lg`}>
              {article.category}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {article.featured && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFD700] px-3 py-1.5 text-xs font-bold text-black">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              FEATURED
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="relative p-6">
        {/* Article Meta */}
        <div className="flex items-center gap-2 text-xs text-indigo-900/50">
          {article.readTime && (
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readTime} min read
            </span>
          )}
          {article.tags && article.tags.length > 0 && (
            <>
              <span>•</span>
              <span className="truncate max-w-[150px]">{article.tags[0]}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="mt-3 font-serif text-xl font-semibold leading-snug text-black line-clamp-2 group-hover:text-[#FFD700] transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="mt-3 text-sm leading-relaxed text-indigo-900/70 line-clamp-3">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-indigo-100 pt-4">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-indigo-900/50">
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                : "Draft"}
            </span>
          </div>

          <Link
            to={`/insights/${article.slug}`}
            className="group/btn relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-900 to-black px-4 py-2 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Read Article
              <svg className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></div>
          </Link>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
    </article>
  );
}