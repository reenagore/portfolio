import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TiptapEditor from "./TiptapEditor";
import MediaUploadButton from "./MediaUpload";
import ProductFileUploadButton from "./MediaUpload";
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

  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchItem = async () => {
      try {
        const res = await getAdminProductById(id);
        const item = res.data;

        setFormData({
          title: item.title || "",
          description: item.description || "",
          coverImage: item.coverImage || emptyImage,
          cost: item.cost || 0,
          paymentEnabled: Boolean(item.paymentEnabled),
          format: item.format || "",
          downloadUrl: item.downloadUrl || "",
          downloadFileName: item.downloadFileName || "",
          downloadPublicId: item.downloadPublicId || "",
          status: item.status || "draft",
          featured: Boolean(item.featured),
          seoTitle: item.seoTitle || "",
          seoDescription: item.seoDescription || "",
        });
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
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
      console.error("Failed to save product:", error);
      alert(error.response?.data?.message || "Failed to save product");
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
          <p className="mt-4 text-indigo-900/60">Loading product...</p>
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
                  <span className="relative z-10 text-[#FFD700]">Product</span>
                  <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
                </span>
              </>
            ) : (
              <>
                Create{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#FFD700]">Product</span>
                  <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
                </span>
              </>
            )}
          </h2>
          <p className="mt-2 text-indigo-900/70">
            Create or update a product landing page
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
            onClick={() => setActiveTab("media")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
              activeTab === "media"
                ? "text-[#FFD700]"
                : "text-indigo-900/60 hover:text-indigo-900"
            }`}
          >
            Cover Image
            {activeTab === "media" && (
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
            onClick={() => setActiveTab("download")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
              activeTab === "download"
                ? "text-[#FFD700]"
                : "text-indigo-900/60 hover:text-indigo-900"
            }`}
          >
            Download File
            {activeTab === "download" && (
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
            SEO
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Basic Information</h3>
            </div>

            <div className="grid gap-5">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  Product Title <span className="text-[#FFD700]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., The Ultimate Business Playbook"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  required
                />
              </div>

              {/* Cost and Format */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">Price (KES)</label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    placeholder="0 for free products"
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">Format</label>
                  <select
                    name="format"
                    value={formData.format}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  >
                    <option value="">Select format</option>
                    <option value="pdf">PDF Document</option>
                    <option value="docx">Word Document</option>
                    <option value="zip">ZIP Archive</option>
                    <option value="mp4">Video (MP4)</option>
                    <option value="link">External Link</option>
                  </select>
                </div>
              </div>

              {/* Status and Featured */}
              <div className="grid gap-5 md:grid-cols-2">
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
                <div className="flex items-center">
                  <label className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50/30 px-4 py-3 cursor-pointer hover:border-[#FFD700] transition-colors">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-indigo-300 text-[#FFD700] focus:ring-[#FFD700]"
                    />
                    <span className="text-sm font-medium text-indigo-900">Featured product</span>
                  </label>
                </div>
              </div>

              {/* Payment Option */}
              <div>
                <label className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50/30 px-4 py-3 cursor-pointer hover:border-[#FFD700] transition-colors">
                  <input
                    type="checkbox"
                    name="paymentEnabled"
                    checked={formData.paymentEnabled}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-indigo-300 text-[#FFD700] focus:ring-[#FFD700]"
                  />
                  <span className="text-sm font-medium text-indigo-900">Enable Paystack payment processing</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Cover Image Tab */}
        {activeTab === "media" && (
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
                folder="reena-gore/products"
                onUpload={handleCoverUpload}
                buttonText="Upload Cover Image"
              />

              {formData.coverImage?.url && (
                <div className="relative mt-4">
                  <img
                    src={formData.coverImage.url}
                    alt="Cover"
                    className="h-64 w-full rounded-xl object-cover border border-indigo-200"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverImage: emptyImage }))}
                    className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white hover:bg-red-700 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
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
              <h3 className="font-serif text-xl font-semibold text-black">Product Description</h3>
            </div>

            <TiptapEditor
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              placeholder="Write the product description, features, benefits, and what customers will get..."
              uploadFolder="reena-gore/products"
              minHeight="400px"
            />
          </div>
        )}

        {/* Download File Tab */}
        {activeTab === "download" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Download File</h3>
            </div>

            <div className="space-y-5">
              <ProductFileUploadButton
                folder="reena-gore/products/files"
                onUpload={handleProductFileUpload}
                buttonText="Upload Product File"
              />

              {formData.downloadFileName && (
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFD700]/10">
                      <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">{formData.downloadFileName}</p>
                      <p className="text-xs text-indigo-900/50">{formData.format?.toUpperCase() || "File"} • Ready for download</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    Download URL
                  </label>
                  <input
                    type="text"
                    name="downloadUrl"
                    value={formData.downloadUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                    readOnly
                  />
                  <p className="mt-1 text-xs text-indigo-900/40">
                    This URL will be provided after file upload
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    File Name
                  </label>
                  <input
                    type="text"
                    name="downloadFileName"
                    value={formData.downloadFileName}
                    onChange={handleChange}
                    placeholder="Uploaded file name"
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                    readOnly
                  />
                </div>
              </div>
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

            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  SEO Title
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  placeholder="Optimized title for search engines"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
                <p className="mt-1 text-xs text-indigo-900/40">Recommended: 50-60 characters</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  SEO Description
                </label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  placeholder="Meta description for search results"
                  rows={3}
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
                <p className="mt-1 text-xs text-indigo-900/40">Recommended: 150-160 characters</p>
              </div>

              {/* SEO Preview */}
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-indigo-900/50">
                  Search Preview
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-[#FFD700]">{formData.seoTitle || formData.title || "Product Title"}</p>
                  <p className="text-xs text-indigo-900/40">{window.location.origin}/product/{formData.title?.toLowerCase().replace(/\s+/g, '-') || 'product-slug'}</p>
                  <p className="text-xs text-indigo-900/70 line-clamp-2">{formData.seoDescription || "Product description will appear here..."}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/landing-pages/products")}
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
                  {isEditMode ? "Update Product" : "Create Product"}
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