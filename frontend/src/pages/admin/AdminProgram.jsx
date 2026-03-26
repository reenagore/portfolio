import { useEffect, useState } from "react";
import {
  getAdminProgramRegistrations,
  updateProgramRegistrationStatus,
} from "../../services/registration.service";

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "reviewed", label: "Reviewed", color: "bg-purple-100 text-purple-700" },
  { value: "contacted", label: "Contacted", color: "bg-amber-100 text-amber-700" },
  { value: "confirmed", label: "Confirmed", color: "bg-emerald-100 text-emerald-700" },
  { value: "archived", label: "Archived", color: "bg-slate-100 text-slate-700" },
];

export default function AdminProgramRegistrations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);

      const res = await getAdminProgramRegistrations({
        ...(search.trim() ? { search: search.trim() } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
      });

      setItems(res.data || []);
    } catch (error) {
      console.error("Failed to fetch program registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      await updateProgramRegistrationStatus(id, { status });

      setItems((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );
      
      // Update selected registration if it's the one being edited
      if (selectedRegistration?._id === id) {
        setSelectedRegistration({ ...selectedRegistration, status });
      }
    } catch (error) {
      console.error("Failed to update registration status:", error);
      alert(
        error.response?.data?.message ||
          "Failed to update registration status"
      );
    } finally {
      setUpdatingId("");
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchItems();
  };

  const handleViewDetails = (registration) => {
    setSelectedRegistration(registration);
    setShowDetailsModal(true);
  };

  const getStatusBadge = (status) => {
    const statusInfo = statusOptions.find(s => s.value === status);
    return statusInfo || { label: status, color: "bg-slate-100 text-slate-700" };
  };

  const statusCounts = items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Details Modal */}
      {showDetailsModal && selectedRegistration && (
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
                    <span className="font-serif text-xl font-semibold text-black">
                      {selectedRegistration.fullName?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-black">
                      {selectedRegistration.fullName}
                    </h2>
                    <p className="text-sm text-indigo-900/60">
                      Registration Details
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Program Info */}
                <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/30 to-white p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h3 className="font-semibold text-black">Program Information</h3>
                  </div>
                  <p className="text-lg font-medium text-black">{selectedRegistration.programTitle}</p>
                  <p className="text-sm text-indigo-900/60 mt-1">
                    Program ID: {selectedRegistration.programSlug}
                  </p>
                </div>

                {/* Contact Details */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-indigo-100 bg-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium text-black">Email Address</p>
                    </div>
                    <a href={`mailto:${selectedRegistration.email}`} className="text-indigo-900/70 hover:text-[#FFD700] transition-colors">
                      {selectedRegistration.email}
                    </a>
                  </div>

                  <div className="rounded-xl border border-indigo-100 bg-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <p className="text-sm font-medium text-black">Phone Number</p>
                    </div>
                    <p className="text-indigo-900/70">{selectedRegistration.phone || "Not provided"}</p>
                  </div>

                  <div className="rounded-xl border border-indigo-100 bg-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <p className="text-sm font-medium text-black">Company / Organization</p>
                    </div>
                    <p className="text-indigo-900/70">{selectedRegistration.company || "Not provided"}</p>
                  </div>

                  <div className="rounded-xl border border-indigo-100 bg-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium text-black">Role / Position</p>
                    </div>
                    <p className="text-indigo-900/70">{selectedRegistration.role || "Not provided"}</p>
                  </div>
                </div>

                {/* Message */}
                {selectedRegistration.message && (
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <h3 className="font-semibold text-black">Additional Message</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-indigo-900/70 whitespace-pre-wrap">
                      {selectedRegistration.message}
                    </p>
                  </div>
                )}

                {/* Status & Date */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-indigo-100 bg-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-medium text-black">Registration Status</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(selectedRegistration.status).color}`}>
                        {getStatusBadge(selectedRegistration.status).label}
                      </span>
                      <select
                        value={selectedRegistration.status}
                        onChange={(e) => handleStatusChange(selectedRegistration._id, e.target.value)}
                        disabled={updatingId === selectedRegistration._id}
                        className="ml-2 rounded-lg border border-indigo-200 bg-white px-3 py-1 text-sm focus:border-[#FFD700] focus:outline-none"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            Change to {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="rounded-xl border border-indigo-100 bg-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium text-black">Registration Date</p>
                    </div>
                    <p className="text-indigo-900/70">
                      {new Date(selectedRegistration.createdAt).toLocaleString()}
                    </p>
                  </div>
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
        <div className="pl-6">
          <h2 className="font-serif text-3xl font-bold text-black">
            Program{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#FFD700]">Registrations</span>
              <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
            </span>
          </h2>
          <p className="mt-2 text-indigo-900/70">
            Review, track, and update program registrations
          </p>
        </div>
      </div>

      {/* Status Stats */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setStatusFilter("")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
            statusFilter === ""
              ? "bg-gradient-to-r from-[#FFD700] to-[#FFD700]/90 text-black shadow-md shadow-[#FFD700]/20"
              : "border border-indigo-200 bg-white text-indigo-900/70 hover:border-[#FFD700] hover:text-[#FFD700]"
          }`}
        >
          All ({items.length})
        </button>
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setStatusFilter(option.value)}
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

      {/* Filter Form */}
      <form
        onSubmit={handleFilterSubmit}
        className="rounded-2xl border border-indigo-100 bg-white/80 p-5 backdrop-blur-sm shadow-lg shadow-indigo-900/5"
      >
        <div className="grid gap-4 md:grid-cols-[1fr_220px_140px]">
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
              placeholder="Search by name, email, company, or program..."
              className="w-full rounded-xl border border-indigo-200 bg-white py-3 pl-10 pr-4 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
            />
          </div>

          {/* Status Filter Select */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
          >
            <option value="">All statuses</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Apply Button */}
          <button
            type="submit"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-4 py-3 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Apply Filters
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
          </button>
        </div>
      </form>

      {/* Registrations List */}
      <div className="space-y-4">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-indigo-100 bg-white p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100"></div>
                    <div className="h-6 w-32 rounded bg-indigo-100"></div>
                    <div className="h-5 w-16 rounded bg-indigo-100"></div>
                  </div>
                  <div className="mt-2 h-5 w-48 rounded bg-indigo-100"></div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="h-4 w-32 rounded bg-indigo-100"></div>
                    <div className="h-4 w-32 rounded bg-indigo-100"></div>
                    <div className="h-4 w-32 rounded bg-indigo-100"></div>
                    <div className="h-4 w-32 rounded bg-indigo-100"></div>
                  </div>
                </div>
                <div className="flex w-full gap-2 lg:w-auto">
                  <div className="h-10 w-20 rounded bg-indigo-100"></div>
                  <div className="h-10 w-24 rounded bg-indigo-100"></div>
                </div>
              </div>
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white p-12">
            <div className="rounded-full bg-indigo-50 p-4">
              <svg className="h-12 w-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold text-black">No registrations found</h3>
            <p className="mt-2 text-sm text-indigo-900/60">
              {search || statusFilter ? "Try adjusting your filters" : "Program registrations will appear here once submitted"}
            </p>
            {(search || statusFilter) && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("");
                  fetchItems();
                }}
                className="mt-4 text-sm text-[#FFD700] hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          items.map((item) => {
            const statusBadge = getStatusBadge(item.status);
            return (
              <div
                key={item._id}
                className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#FFD700]/10"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
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
                          {item.programTitle}
                        </p>
                      </div>
                      
                      {/* Status Badge */}
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-black">Email:</span>
                        <a href={`mailto:${item.email}`} className="text-indigo-900/70 hover:text-[#FFD700] transition-colors truncate">
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-black">Role:</span>
                        <span className="text-indigo-900/70">{item.role || "—"}</span>
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

                    {/* Message Preview */}
                    {item.message && (
                      <div className="mt-3">
                        <p className="text-sm text-indigo-900/50 line-clamp-2">
                          <span className="font-medium text-black">Message:</span> {item.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 lg:flex-col lg:items-end">
                    {/* Status Update */}
                    <div className="w-full lg:w-48">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        disabled={updatingId === item._id}
                        className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all disabled:opacity-50"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {updatingId === item._id && (
                        <div className="mt-1 flex items-center gap-2">
                          <div className="h-2 w-2 animate-spin rounded-full border-2 border-[#FFD700] border-t-transparent"></div>
                          <p className="text-xs text-indigo-900/50">Updating...</p>
                        </div>
                      )}
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="group/btn inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-900 transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700]"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </button>
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
              Showing {items.length} registration{items.length !== 1 ? 's' : ''}
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