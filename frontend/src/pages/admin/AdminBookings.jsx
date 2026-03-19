import { useEffect, useState } from "react";
import {
  getAdminBookings,
  updateBookingStatus,
} from "../../services/booking.service";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await getAdminBookings();
      setBookings(res.data || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      await updateBookingStatus(id, { status });
      await fetchBookings();
    } catch (error) {
      console.error("Failed to update booking:", error);
    } finally {
      setUpdatingId("");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-blue-100 text-blue-700 border-blue-200",
      reviewed: "bg-purple-100 text-purple-700 border-purple-200",
      contacted: "bg-amber-100 text-amber-700 border-amber-200",
      scheduled: "bg-indigo-100 text-indigo-700 border-indigo-200",
      closed: "bg-emerald-100 text-emerald-700 border-emerald-200",
      archived: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return colors[status] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesSearch = 
      booking.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = bookings.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header with golden accent */}
      <div className="relative">
        <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
        <div className="pl-6">
          <h2 className="font-serif text-3xl font-bold text-black">
            Consultation{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#FFD700]">Bookings</span>
              <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
            </span>
          </h2>
          <p className="mt-2 text-indigo-900/70">
            Manage and track all consultation requests
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <button
          onClick={() => setFilterStatus("all")}
          className={`relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 hover:shadow-lg ${
            filterStatus === "all"
              ? "border-[#FFD700] bg-gradient-to-br from-[#FFD700]/10 to-transparent"
              : "border-indigo-100 bg-white hover:border-indigo-200"
          }`}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-indigo-900/50">Total</p>
          <p className="mt-1 text-2xl font-bold text-black">{bookings.length}</p>
          <span className="absolute right-2 top-2 text-xs text-indigo-900/30">all</span>
        </button>
        
        {["new", "reviewed", "contacted", "scheduled", "closed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 hover:shadow-lg ${
              filterStatus === status
                ? "border-[#FFD700] bg-gradient-to-br from-[#FFD700]/10 to-transparent"
                : "border-indigo-100 bg-white hover:border-indigo-200"
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-indigo-900/50 capitalize">{status}</p>
            <p className="mt-1 text-2xl font-bold text-black">{statusCounts[status] || 0}</p>
            <span className={`absolute right-2 top-2 h-2 w-2 rounded-full ${
              status === "new" ? "bg-blue-500" :
              status === "reviewed" ? "bg-purple-500" :
              status === "contacted" ? "bg-amber-500" :
              status === "scheduled" ? "bg-indigo-500" :
              "bg-emerald-500"
            }`}></span>
          </button>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-indigo-200 bg-white py-3 pl-10 pr-4 text-sm text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-indigo-900/50">
            {filteredBookings.length} {filteredBookings.length === 1 ? 'booking' : 'bookings'} found
          </span>
          {filterStatus !== "all" && (
            <button
              onClick={() => setFilterStatus("all")}
              className="rounded-lg border border-indigo-200 px-3 py-2 text-xs text-indigo-900/60 hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-lg shadow-indigo-900/5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-indigo-100 bg-indigo-50/50">
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-indigo-900/60">Name</th>
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-indigo-900/60">Service</th>
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-indigo-900/60">Email</th>
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-indigo-900/60">Status</th>
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-indigo-900/60">Created</th>
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
                      <div className="h-4 w-36 rounded bg-indigo-100"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-20 rounded bg-indigo-100"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 rounded bg-indigo-100"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-8 w-16 rounded bg-indigo-100"></div>
                    </td>
                  </tr>
                ))
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="rounded-full bg-indigo-50 p-4">
                        <svg className="h-8 w-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="mt-4 text-sm text-indigo-900/60">No bookings found</p>
                      {filterStatus !== "all" && (
                        <button
                          onClick={() => setFilterStatus("all")}
                          className="mt-2 text-xs text-[#FFD700] hover:underline"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr 
                    key={booking._id} 
                    className="group transition-colors hover:bg-indigo-50/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700]/20 to-indigo-900/20">
                          <span className="text-xs font-semibold text-black">
                            {booking.fullName?.charAt(0) || "?"}
                          </span>
                        </div>
                        <span className="font-medium text-black">{booking.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-indigo-900/80">{booking.service}</span>
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={`mailto:${booking.email}`}
                        className="text-indigo-600 hover:text-[#FFD700] transition-colors"
                      >
                        {booking.email}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                          disabled={updatingId === booking._id}
                          className={`rounded-lg border px-3 py-2 text-sm font-medium appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 ${getStatusColor(booking.status)}`}
                          style={{ paddingRight: '2rem' }}
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="contacted">Contacted</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="closed">Closed</option>
                          <option value="archived">Archived</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                          <svg className="h-4 w-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        {updatingId === booking._id && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#FFD700] border-t-transparent"></div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-indigo-900/60">
                          {new Date(booking.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusChange(booking._id, 'archived')}
                        className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-[#FFD700]"
                        title="Archive"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer with Pagination (placeholder) */}
        <div className="border-t border-indigo-100 bg-indigo-50/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-indigo-900/50">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs text-indigo-900/60 transition-colors hover:border-[#FFD700] hover:text-[#FFD700]">
                Previous
              </button>
              <button className="rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs text-indigo-900/60 transition-colors hover:border-[#FFD700] hover:text-[#FFD700]">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}