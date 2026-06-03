import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TiptapEditor from "../../components/admin/TiptapEditor";
import UniversalUpload from "../../components/admin/MediaUpload";
import {
  createProduct,
  getAdminProductById,
  updateProduct,
} from "../../services/product.service";

const emptyImage = { url: "", publicId: "" };

export default function AdminProductForm() {
  const { id } = useParams();
  const isEditMode = useMemo(() => Boolean(id), [id]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: emptyImage,
    cost: 0,
    currency: "KES",
    paymentEnabled: true,
    format: "",
    downloadUrl: "",
    downloadFileName: "",
    downloadPublicId: "",
    status: "draft",
    featured: false,
    seoTitle: "",
    seoDescription: "",
  });

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchProduct = async () => {
      try {
        const res = await getAdminProductById(id);
        const product = res.data;

        setFormData({
          title: product.title || "",
          description: product.description || "",
          coverImage: product.coverImage || emptyImage,
          cost: product.cost || 0,
          currency: product.currency || "KES",
          paymentEnabled: Boolean(product.paymentEnabled),
          format: product.format || "",
          downloadUrl: product.downloadUrl || "",
          downloadFileName: product.downloadFileName || "",
          downloadPublicId: product.downloadPublicId || "",
          status: product.status || "draft",
          featured: Boolean(product.featured),
          seoTitle: product.seoTitle || "",
          seoDescription: product.seoDescription || "",
        });
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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

  const handleProductFileUpload = (uploaded) => {
    setFormData((prev) => ({
      ...prev,
      downloadUrl: uploaded?.url || "",
      downloadFileName: uploaded?.originalFilename || "",
      downloadPublicId: uploaded?.publicId || "",
      format: uploaded?.format || prev.format,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        coverImage: JSON.stringify(formData.coverImage),
        productDetails: JSON.stringify({
          cost: Number(formData.cost),
          currency: formData.currency,
          paymentEnabled: formData.paymentEnabled,
          format: formData.format,
          downloadUrl: formData.downloadUrl,
          downloadFileName: formData.downloadFileName,
          downloadPublicId: formData.downloadPublicId,
        }),
        status: formData.status,
        featured: formData.featured,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
      };

      if (isEditMode) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }

      navigate("/admin/landing-pages/products");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-slate-500">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          {isEditMode ? "Edit Product" : "New Product"}
        </h2>
        <p className="mt-1 text-slate-500">Create paid product landing pages.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product title"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:col-span-2"
              required
            />

            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="Cost"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <input
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              placeholder="Currency"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <select
              name="format"
              value={formData.format}
              onChange={handleChange}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select format</option>
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
              <option value="zip">ZIP</option>
              <option value="mp4">MP4</option>
              <option value="link">Link</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-700">Featured</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="paymentEnabled"
                  checked={formData.paymentEnabled}
                  onChange={handleChange}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-700">Enable payment</span>
              </label>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-base font-medium text-slate-800">Cover Image</h3>

          <UniversalUpload
            type="image"
            folder="reena-gore/products"
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

        {/* Description */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-base font-medium text-slate-800">Description</h3>

          <TiptapEditor
            value={formData.description}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, description: value }))
            }
            placeholder="Write product description..."
            uploadFolder="reena-gore/products"
          />
        </div>

        {/* Download File */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-base font-medium text-slate-800">Download File</h3>

          <UniversalUpload
            type="file"
            folder="reena-gore/products/files"
            maxSize={50}
            buttonText="Upload Download File"
            showPreview={false}
            onUpload={handleProductFileUpload}
          />

          <div className="mt-4 grid gap-4">
            <input
              name="downloadFileName"
              value={formData.downloadFileName}
              readOnly
              placeholder="Uploaded file name"
              className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-500"
            />

            <input
              name="downloadUrl"
              value={formData.downloadUrl}
              onChange={handleChange}
              placeholder="Download URL"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* SEO */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-base font-medium text-slate-800">SEO</h3>

          <div className="grid gap-4">
            <input
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleChange}
              placeholder="SEO title"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <textarea
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleChange}
              placeholder="SEO description"
              rows={3}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : isEditMode ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}