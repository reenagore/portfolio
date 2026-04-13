import { useEffect, useState } from "react";
import api from "../../services/api";

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "reviewed", label: "Reviewed", color: "bg-purple-100 text-purple-700" },
  { value: "replied", label: "Replied", color: "bg-emerald-100 text-emerald-700" },
  { value: "archived", label: "Archived", color: "bg-slate-100 text-slate-700" },
];

export default function AdminContacts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contacts/admin");
      setItems(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      await api.patch(`/contacts/admin/${id}`, { status });
      await fetchContacts();
      
      // Update selected contact if it's the one being edited
      if (selectedContact?._id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingId("");
    }
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowDetailsModal(true);
  };

  const getStatusBadge = (status) => {
    const statusInfo = statusOptions.find(s => s.value === status);
    return statusInfo || { label: status, color: "bg-slate-100 text-slate-700" };
  };

  const filteredItems = items.filter((item) => {
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    const matchesSearch = 
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Details Modal */}
      {showDetailsModal && selectedContact && (
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
                      {selectedContact.fullName?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-black">
                      {selectedContact.fullName}
                    </h2>
                    <p className="text-sm text-indigo-900/60">
                      Contact Message Details
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Contact Information */}
                <div className="rounded-xl border border-indigo-100 bg-white p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FFD700] mb-4">
                    Contact Information
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs text-indigo-900/50">Full Name</p>
                      <p className="font-medium text-black">{selectedContact.fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-indigo-900/50">Email Address</p>
                      <a href={`mailto:${selectedContact.email}`} className="font-medium text-[#FFD700] hover:underline">
                        {selectedContact.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-indigo-900/50">Phone Number</p>
                      <p className="text-black">{selectedContact.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-indigo-900/50">Company</p>
                      <p className="text-black">{selectedContact.company || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-indigo-900/50">Subject</p>
                      <p className="text-black">{selectedContact.subject || "No subject"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-indigo-900/50">Status</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(selectedContact.status).color}`}>
                          {getStatusBadge(selectedContact.status).label}
                        </span>
                        <select
                          value={selectedContact.status}
                          onChange={(e) => updateStatus(selectedContact._id, e.target.value)}
                          disabled={updatingId === selectedContact._id}
                          className="rounded-lg border border-indigo-200 bg-white px-2 py-1 text-sm focus:border-[#FFD700] focus:outline-none"
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              Change to {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <h3 className="font-semibold text-black">Message</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-indigo-900/70 whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>

                {/* Submission Date */}
                <div className="rounded-xl border border-indigo-100 bg-white p-4">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs font-medium text-indigo-900/50">Submitted On</p>
                  </div>
                  <p className="mt-1 text-sm text-black">
                    {new Date(selectedContact.createdAt).toLocaleString()}
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
        <div className="pl-6">
          <h2 className="font-serif text-3xl font-bold text-black">
            Contact{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#FFD700]">Messages</span>
              <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
            </span>
          </h2>
          <p className="mt-2 text-indigo-900/70">
            Review and manage contact form submissions
          </p>
        </div>
      </div>

      {/* Status Stats */}
      <div className="flex flex-wrap gap-3">
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
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilterStatus(option.value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all duration-200 ${
              filterStatus === option.value
                ? "bg-gradient-to-r from-[#FFD700] to-[#FFD700]/90 text-black shadow-md shadow-[#FFD700]/20"
                : "border border-indigo-200 bg-white text-indigo-900/70 hover:border-[#FFD700] hover:text-[#FFD700]"
            }`}
          >
            {option.label} ({statusCounts[option.value] || 0})
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
          placeholder="Search by name, email, subject, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-indigo-200 bg-white py-3 pl-10 pr-4 text-sm text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
        />
      </div>

      {/* Contacts List */}
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
                  <div className="mt-2 h-4 w-48 rounded bg-indigo-100"></div>
                  <div className="mt-4 h-4 w-full rounded bg-indigo-100"></div>
                  <div className="mt-2 h-4 w-3/4 rounded bg-indigo-100"></div>
                </div>
                <div className="w-full lg:w-48">
                  <div className="h-10 w-full rounded bg-indigo-100"></div>
                </div>
              </div>
            </div>
          ))
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white p-12">
            <div className="rounded-full bg-indigo-50 p-4">
              <svg className="h-12 w-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold text-black">No messages found</h3>
            <p className="mt-2 text-sm text-indigo-900/60">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your filters or search term" 
                : "Contact form submissions will appear here"}
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
          filteredItems.map((item) => {
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
                        <a href={`mailto:${item.email}`} className="text-sm text-indigo-900/60 hover:text-[#FFD700] transition-colors">
                          {item.email}
                        </a>
                      </div>
                      
                      {/* Status Badge */}
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </div>

                    {/* Subject */}
                    {item.subject && (
                      <p className="mt-3 text-sm font-medium text-black">
                        Subject: {item.subject}
                      </p>
                    )}

                    {/* Company & Phone */}
                    {(item.company || item.phone) && (
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-indigo-900/60">
                        {item.company && <span>🏢 {item.company}</span>}
                        {item.phone && <span>📞 {item.phone}</span>}
                      </div>
                    )}

                    {/* Message Preview */}
                    <p className="mt-3 text-sm text-indigo-900/70 line-clamp-2">
                      {item.message}
                    </p>

                    {/* Submission Date */}
                    <div className="mt-2 flex items-center gap-2 text-xs text-indigo-900/40">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-[#FFD700]"
                      title="View Details"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    {/* Status Update */}
                    <div className="relative">
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item._id, e.target.value)}
                        disabled={updatingId === item._id}
                        className="rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all disabled:opacity-50"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {updatingId === item._id && (
                        <div className="absolute -right-6 top-1/2 -translate-y-1/2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#FFD700] border-t-transparent"></div>
                        </div>
                      )}
                    </div>
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
      {!loading && filteredItems.length > 0 && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-indigo-900/60">
              Showing {filteredItems.length} of {items.length} messages
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-indigo-900/40">
                {filteredItems.filter(i => i.status === 'new').length} unread
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}