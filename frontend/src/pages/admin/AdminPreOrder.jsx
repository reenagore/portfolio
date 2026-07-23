import { useEffect, useState } from "react";
import {
  getAdminBookPreorders,
  updateBookPreorderStatus,
} from "../../services/preoder.service";

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "reviewed", label: "Reviewed", color: "bg-purple-100 text-purple-700" },
  { value: "confirmed", label: "Confirmed", color: "bg-emerald-100 text-emerald-700" },
  { value: "fulfilled", label: "Fulfilled", color: "bg-green-100 text-green-700" },
  { value: "archived", label: "Archived", color: "bg-slate-100 text-slate-700" },
];

const paymentStatusOptions = [
  { value: "pending", label: "Pending", color: "bg-amber-100 text-amber-700" },
  { value: "paid", label: "Paid", color: "bg-emerald-100 text-emerald-700" },
  { value: "failed", label: "Failed", color: "bg-red-100 text-red-700" },
];

export default function AdminBookPreorders() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  const fetchItems = async ({
    searchValue = search,
    statusValue = statusFilter,
    paymentValue = paymentFilter,
  } = {}) => {
    try {
      setLoading(true);
      const res = await getAdminBookPreorders();
      let allItems = res.data || [];

      if (searchValue.trim()) {
        const query = searchValue.trim().toLowerCase();
        allItems = allItems.filter((item) => {
          return (
            item.fullName?.toLowerCase().includes(query) ||
            item.email?.toLowerCase().includes(query) ||
            item.company?.toLowerCase().includes(query) ||
            item.bookTitle?.toLowerCase().includes(query) ||
            item.paymentReference?.toLowerCase().includes(query)
          );
        });
      }

      if (statusValue) {
        allItems = allItems.filter((item) => item.status === statusValue);
      }

      if (paymentValue) {
        allItems = allItems.filter((item) => item.paymentStatus === paymentValue);
      }

      setItems(allItems);
    } catch (error) {
      console.error("Failed to fetch book pre-orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialItems = async () => {
      try {
        setLoading(true);
        const res = await getAdminBookPreorders();
        setItems(res.data || []);
      } catch (error) {
        console.error("Failed to fetch book pre-orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialItems();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchItems();
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPaymentFilter("");
    fetchItems({ searchValue: "", statusValue: "", paymentValue: "" });
  };

  const handleStatusUpdate = async (id, nextStatus, currentPaymentStatus) => {
    try {
      setUpdatingId(id);
      await updateBookPreorderStatus(id, {
        status: nextStatus,
        paymentStatus: currentPaymentStatus,
      });

      setItems((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status: nextStatus,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update preorder status:", error);
      alert(error.response?.data?.message || "Failed to update preorder status");
    } finally {
      setUpdatingId("");
    }
  };

  const handlePaymentStatusUpdate = async (id, currentStatus, nextPaymentStatus) => {
    try {
      setUpdatingId(id);
      await updateBookPreorderStatus(id, {
        status: currentStatus,
        paymentStatus: nextPaymentStatus,
      });

      setItems((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                paymentStatus: nextPaymentStatus,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update payment status:", error);
      alert(error.response?.data?.message || "Failed to update payment status");
    } finally {
      setUpdatingId("");
    }
  };

  const statusCounts = items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  const paymentCounts = items.reduce((acc, item) => {
    acc[item.paymentStatus] = (acc[item.paymentStatus] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header with golden accent */}
      <div className="relative">
        <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
        <div className="pl-6">
          <h2 className="font-serif text-3xl font-bold text-black">
            Book{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#FFD700]">Pre-orders</span>
              <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
            </span>
          </h2>
          <p className="mt-2 text-indigo-900/70">
            Review and manage pre-orders for Decoding Business for Growth
          </p>
        </div>
      </div>

      {/* Status Stats - Order Status */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => {
            setStatusFilter("");
            fetchItems({
              searchValue: search,
              statusValue: "",
              paymentValue: paymentFilter,
            });
          }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
            statusFilter === ""
              ? "bg-gradient-to-r from-[#FFD700] to-[#FFD700]/90 text-black shadow-md shadow-[#FFD700]/20"
              : "border border-indigo-200 bg-white text-indigo-900/70 hover:border-[#FFD700] hover:text-[#FFD700]"
          }`}
        >
          All Orders ({items.length})
        </button>
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              setStatusFilter(option.value);
              fetchItems({
                searchValue: search,
                statusValue: option.value,
                paymentValue: paymentFilter,
              });
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all duration-200 ${
              statusFilter === option.value
                ? "bg-gradient-to-r from-[#FFD700] to-[#FFD700]/90 text-black shadow-md shadow-[#FFD700]/20"
                : "border border-indigo-200 bg-white text-indigo-900/70 hover:border-[#FFD700] hover:text-[#FFD700]"
            }`}
          >
            {option.label} ({statusCounts[option.value] || 0})
          </button>
        ))}
      </div>

      {/* Payment Status Stats */}
      <div className="flex flex-wrap gap-3">
        {paymentStatusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              setPaymentFilter(option.value);
              fetchItems({
                searchValue: search,
                statusValue: statusFilter,
                paymentValue: option.value,
              });
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all duration-200 ${
              paymentFilter === option.value
                ? "bg-gradient-to-r from-[#FFD700] to-[#FFD700]/90 text-black shadow-md shadow-[#FFD700]/20"
                : "border border-indigo-200 bg-white text-indigo-900/70 hover:border-[#FFD700] hover:text-[#FFD700]"
            }`}
          >
            {option.label} Payment ({paymentCounts[option.value] || 0})
          </button>
        ))}
      </div>

      {/* Search and Filter Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="rounded-2xl border border-indigo-100 bg-white/80 p-5 backdrop-blur-sm shadow-lg shadow-indigo-900/5"
      >
        <div className="grid gap-4 md:grid-cols-[1fr_140px_auto]">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, company, book, or payment reference..."
              className="w-full rounded-xl border border-indigo-200 bg-white py-3 pl-10 pr-4 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-4 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Search
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
          </button>

          {/* Clear Filters Button */}
          {(search || statusFilter || paymentFilter) && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-3 text-sm font-medium text-indigo-900 transition-all hover:border-[#FFD700] hover:text-[#FFD700]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters
            </button>
          )}
        </div>
      </form>

      {/* Pre-orders List */}
      <div className="space-y-4">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-indigo-100 bg-white p-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-32 rounded bg-indigo-100"></div>
                    <div className="h-5 w-16 rounded bg-indigo-100"></div>
                    <div className="h-5 w-20 rounded bg-indigo-100"></div>
                  </div>
                  <div className="mt-2 h-5 w-48 rounded bg-indigo-100"></div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="h-4 w-32 rounded bg-indigo-100"></div>
                    <div className="h-4 w-32 rounded bg-indigo-100"></div>
                    <div className="h-4 w-32 rounded bg-indigo-100"></div>
                    <div className="h-4 w-32 rounded bg-indigo-100"></div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:w-[420px]">
                  <div className="h-12 rounded bg-indigo-100"></div>
                  <div className="h-12 rounded bg-indigo-100"></div>
                </div>
              </div>
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white p-12">
            <div className="rounded-full bg-indigo-50 p-4">
              <svg className="h-12 w-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold text-black">No pre-orders found</h3>
            <p className="mt-2 text-sm text-indigo-900/60">
              {search || statusFilter || paymentFilter ? "Try adjusting your filters" : "Pre-orders will appear here once submitted"}
            </p>
            {(search || statusFilter || paymentFilter) && (
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-[#FFD700] hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          items.map((item) => {
            const statusBadge = statusOptions.find(s => s.value === item.status) || { label: item.status, color: "bg-slate-100 text-slate-700" };
            const paymentBadge = paymentStatusOptions.find(s => s.value === item.paymentStatus) || { label: item.paymentStatus, color: "bg-slate-100 text-slate-700" };
            
            return (
              <div
                key={item._id}
                className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#FFD700]/10"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                <div className="relative flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  {/* Left Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* User Avatar */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                        <span className="font-serif text-sm font-semibold text-black">
                          {item.fullName?.charAt(0) || "?"}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-black">
                          {item.fullName}
                        </h3>
                        <p className="text-sm text-indigo-900/60">
                          {item.bookTitle}
                        </p>
                      </div>
                      
                      {/* Status Badges */}
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${paymentBadge.color}`}>
                        Payment: {paymentBadge.label}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-black">Email:</span>
                        <a href={`mailto:${item.email}`} className="text-indigo-900/70 hover:text-[#FFD700] transition-colors">
                          {item.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="font-medium text-black">Phone:</span>
                        <span className="text-indigo-900/70">{item.phone || "—"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="font-medium text-black">Company:</span>
                        <span className="text-indigo-900/70">{item.company || "—"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-black">Quantity:</span>
                        <span className="text-indigo-900/70">{item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-black">Amount:</span>
                        <span className="font-semibold text-[#FFD700]">KES {item.amount?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        <span className="font-medium text-black">Payment Ref:</span>
                        <span className="font-mono text-xs text-indigo-900/70 truncate max-w-[150px]">
                          {item.paymentReference || "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 md:col-span-2">
                        <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-black">Submitted:</span>
                        <span className="text-indigo-900/70">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Update Controls */}
                  <div className="grid gap-4 md:grid-cols-2 xl:w-[420px] xl:grid-cols-1">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                        Update order status
                      </label>
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            item._id,
                            e.target.value,
                            item.paymentStatus
                          )
                        }
                        disabled={updatingId === item._id}
                        className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all disabled:opacity-50"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                        Update payment status
                      </label>
                      <select
                        value={item.paymentStatus}
                        onChange={(e) =>
                          handlePaymentStatusUpdate(
                            item._id,
                            item.status,
                            e.target.value
                          )
                        }
                        disabled={updatingId === item._id}
                        className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all disabled:opacity-50"
                      >
                        {paymentStatusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {updatingId === item._id && (
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-[#FFD700] border-t-transparent"></div>
                        <p className="text-xs text-indigo-900/50">Updating...</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary Footer */}
      {!loading && items.length > 0 && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-indigo-900/60">
              Showing {items.length} pre-order{items.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-indigo-900/40">
                Total Value: KES {items.reduce((sum, item) => sum + (item.amount || 0), 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
