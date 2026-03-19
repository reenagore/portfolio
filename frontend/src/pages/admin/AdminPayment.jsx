import { useEffect, useState } from "react";
import { getAdminPayments } from "../../services/payment.service";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await getAdminPayments();
        setPayments(res.data || []);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
      failed: "bg-red-100 text-red-700 border-red-200",
      refunded: "bg-purple-100 text-purple-700 border-purple-200",
      cancelled: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return colors[status?.toLowerCase()] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed':
        return (
          <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="h-4 w-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'failed':
        return (
          <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'refunded':
        return (
          <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6" />
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesStatus = filterStatus === "all" || payment.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = 
      payment.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Date range filtering
    if (dateRange !== "all" && payment.createdAt) {
      const paymentDate = new Date(payment.createdAt);
      const now = new Date();
      const daysDiff = Math.floor((now - paymentDate) / (1000 * 60 * 60 * 24));
      
      if (dateRange === "today" && daysDiff > 1) return false;
      if (dateRange === "week" && daysDiff > 7) return false;
      if (dateRange === "month" && daysDiff > 30) return false;
    }
    
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = payments
    .filter(p => p.status?.toLowerCase() === 'completed')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const filteredRevenue = filteredPayments
    .filter(p => p.status?.toLowerCase() === 'completed')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const statusCounts = payments.reduce((acc, payment) => {
    const status = payment.status?.toLowerCase() || 'unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header with golden accent */}
      <div className="relative">
        <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
        <div className="pl-6">
          <h2 className="font-serif text-3xl font-bold text-black">
            Payment{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#FFD700]">Transactions</span>
              <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
            </span>
          </h2>
          <p className="mt-2 text-indigo-900/70">
            Monitor and track all payment transactions
          </p>
        </div>
      </div>

      {/* Revenue and Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total Revenue Card */}
        <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-[#FFD700]/5 to-indigo-900/5 p-6 lg:col-span-2">
          <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 translate-y-[-20px] transform">
            <div className="absolute inset-0 rounded-full bg-[#FFD700]/10 blur-2xl"></div>
          </div>
          <p className="text-sm font-medium uppercase tracking-wider text-indigo-900/50">Total Revenue</p>
          <p className="mt-2 text-3xl font-bold text-black">
            KES {totalRevenue.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-indigo-900/40">From all completed transactions</p>
          
          {/* Mini chart/sparkline */}
          <div className="mt-4 flex items-end gap-1 h-8">
            {[40, 65, 45, 70, 55, 80, 65].map((height, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-[#FFD700] to-indigo-500 rounded-t-sm opacity-60"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Status Stats Cards */}
        {["completed", "pending", "failed", "refunded"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`relative overflow-hidden rounded-xl border p-6 text-left transition-all duration-200 hover:shadow-lg ${
              filterStatus === status
                ? "border-[#FFD700] bg-gradient-to-br from-[#FFD700]/10 to-transparent"
                : "border-indigo-100 bg-white hover:border-indigo-200"
            }`}
          >
            <p className="text-sm font-medium uppercase tracking-wider text-indigo-900/50 capitalize">{status}</p>
            <p className="mt-2 text-3xl font-bold text-black">{statusCounts[status] || 0}</p>
            <span className={`absolute right-4 top-4 h-2 w-2 rounded-full ${
              status === "completed" ? "bg-emerald-500" :
              status === "pending" ? "bg-amber-500" :
              status === "failed" ? "bg-red-500" :
              "bg-purple-500"
            }`}></span>
          </button>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by reference, name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-indigo-200 bg-white py-3 pl-10 pr-4 text-sm text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Filter */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-xl border border-indigo-200 bg-white px-4 py-3 text-sm text-indigo-900 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
          >
            <option value="all">All time</option>
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>

          <div className="flex items-center gap-2">
            <span className="text-sm text-indigo-900/50">
              {filteredPayments.length} {filteredPayments.length === 1 ? 'payment' : 'payments'}
            </span>
            {(filterStatus !== "all" || searchTerm || dateRange !== "all") && (
              <button
                onClick={() => {
                  setFilterStatus("all");
                  setSearchTerm("");
                  setDateRange("all");
                }}
                className="rounded-lg border border-indigo-200 px-3 py-2 text-xs text-indigo-900/60 hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-lg shadow-indigo-900/5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-indigo-100 bg-indigo-50/50">
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-indigo-900/60">Reference</th>
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-indigo-900/60">Customer</th>
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-indigo-900/60">Amount</th>
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-indigo-900/60">Status</th>
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-indigo-900/60">Date</th>
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-indigo-900/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-100">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 rounded bg-indigo-100"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 rounded bg-indigo-100"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 rounded bg-indigo-100"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-20 rounded bg-indigo-100"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 rounded bg-indigo-100"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-8 w-16 rounded bg-indigo-100"></div>
                    </td>
                  </tr>
                ))
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="rounded-full bg-indigo-50 p-4">
                        <svg className="h-8 w-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <p className="mt-4 text-sm text-indigo-900/60">No payments found</p>
                      {(filterStatus !== "all" || searchTerm || dateRange !== "all") && (
                        <button
                          onClick={() => {
                            setFilterStatus("all");
                            setSearchTerm("");
                            setDateRange("all");
                          }}
                          className="mt-2 text-xs text-[#FFD700] hover:underline"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr 
                    key={payment._id} 
                    className="group transition-colors hover:bg-indigo-50/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        <span className="font-mono text-sm font-medium text-black">
                          {payment.reference}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                          <span className="text-xs font-semibold text-black">
                            {payment.fullName?.charAt(0) || payment.email?.charAt(0) || "?"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-black">{payment.fullName || "N/A"}</p>
                          {payment.email && (
                            <p className="text-xs text-indigo-900/50">{payment.email}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-black">
                          {payment.currency || "KES"} {payment.amount?.toLocaleString()}
                        </p>
                        {payment.purpose && (
                          <p className="text-xs text-indigo-900/40 capitalize">{payment.purpose.replace('_', ' ')}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <span className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-indigo-900/60">
                          {new Date(payment.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-[#FFD700]"
                          title="View receipt"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-[#FFD700]"
                          title="Download receipt"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Summary */}
        <div className="border-t border-indigo-100 bg-indigo-50/30 px-6 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-xs text-indigo-900/50">
                Showing <span className="font-medium text-black">{filteredPayments.length}</span> of{' '}
                <span className="font-medium text-black">{payments.length}</span> payments
              </p>
              {filteredPayments.length > 0 && (
                <>
                  <span className="hidden text-indigo-200 sm:inline">|</span>
                  <p className="text-xs text-indigo-900/50">
                    Filtered volume:{' '}
                    <span className="font-medium text-black">
                      KES {filteredRevenue.toLocaleString()}
                    </span>
                  </p>
                </>
              )}
            </div>
            
            {/* Pagination */}
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs text-indigo-900/60 transition-colors hover:border-[#FFD700] hover:text-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <span className="text-xs text-indigo-900/40 px-2">Page 1 of 1</span>
              <button className="rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs text-indigo-900/60 transition-colors hover:border-[#FFD700] hover:text-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}