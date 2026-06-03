import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getAdminProducts,
} from "../../services/product.service";

export default function AdminProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await getAdminProducts();
      setProducts(res.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setDeleteConfirm(null);
      await fetchProducts();
    } catch (error) {
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

  const filteredProducts = products.filter((product) => {
    const matchesStatus = filterStatus === "all" || product.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = 
      product.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = products.reduce((acc, product) => {
    const status = product.status?.toLowerCase() || 'unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const formatCurrency = (amount, currency = "KES") => {
    return `${currency} ${amount?.toLocaleString() || 0}`;
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Details Modal */}
      {showDetailsModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
            <button
              onClick={() => setShowDetailsModal(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-500 hover:text-gray-700 transition-colors shadow-md"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="relative border-b border-indigo-100 bg-gradient-to-r from-white to-indigo-50/30 p-6">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] to-indigo-900"></div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                    <svg className="h-6 w-6 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-black">
                      {selectedProduct.title}
                    </h2>
                    <p className="text-sm text-indigo-900/60">
                      Product Details
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Product Information */}
                <div className="rounded-xl border border-indigo-100 bg-white p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FFD700] mb-4">
                    Product Information
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs text-indigo-900/50">Product Title</p>
                      <p className="font-medium text-black">{selectedProduct.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-indigo-900/50">Status</p>
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(selectedProduct.status)}`}>
                        {selectedProduct.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-indigo-900/50">Price</p>
                      <p className="font-semibold text-[#FFD700]">
                        {formatCurrency(selectedProduct.cost, selectedProduct.currency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-indigo-900/50">Format</p>
                      <p className="text-black">{selectedProduct.format?.toUpperCase() || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-indigo-900/50">Payment Status</p>
                      <p className="text-black">{selectedProduct.paymentEnabled ? "Enabled" : "Disabled"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-indigo-900/50">Featured</p>
                      <p className="text-black">{selectedProduct.featured ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>

                {/* Cover Image */}
                {selectedProduct.coverImage?.url && (
                  <div className="rounded-xl border border-indigo-100 bg-white p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FFD700] mb-4">
                      Cover Image
                    </h3>
                    <img 
                      src={selectedProduct.coverImage.url} 
                      alt={selectedProduct.title}
                      className="w-full max-h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Description */}
                {selectedProduct.description && (
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <h3 className="font-semibold text-black">Description</h3>
                    </div>
                    <div 
                      className="text-sm leading-relaxed text-indigo-900/70 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
                    />
                  </div>
                )}

                {/* Download Information */}
                {selectedProduct.downloadUrl && (
                  <div className="rounded-xl border border-indigo-100 bg-white p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FFD700] mb-4">
                      Download Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-indigo-900/50">File Name</p>
                        <p className="text-sm text-black">{selectedProduct.downloadFileName || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-indigo-900/50">Download URL</p>
                        <a href={selectedProduct.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#FFD700] hover:underline break-all">
                          {selectedProduct.downloadUrl}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submission Date */}
                <div className="rounded-xl border border-indigo-100 bg-white p-4">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs font-medium text-indigo-900/50">Created On</p>
                  </div>
                  <p className="mt-1 text-sm text-black">
                    {new Date(selectedProduct.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-indigo-100 bg-indigo-50/30 p-4 flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="rounded-xl border border-indigo-200 bg-white px-6 py-2 text-sm font-medium text-indigo-900 transition-all hover:border-[#FFD700] hover:text-[#FFD700]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header with golden accent */}
      <div className="relative">
        <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pl-6">
          <div>
            <h2 className="font-serif text-3xl font-bold text-black">
              Digital{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#FFD700]">Products</span>
                <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
              </span>
            </h2>
            <p className="mt-2 text-indigo-900/70">
              Manage paid digital products and offerings
            </p>
          </div>

          <Link
            to="/admin/products/new"
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

      {/* Status Filters */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFilterStatus("all")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
            filterStatus === "all"
              ? "bg-gradient-to-r from-[#FFD700] to-[#FFD700]/90 text-black shadow-md shadow-[#FFD700]/20"
              : "border border-indigo-200 bg-white text-indigo-900/70 hover:border-[#FFD700] hover:text-[#FFD700]"
          }`}
        >
          All ({products.length})
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

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by product title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-indigo-200 bg-white py-3 pl-10 pr-4 text-sm text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
        />
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-indigo-100 bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-6 w-64 rounded bg-indigo-100"></div>
                  <div className="mt-2 h-4 w-48 rounded bg-indigo-100"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-10 w-16 rounded bg-indigo-100"></div>
                  <div className="h-10 w-16 rounded bg-indigo-100"></div>
                </div>
              </div>
            </div>
          ))
        ) : filteredProducts.length === 0 ? (
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
                : "Get started by creating your first digital product"}
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
          filteredProducts.map((product) => (
            <div
              key={product._id}
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
                            {product.title}
                          </h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(product.status)}`}>
                            {product.status}
                          </span>
                          {product.paymentEnabled && (
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                              Payments On
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-indigo-900/60">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formatCurrency(product.cost, product.currency)}
                          </span>
                          {product.format && (
                            <>
                              <span className="text-indigo-200">•</span>
                              <span className="flex items-center gap-1 text-indigo-900/60">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {product.format.toUpperCase()}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Featured badge */}
                        {product.featured && (
                          <div className="mt-3">
                            <span className="inline-flex items-center gap-1 text-xs text-[#FFD700]">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Featured Product
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-[#FFD700]"
                      title="View Details"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-[#FFD700]"
                      title="Edit product"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>

                    {deleteConfirm === product._id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(product._id)}
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
                        onClick={() => setDeleteConfirm(product._id)}
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
                    Created: {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                  {product.paymentEnabled && (
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
      {!loading && filteredProducts.length > 0 && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-indigo-900/60">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-indigo-900/40">
                {filteredProducts.filter(p => p.status === 'published').length} published • 
                {filteredProducts.filter(p => p.status === 'draft').length} draft
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}