import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TiptapEditor from "../../components/admin/TiptapEditor";
import UniversalUpload from "../../components/admin/MediaUpload";
import {
  createGallery,
  getAdminGalleryById,
  updateGallery,
} from "../../services/galleryPage.service";

const emptyImage = { url: "", publicId: "" };

export default function AdminGalleryForm() {
  const { id } = useParams();
  const isEditMode = useMemo(() => Boolean(id), [id]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: emptyImage,
    images: [],
    videoUrl: "",
    status: "draft",
    featured: false,
    seoTitle: "",
    seoDescription: "",
  });

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchGallery = async () => {
      try {
        const res = await getAdminGalleryById(id);
        const gallery = res.data;

        setFormData({
          title: gallery.title || "",
          description: gallery.description || "",
          coverImage: gallery.coverImage || emptyImage,
          images: gallery.images || [],
          videoUrl: gallery.videoUrl || "",
          status: gallery.status || "draft",
          featured: Boolean(gallery.featured),
          seoTitle: gallery.seoTitle || "",
          seoDescription: gallery.seoDescription || "",
        });
      } catch (error) {
        console.error("Failed to load gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
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

  const handleGalleryImageUpload = (uploaded) => {
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
        coverImage: JSON.stringify(formData.coverImage),
        galleryDetails: JSON.stringify({
          images: formData.images,
          videoUrl: formData.videoUrl,
        }),
        status: formData.status,
        featured: formData.featured,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
      };

      if (isEditMode) {
        await updateGallery(id, payload);
      } else {
        await createGallery(payload);
      }

      navigate("/admin/galleries");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save gallery");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-slate-500">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          {isEditMode ? "Edit Gallery" : "New Gallery"}
        </h2>
        <p className="mt-1 text-slate-500">Upload gallery images, add video, and publish.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Gallery title"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:col-span-2"
              required
            />

            <input
              type="text"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="Optional video URL (YouTube, Vimeo, etc.)"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:col-span-2"
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

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700">Featured gallery</span>
            </label>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-base font-medium text-slate-800">Cover Image</h3>

          <UniversalUpload
            type="image"
            folder="reena-gore/galleries"
            maxSize={5}
            onUpload={handleCoverUpload}
          />

          {formData.coverImage?.url && (
            <img
              src={formData.coverImage.url}
              alt="Cover"
              className="mt-4 h-48 w-full rounded-md object-cover border border-slate-200"
            />
          )}
        </div>

        {/* Description */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-base font-medium text-slate-800">Description</h3>

          <TiptapEditor
            value={formData.description}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, description: value }))
            }
            placeholder="Write gallery description..."
            uploadFolder="reena-gore/galleries"
          />
        </div>

        {/* Gallery Images */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-base font-medium text-slate-800">Gallery Images</h3>

          <UniversalUpload
            type="image"
            folder="reena-gore/galleries"
            maxSize={5}
            onUpload={handleGalleryImageUpload}
          />

          {formData.images.length > 0 ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {formData.images.map((image, index) => (
                <div
                  key={`${image.url}-${index}`}
                  className="group relative rounded-md border border-slate-200 bg-white p-2"
                >
                  <img
                    src={image.url}
                    alt={`Gallery ${index + 1}`}
                    className="h-40 w-full rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="mt-2 w-full rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No images uploaded yet.</p>
          )}
        </div>

        {/* SEO */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-base font-medium text-slate-800">SEO</h3>

          <div className="grid gap-4">
            <input
              type="text"
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
            onClick={() => navigate("/admin/galleries")}
            className="rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {saving ? "Saving..." : isEditMode ? "Update Gallery" : "Create Gallery"}
          </button>
        </div>
      </form>
    </div>
  );
}