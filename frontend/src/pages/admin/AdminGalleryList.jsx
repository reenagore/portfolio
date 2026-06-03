import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteGallery,
  getAdminGalleries,
} from "../../services/galleryPage.service";

export default function AdminGalleriesList() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchGalleries = async () => {
    try {
      const res = await getAdminGalleries();
      setGalleries(res.data || []);
    } catch (error) {
      console.error("Failed to fetch galleries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteGallery(id);
      setDeleteConfirm(null);
      await fetchGalleries();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete gallery");
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      published: "bg-emerald-100 text-emerald-700",
      draft: "bg-amber-100 text-amber-700",
      archived: "bg-slate-100 text-slate-600",
    };
    return styles[status] || "bg-slate-100 text-slate-600";
  };

  const filteredGalleries = galleries.filter((gallery) => {
    const matchesStatus = filterStatus === "all" || gallery.status === filterStatus;
    const matchesSearch = gallery.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = galleries.reduce((acc, gallery) => {
    acc[gallery.status] = (acc[gallery.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Galleries</h2>
          <p className="mt-1 text-slate-500">Upload and manage event galleries.</p>
        </div>

        <Link
          to="/admin/galleries/new"
          className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
        >
          + New Gallery
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              filterStatus === "all"
                ? "bg-slate-800 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All ({galleries.length})
          </button>
          {["published", "draft", "archived"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition ${
                filterStatus === status
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {status} ({statusCounts[status] || 0})
            </button>
          ))}
        </div>

        <div className="flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search by gallery title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-4 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Galleries List */}
      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-md border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-5 w-64 rounded bg-slate-200"></div>
                  <div className="mt-2 h-4 w-32 rounded bg-slate-200"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-16 rounded bg-slate-200"></div>
                  <div className="h-8 w-16 rounded bg-slate-200"></div>
                </div>
              </div>
            </div>
          ))
        ) : filteredGalleries.length === 0 ? (
          <div className="rounded-md border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-500">
              {searchTerm || filterStatus !== "all"
                ? "No galleries match your filters."
                : "No galleries found. Create your first gallery."}
            </p>
            {(searchTerm || filterStatus !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="mt-3 text-sm text-slate-600 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          filteredGalleries.map((gallery) => (
            <div
              key={gallery._id}
              className="rounded-md border border-slate-200 bg-white p-5 hover:shadow-sm transition"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {gallery.title}
                    </h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(gallery.status)}`}>
                      {gallery.status}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span>{gallery.images?.length || 0} images</span>
                    <span>•</span>
                    <span>Created: {new Date(gallery.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/galleries/${gallery._id}/edit`}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    Edit
                  </Link>

                  {deleteConfirm === gallery._id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(gallery._id)}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 transition"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(gallery._id)}
                      className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {!loading && filteredGalleries.length > 0 && (
        <div className="text-center text-sm text-slate-500 pt-2">
          Showing {filteredGalleries.length} of {galleries.length} galleries
        </div>
      )}
    </div>
  );
}