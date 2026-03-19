import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteArticle, getAdminArticles } from "../../services/article.service";

export default function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchArticles = async () => {
    try {
      const res = await getAdminArticles();
      setArticles(res.data || []);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      setDeleteConfirm(null);
      await fetchArticles();
    } catch (error) {
      console.error("Failed to delete article:", error);
      alert(error.response?.data?.message || "Failed to delete article");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      published: "bg-emerald-100 text-emerald-700 border-emerald-200",
      draft: "bg-amber-100 text-amber-700 border-amber-200",
      archived: "bg-slate-100 text-slate-700 border-slate-200",
      reviewed: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return colors[status?.toLowerCase()] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  const filteredArticles = articles.filter((article) => {
    const matchesStatus = filterStatus === "all" || article.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = 
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = articles.reduce((acc, article) => {
    const status = article.status?.toLowerCase() || 'unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header with golden accent */}
      <div className="relative">
        <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pl-6">
          <div>
            <h2 className="font-serif text-3xl font-bold text-black">
              Article{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#FFD700]">Management</span>
                <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
              </span>
            </h2>
            <p className="mt-2 text-indigo-900/70">
              Review and manage your articles
            </p>
          </div>

          <Link
            to="/admin/articles/new"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-3 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              New Article
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
          </Link>
        </div>
      </div>

      {/* Stats and Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              filterStatus === "all"
                ? "bg-gradient-to-r from-[#FFD700] to-[#FFD700]/90 text-black shadow-md shadow-[#FFD700]/20"
                : "border border-indigo-200 bg-white text-indigo-900/70 hover:border-[#FFD700] hover:text-[#FFD700]"
            }`}
          >
            All ({articles.length})
          </button>
          {["published", "draft", "reviewed", "archived"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all duration-200 ${
                filterStatus === status
                  ? "bg-gradient-to-r from-[#FFD700] to-[#FFD700]/90 text-black shadow-md shadow-[#FFD700]/20"
                  : "border border-indigo-200 bg-white text-indigo-900/70 hover:border-[#FFD700] hover:text-[#FFD700]"
              }`}
            >
              {status} ({statusCounts[status] || 0})
            </button>
          ))}
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
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-indigo-200 bg-white py-2 pl-10 pr-4 text-sm text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 lg:w-64"
          />
        </div>
      </div>

      {/* Articles List */}
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
        ) : filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white p-12">
            <div className="rounded-full bg-indigo-50 p-4">
              <svg className="h-12 w-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v8H7v-8z" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold text-black">No articles found</h3>
            <p className="mt-2 text-sm text-indigo-900/60">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your filters or search term" 
                : "Get started by creating your first article"}
            </p>
            {(searchTerm || filterStatus !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="mt-4 text-sm text-[#FFD700] hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div
              key={article._id}
              className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#FFD700]/10"
            >
              {/* Decorative gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              <div className="relative">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  {/* Article Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      {/* Article Icon */}
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/10 to-indigo-900/10">
                        <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v8H7v-8z" />
                        </svg>
                      </div>
                      
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-black">
                          {article.title}
                        </h3>
                        
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(article.status)}`}>
                            {article.status}
                          </span>
                          
                          <span className="text-xs text-indigo-900/50">•</span>
                          
                          <span className="text-xs text-indigo-900/60">
                            {article.category}
                          </span>
                          
                          {article.featured && (
                            <>
                              <span className="text-xs text-indigo-900/50">•</span>
                              <span className="flex items-center gap-1 text-xs text-[#FFD700]">
                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Featured
                              </span>
                            </>
                          )}
                        </div>

                        {/* Excerpt preview */}
                        {article.excerpt && (
                          <p className="mt-2 text-sm text-indigo-900/60 line-clamp-2">
                            {article.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/articles/${article._id}/edit`}
                      className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-[#FFD700]"
                      title="Edit article"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    
                    <Link
                      to={`/articles/${article.slug}`}
                      target="_blank"
                      className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-[#FFD700]"
                      title="View article"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>

                    {deleteConfirm === article._id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(article._id)}
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
                        onClick={() => setDeleteConfirm(article._id)}
                        className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-red-100 hover:text-red-600"
                        title="Delete article"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {new Date(article.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  {article.tags && article.tags.length > 0 && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                        </svg>
                        {article.tags.slice(0, 3).join(', ')}
                        {article.tags.length > 3 && '...'}
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
      {!loading && filteredArticles.length > 0 && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-indigo-900/60">
              Showing {filteredArticles.length} of {articles.length} articles
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-indigo-900/40">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}