import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MediaUploadButton from "../../components/admin/MediaUpload";
import TiptapEditor from "../../components/admin/TiptapEditor";
import {
  createEventGallery,
  getAdminEventGalleryById,
  updateEventGallery
} from "../../services/eventGallery.service";

const emptyImage = { url: "", publicId: "" };

export default function AdminEventGalleryForm() {
  const { id } = useParams();
  const isEditMode = useMemo(() => Boolean(id), [id]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    coverImage: emptyImage,
    images: [],
    status: "draft",
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchItem = async () => {
      try {
        const res = await getAdminEventGalleryById(id);
        const item = res.data;

        setFormData({
          title: item.title || "",
          description: item.description || "",
          eventDate: item.eventDate ? item.eventDate.slice(0, 10) : "",
          coverImage: item.coverImage || emptyImage,
          images: item.images || [],
          status: item.status || "draft",
        });
      } catch (error) {
        console.error("Failed to load gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverUpload = (uploaded) => {
    setUploadingCover(false);
    if (uploaded?.url) {
      setFormData((prev) => ({
        ...prev,
        coverImage: {
          url: uploaded.url,
          publicId: uploaded.publicId || "",
        },
      }));
    }
  };

  const handleCoverUploadStart = () => {
    setUploadingCover(true);
  };

  const handleGalleryImageUpload = (uploaded) => {
    setUploadingGallery(false);
    if (!uploaded?.url) return;

    setFormData((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        {
          url: uploaded.url,
          publicId: uploaded.publicId || "",
        },
      ],
    }));
  };

  const handleGalleryUploadStart = () => {
    setUploadingGallery(true);
  };

  const removeGalleryImage = (indexToRemove) => {
    if (window.confirm("Remove this image from the gallery?")) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, index) => index !== indexToRemove),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        eventDate: formData.eventDate,
        coverImage: JSON.stringify(formData.coverImage),
        images: JSON.stringify(formData.images),
        status: formData.status,
      };

      if (isEditMode) {
        await updateEventGallery(id, payload);
      } else {
        await createEventGallery(payload);
      }

      navigate("/admin/galleries");
    } catch (error) {
      console.error("Failed to save gallery:", error);
      alert(error.response?.data?.message || "Failed to save gallery");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-[#FFD700] animate-spin"></div>
          </div>
          <p className="mt-4 text-indigo-900/60">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with golden accent */}
      <div className="relative">
        <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
        <div className="pl-6">
          <h2 className="font-serif text-3xl font-bold text-black">
            {isEditMode ? (
              <>
                Edit{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#FFD700]">Event Gallery</span>
                  <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
                </span>
              </>
            ) : (
              <>
                Create{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#FFD700]">Event Gallery</span>
                  <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
                </span>
              </>
            )}
          </h2>
          <p className="mt-2 text-indigo-900/70">
            Create or update a previous event gallery
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-indigo-100">
          <button
            type="button"
            onClick={() => setActiveTab("basic")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
              activeTab === "basic"
                ? "text-[#FFD700]"
                : "text-indigo-900/60 hover:text-indigo-900"
            }`}
          >
            Basic Info
            {activeTab === "basic" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-indigo-900"></span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cover")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
              activeTab === "cover"
                ? "text-[#FFD700]"
                : "text-indigo-900/60 hover:text-indigo-900"
            }`}
          >
            Cover Image
            {activeTab === "cover" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-indigo-900"></span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
              activeTab === "content"
                ? "text-[#FFD700]"
                : "text-indigo-900/60 hover:text-indigo-900"
            }`}
          >
            Description
            {activeTab === "content" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-indigo-900"></span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
              activeTab === "gallery"
                ? "text-[#FFD700]"
                : "text-indigo-900/60 hover:text-indigo-900"
            }`}
          >
            Gallery Images
            {activeTab === "gallery" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-indigo-900"></span>
            )}
          </button>
        </div>

        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Basic Information</h3>
            </div>

            <div className="grid gap-5">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  Gallery Title <span className="text-[#FFD700]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Annual Leadership Summit 2023"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  required
                />
              </div>

              {/* Event Date and Status */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cover Image Tab */}
        {activeTab === "cover" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Cover Image</h3>
            </div>

            <div className="space-y-4">
              <MediaUploadButton
                folder="reena-gore/previous-events"
                onUpload={handleCoverUpload}
                onUploadStart={handleCoverUploadStart}
                buttonText={uploadingCover ? "Uploading..." : "Upload Cover Image"}
                disabled={uploadingCover}
              />

              {uploadingCover && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#FFD700] border-t-transparent"></div>
                    <p className="text-sm text-indigo-900/60">Uploading image...</p>
                  </div>
                </div>
              )}

              {formData.coverImage?.url && !uploadingCover && (
                <div className="relative mt-4">
                  <div className="relative overflow-hidden rounded-xl border border-indigo-200 bg-indigo-50/30">
                    <img
                      src={formData.coverImage.url}
                      alt="Cover"
                      className="h-64 w-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-indigo-900/50 truncate max-w-[70%]">
                      {formData.coverImage.publicId || "Cover image uploaded"}
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, coverImage: emptyImage }))}
                      className="rounded-lg bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              <p className="text-xs text-indigo-900/40 mt-2">
                Recommended dimensions: 1200 x 630px (2:1 ratio). Max file size: 5MB.
              </p>
            </div>
          </div>
        )}

        {/* Description Tab */}
        {activeTab === "content" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Event Description</h3>
            </div>

            <TiptapEditor
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              placeholder="Write a description of the event, highlights, and memorable moments..."
              uploadFolder="reena-gore/previous-events"
              minHeight="300px"
            />
          </div>
        )}

        {/* Gallery Images Tab */}
        {activeTab === "gallery" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Gallery Images</h3>
            </div>

            <div className="space-y-5">
              <MediaUploadButton
                folder="reena-gore/previous-events"
                onUpload={handleGalleryImageUpload}
                onUploadStart={handleGalleryUploadStart}
                buttonText={uploadingGallery ? "Uploading..." : "Add Image to Gallery"}
                disabled={uploadingGallery}
              />

              {uploadingGallery && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#FFD700] border-t-transparent"></div>
                    <p className="text-sm text-indigo-900/60">Uploading image...</p>
                  </div>
                </div>
              )}

              {formData.images.length > 0 && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-indigo-900/60">
                      {formData.images.length} image{formData.images.length !== 1 ? 's' : ''} uploaded
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Remove all images?")) {
                          setFormData(prev => ({ ...prev, images: [] }));
                        }
                      }}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove All
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {formData.images.map((image, index) => (
                      <div
                        key={`${image.url}-${index}`}
                        className="group relative overflow-hidden rounded-xl border border-indigo-200 bg-white p-2 transition-all hover:border-[#FFD700] hover:shadow-lg"
                      >
                        <img
                          src={image.url}
                          alt={`Gallery ${index + 1}`}
                          className="h-48 w-full rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {formData.images.length === 0 && (
                <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/30 p-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-indigo-900/60">No images uploaded yet</p>
                  <p className="text-xs text-indigo-900/40">Click "Add Image to Gallery" to upload photos</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/galleries")}
            className="rounded-xl border border-indigo-200 bg-white px-6 py-3 text-sm font-medium text-indigo-900 transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700]"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={saving}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-3 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20 disabled:cursor-not-allowed disabled:opacity-60 min-w-[160px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {saving ? (
                <>
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  {isEditMode ? "Update Gallery" : "Create Gallery"}
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
          </button>
        </div>
      </form>
    </div>
  );
}