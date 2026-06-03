import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TiptapEditor from "../../components/admin/TiptapEditor";
import UniversalUpload from "../../components/admin/MediaUpload";
import {
  createArticle,
  getAdminArticleById,
  updateArticle,
} from "../../services/article.service";

const emptyImage = { url: "", publicId: "" };

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
    category: "Financial Systems & Cashflow",
    coverImage: emptyImage,
    tags: "",
    authorName: "Reena Gore",
    status: "draft",
    featured: false,
    seoTitle: "",
    seoDescription: "",
  });

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

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
          category: article.category || "Financial Systems & Cashflow",
          coverImage: article.coverImage || emptyImage,
          tags: Array.isArray(article.tags) ? article.tags.join(", ") : "",
          authorName: article.authorName || "Reena Gore",
          status: article.status || "draft",
          featured: Boolean(article.featured),
          seoTitle: article.seoTitle || "",
          seoDescription: article.seoDescription || "",
        });
      } catch (error) {
        console.error("Failed to load article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCoverUpload = (uploaded) => {
    setFormData((prev) => ({
      ...prev,
      coverImage: {
        url: uploaded?.url || "",
        publicId: uploaded?.publicId || "",
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        coverImage: JSON.stringify(formData.coverImage),
        tags: formData.tags,
        authorName: formData.authorName,
        status: formData.status,
        featured: formData.featured,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
      };

      if (isEditMode) {
        await updateArticle(id, payload);
      } else {
        await createArticle(payload);
      }

      navigate("/admin/articles");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save article");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-slate-500">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          {isEditMode ? "Edit Article" : "New Article"}
        </h2>
        <p className="mt-1 text-slate-500">Create and publish insight articles.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Article title"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:col-span-2"
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <input
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              placeholder="Author name"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-700">Featured article</span>
              </label>
            </div>

            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Short excerpt (summary of the article)"
              rows={3}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:col-span-2"
            />

            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags separated by commas (e.g., finance, leadership)"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:col-span-2"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-base font-medium text-slate-800">Cover Image</h3>

          <UniversalUpload
            type="image"
            folder="reena-gore/articles"
            maxSize={5}
            onUpload={handleCoverUpload}
          />

          {formData.coverImage?.url && (
            <img
              src={formData.coverImage.url}
              alt="Cover"
              className="mt-4 h-48 w-full rounded-lg object-cover border border-slate-200"
            />
          )}
        </div>

        {/* Content */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-base font-medium text-slate-800">Content</h3>

          <TiptapEditor
            value={formData.content}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, content: value }))
            }
            placeholder="Write article content..."
            uploadFolder="reena-gore/articles"
          />
        </div>

        {/* SEO */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-base font-medium text-slate-800">SEO</h3>

          <div className="grid gap-4">
            <input
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleChange}
              placeholder="SEO title"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <textarea
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleChange}
              placeholder="SEO description"
              rows={3}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/articles")}
            className="rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {saving ? "Saving..." : isEditMode ? "Update Article" : "Create Article"}
          </button>
        </div>
      </form>
    </div>
  );
}