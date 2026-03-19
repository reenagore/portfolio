import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TiptapEditor from "./TiptapEditor";
import {
  createPodcast,
  getAdminPodcastById,
  updatePodcast,
} from "../../services/podcast.service";

const platforms = [
  { value: "youtube", label: "YouTube", icon: "🎥" },
  { value: "spotify", label: "Spotify", icon: "🎵" },
  { value: "apple", label: "Apple Podcasts", icon: "🎧" },
  { value: "soundcloud", label: "SoundCloud", icon: "☁️" },
  { value: "other", label: "Other Platform", icon: "📻" },
];

export default function AdminPodcastForm() {
  const { id } = useParams();
  const isEditMode = useMemo(() => Boolean(id), [id]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: "",
    embedUrl: "",
    platform: "youtube",
    duration: "",
    episodeNumber: "",
    seoTitle: "",
    seoDescription: "",
    featured: false,
    status: "draft",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (!isEditMode) return;

    const fetchEpisode = async () => {
      try {
        const res = await getAdminPodcastById(id);
        const episode = res.data;

        setFormData({
          title: episode.title || "",
          summary: episode.summary || "",
          description: episode.description || "",
          embedUrl: episode.embedUrl || "",
          platform: episode.platform || "youtube",
          duration: episode.duration || "",
          episodeNumber: episode.episodeNumber || "",
          seoTitle: episode.seoTitle || "",
          seoDescription: episode.seoDescription || "",
          featured: Boolean(episode.featured),
          status: episode.status || "draft",
        });

        setExistingThumbnailUrl(episode.thumbnail?.url || "");
      } catch (error) {
        console.error("Failed to load podcast episode:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    if (type === "file") {
      const file = files?.[0];
      setThumbnail(file || null);
      
      // Create preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnailPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setThumbnailPreview(null);
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (thumbnail) {
        payload.append("thumbnail", thumbnail);
      }

      if (isEditMode) {
        await updatePodcast(id, payload);
      } else {
        await createPodcast(payload);
      }

      navigate("/admin/podcasts");
    } catch (error) {
      console.error("Failed to save podcast episode:", error);
      alert(error.response?.data?.message || "Failed to save podcast episode");
    } finally {
      setSaving(false);
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-[#FFD700] animate-spin"></div>
          </div>
          <p className="mt-4 text-indigo-900/60">Loading episode...</p>
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
                  <span className="relative z-10 text-[#FFD700]">Podcast Episode</span>
                  <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
                </span>
              </>
            ) : (
              <>
                Create New{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#FFD700]">Podcast Episode</span>
                  <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
                </span>
              </>
            )}
          </h2>
          <p className="mt-2 text-indigo-900/70">
            {isEditMode 
              ? "Edit your podcast episode content and settings" 
              : "Publish and manage podcast content"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-indigo-100">
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
            onClick={() => setActiveTab("seo")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
              activeTab === "seo"
                ? "text-[#FFD700]"
                : "text-indigo-900/60 hover:text-indigo-900"
            }`}
          >
            SEO & Metadata
            {activeTab === "seo" && (
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Basic Information</h3>
            </div>

            <div className="grid gap-6">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  Episode Title <span className="text-[#FFD700]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Episode 1: Understanding Cash Flow"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  required
                />
              </div>

              {/* Episode Number and Duration */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    Episode Number
                  </label>
                  <input
                    type="number"
                    name="episodeNumber"
                    placeholder="42"
                    value={formData.episodeNumber}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    Duration (seconds)
                  </label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="3600"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  />
                  {formData.duration && (
                    <p className="mt-1 text-xs text-indigo-900/40">
                      Formatted: {formatDuration(parseInt(formData.duration))}
                    </p>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  Short Summary
                </label>
                <textarea
                  name="summary"
                  placeholder="Brief overview of this episode..."
                  value={formData.summary}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>

              {/* Platform and Embed URL */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    Platform <span className="text-[#FFD700]">*</span>
                  </label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                    required
                  >
                    {platforms.map((platform) => (
                      <option key={platform.value} value={platform.value}>
                        {platform.icon} {platform.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    Embed URL <span className="text-[#FFD700]">*</span>
                  </label>
                  <input
                    type="url"
                    name="embedUrl"
                    placeholder="https://..."
                    value={formData.embedUrl}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                    required
                  />
                </div>
              </div>

              {/* Status and Featured */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    Status
                  </label>
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

                <div className="flex items-center">
                  <label className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50/30 px-4 py-3 cursor-pointer hover:border-[#FFD700] transition-colors">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-indigo-300 text-[#FFD700] focus:ring-[#FFD700]"
                    />
                    <span className="text-sm font-medium text-indigo-900">Featured episode</span>
                  </label>
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  Episode Thumbnail
                </label>
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleChange}
                    className="w-full text-sm text-indigo-900 file:mr-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-indigo-900 file:to-black file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#FFD700] hover:file:opacity-90"
                  />
                  
                  {/* Image Preview */}
                  {(thumbnailPreview || existingThumbnailUrl) && (
                    <div className="mt-4">
                      <p className="mb-2 text-xs text-indigo-900/50">Preview:</p>
                      <div className="relative overflow-hidden rounded-lg border border-indigo-200">
                        <img
                          src={thumbnailPreview || existingThumbnailUrl}
                          alt="Thumbnail preview"
                          className="h-48 w-full object-cover"
                        />
                        {thumbnailPreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setThumbnail(null);
                              setThumbnailPreview(null);
                            }}
                            className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Episode Description</h3>
            </div>

            <TiptapEditor
              value={formData.description}
              onChange={(description) =>
                setFormData((prev) => ({ ...prev, description }))
              }
              placeholder="Write the full episode description, show notes, and timestamps..."
              uploadFolder="reena-gore/podcasts"
              minHeight="400px"
            />
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === "seo" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">SEO & Metadata</h3>
            </div>

            <div className="space-y-6">
              {/* SEO Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  SEO Title
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  placeholder="Optimized title for search engines"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
                <p className="mt-1 text-xs text-indigo-900/40">
                  Recommended: 50-60 characters
                </p>
              </div>

              {/* SEO Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  SEO Description
                </label>
                <textarea
                  name="seoDescription"
                  placeholder="Meta description for search results"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
                <p className="mt-1 text-xs text-indigo-900/40">
                  Recommended: 150-160 characters
                </p>
              </div>

              {/* SEO Preview */}
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-indigo-900/50">
                  Search Preview
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-[#FFD700]">
                    {formData.seoTitle || formData.title || "Podcast Episode Title"}
                  </p>
                  <p className="text-xs text-indigo-900/40">
                    {window.location.origin}/podcast/{formData.episodeNumber || 'episode'}
                  </p>
                  <p className="text-xs text-indigo-900/70 line-clamp-2">
                    {formData.seoDescription || formData.summary || "Episode description will appear here..."}
                  </p>
                </div>
              </div>

              {/* Platform-specific tips */}
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4">
                <p className="text-xs font-medium text-indigo-900/50 mb-2">Platform Tips</p>
                <ul className="space-y-1 text-xs text-indigo-900/60">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD700]">•</span>
                    <span>YouTube: Include timestamps and links to resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD700]">•</span>
                    <span>Spotify: Add chapter markers for better navigation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD700]">•</span>
                    <span>Apple Podcasts: Keep description concise and engaging</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/podcasts")}
            className="rounded-xl border border-indigo-200 bg-white px-6 py-3 text-sm font-medium text-indigo-900 transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700]"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={saving}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-3 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20 disabled:cursor-not-allowed disabled:opacity-60 min-w-[200px]"
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
                  {isEditMode ? "Update Episode" : "Create Episode"}
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