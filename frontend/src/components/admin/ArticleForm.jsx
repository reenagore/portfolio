import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TiptapEditor from "./TiptapEditor";
import {
  createArticle,
  getAdminArticleById,
  updateArticle,
} from "../../services/article.service";

const categories = [
  "Financial Systems & Cashflow",
  "Leadership & Decision-Making",
  "Operations & Efficiency",
  "SME Growth Strategy",
  "Market & Economic Insights",
];

export default function AdminArticleForm() {
  const { id } = useParams();
  const isEditMode = useMemo(() => Boolean(id), [id]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: categories[0],
    tags: "",
    authorName: "Reena Gore",
    seoTitle: "",
    seoDescription: "",
    featured: false,
    status: "draft",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [existingCoverUrl, setExistingCoverUrl] = useState("");
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  useEffect(() => {
    if (!isEditMode) return;

    const fetchArticle = async () => {
      try {
        const res = await getAdminArticleById(id);
        const article = res.data;

        setFormData({
          title: article.title || "",
          excerpt: article.excerpt || "",
          content: article.content || "",
          category: article.category || categories[0],
          tags: Array.isArray(article.tags) ? article.tags.join(", ") : "",
          authorName: article.authorName || "Reena Gore",
          seoTitle: article.seoTitle || "",
          seoDescription: article.seoDescription || "",
          featured: Boolean(article.featured),
          status: article.status || "draft",
        });

        setExistingCoverUrl(article.coverImage?.url || "");
      } catch (error) {
        console.error("Failed to load article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    if (type === "file") {
      const file = files?.[0];
      setCoverImage(file || null);
      
      // Create preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setCoverImagePreview(null);
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

      if (coverImage) {
        payload.append("coverImage", coverImage);
      }

      if (isEditMode) {
        await updateArticle(id, payload);
      } else {
        await createArticle(payload);
      }

      navigate("/admin/articles");
    } catch (error) {
      console.error("Failed to save article:", error);
      alert(error.response?.data?.message || "Failed to save article");
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
          <p className="mt-4 text-indigo-900/60">Loading article...</p>
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
                  <span className="relative z-10 text-[#FFD700]">Article</span>
                  <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
                </span>
              </>
            ) : (
              <>
                Create New{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#FFD700]">Article</span>
                  <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
                </span>
              </>
            )}
          </h2>
          <p className="mt-2 text-indigo-900/70">
            {isEditMode 
              ? "Edit your article content and settings" 
              : "Create long-form thought leadership content"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-indigo-100">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
              activeTab === "content"
                ? "text-[#FFD700]"
                : "text-indigo-900/60 hover:text-indigo-900"
            }`}
          >
            Content
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

        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="space-y-6">
            {/* Basic Info Card */}
            <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                  <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-black">Basic Information</h3>
              </div>

              <div className="grid gap-6">
                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    Article Title <span className="text-[#FFD700]">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., 5 Ways to Improve Your Cash Flow"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    Excerpt / Summary
                  </label>
                  <textarea
                    name="excerpt"
                    placeholder="Brief summary of the article..."
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  />
                </div>

                {/* Category and Author */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                      Category <span className="text-[#FFD700]">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                      Author Name
                    </label>
                    <input
                      type="text"
                      name="authorName"
                      placeholder="Author name"
                      value={formData.authorName}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    placeholder="finance, business, strategy"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  />
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
                      <span className="text-sm font-medium text-indigo-900">Featured article</span>
                    </label>
                  </div>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    Cover Image
                  </label>
                  <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleChange}
                      className="w-full text-sm text-indigo-900 file:mr-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-indigo-900 file:to-black file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#FFD700] hover:file:opacity-90"
                    />
                    
                    {/* Image Preview */}
                    {(coverImagePreview || existingCoverUrl) && (
                      <div className="mt-4">
                        <p className="mb-2 text-xs text-indigo-900/50">Preview:</p>
                        <div className="relative overflow-hidden rounded-lg border border-indigo-200">
                          <img
                            src={coverImagePreview || existingCoverUrl}
                            alt="Cover preview"
                            className="h-48 w-full object-cover"
                          />
                          {coverImagePreview && (
                            <button
                              type="button"
                              onClick={() => {
                                setCoverImage(null);
                                setCoverImagePreview(null);
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

            {/* Content Editor Card */}
            <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                  <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-black">Article Content</h3>
              </div>

              <TiptapEditor
                value={formData.content}
                onChange={(content) =>
                  setFormData((prev) => ({ ...prev, content }))
                }
                placeholder="Write your article content here..."
                uploadFolder="reena-gore/articles"
                minHeight="500px"
              />
            </div>
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
                    {formData.seoTitle || formData.title || "Article Title"}
                  </p>
                  <p className="text-xs text-indigo-900/40">
                    {window.location.origin}/articles/{formData.title?.toLowerCase().replace(/\s+/g, '-') || 'article-slug'}
                  </p>
                  <p className="text-xs text-indigo-900/70 line-clamp-2">
                    {formData.seoDescription || formData.excerpt || "Article description will appear here..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/articles")}
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
                  {isEditMode ? "Update Article" : "Create Article"}
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