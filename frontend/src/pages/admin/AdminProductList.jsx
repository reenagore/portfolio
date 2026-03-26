import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getAdminProducts,
} from "../../services/product.service";

export default function AdminProductsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await getAdminProducts();
      setItems(res.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setDeleteConfirm(null);
      await fetchItems();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      published: "bg-emerald-100 text-emerald-700 border-emerald-200",
      draft: "bg-amber-100 text-amber-700 border-amber-200",
      archived: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return colors[status?.toLowerCase()] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  const filteredItems = items.filter((item) => {
    const matchesStatus = filterStatus === "all" || item.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = items.reduce((acc, item) => {
    const status = item.status?.toLowerCase() || 'unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const formatCurrency = (amount, currency = "KES") => {
    return `${currency} ${amount?.toLocaleString() || 0}`;
  };

  return (
    <div className="space-y-6">
      {/* Header with golden accent */}
      <div className="relative">
        <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pl-6">
          <div>
            <h2 className="font-serif text-3xl font-bold text-black">
              Product{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#FFD700]">Landing Pages</span>
                <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
              </span>
            </h2>
            <p className="mt-2 text-indigo-900/70">
              Manage product landing pages and digital offerings
            </p>
          </div>

          <Link
            to="/admin/landing-pages/products/new"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-3 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              New Product
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
            All ({items.length})
          </button>
          {["published", "draft", "archived"].map((status) => (
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
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-indigo-200 bg-white py-2 pl-10 pr-4 text-sm text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 lg:w-64"
          />
        </div>
      </div>

      {/* Products List */}
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
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white p-12">
            <div className="rounded-full bg-indigo-50 p-4">
              <svg className="h-12 w-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold text-black">No products found</h3>
            <p className="mt-2 text-sm text-indigo-900/60">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your filters or search term" 
                : "Get started by creating your first product landing page"}
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
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#FFD700]/10"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              <div className="relative">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      {/* Product Icon */}
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/10 to-indigo-900/10">
                        <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-serif text-lg font-semibold text-black">
                            {item.title}
                          </h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          {item.paymentEnabled && (
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                              Payments On
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                          {item.price !== undefined && (
                            <span className="flex items-center gap-1 text-indigo-900/60">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {formatCurrency(item.price, item.currency || "KES")}
                            </span>
                          )}
                          {item.deliveryType && (
                            <>
                              <span className="text-indigo-200">•</span>
                              <span className="flex items-center gap-1 text-indigo-900/60">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {item.deliveryType}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Short description preview */}
                        {item.description && (
                          <p className="mt-3 text-sm text-indigo-900/60 line-clamp-1">
                            {item.description.replace(/<[^>]*>/g, '').substring(0, 100)}
                            {item.description.length > 100 ? "..." : ""}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/landing-pages/products/${item._id}/edit`}
                      className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-[#FFD700]"
                      title="Edit product"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    
                    <a
                      href={`/product/${item.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-[#FFD700]"
                      title="View live page"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>

                    {deleteConfirm === item._id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(item._id)}
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
                        onClick={() => setDeleteConfirm(item._id)}
                        className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-red-100 hover:text-red-600"
                        title="Delete product"
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
                    Created: {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  {item.paymentEnabled && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Payment enabled
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))
        )}
      </div>

      {/* Summary Footer */}
      {!loading && filteredItems.length > 0 && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-indigo-900/60">
              Showing {filteredItems.length} of {items.length} products
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-indigo-900/40">
                {filteredItems.filter(i => i.status === 'published').length} published • 
                {filteredItems.filter(i => i.status === 'draft').length} draft
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}