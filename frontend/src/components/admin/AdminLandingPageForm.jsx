import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  createLandingPage,
  getAdminLandingPageById,
  updateLandingPage,
} from "../../services/landingPage.service";
import TiptapEditor from "./TiptapEditor";
import MediaUploadButton from "./MediaUpload";

const defaultHero = {
  eyebrow: "",
  headline: "",
  subheadline: "",
  coverImage: { url: "", publicId: "" },
  ctaText: "",
  ctaLink: "",
};

const defaultSEO = {
  title: "",
  description: "",
};

const defaultEventDetails = {
  date: "",
  time: "",
  location: "",
  price: 0,
  capacity: 0,
  registrationLink: "",
};

const defaultProductDetails = {
  price: 0,
  currency: "KES",
  paymentEnabled: true,
  deliveryType: "",
  paymentLabel: "Buy Now",
};

const defaultGalleryDetails = {
  eventDate: "",
  location: "",
  videoEmbedUrl: "",
  galleryImages: [],
};

export default function AdminLandingPageForm() {
  const { id } = useParams();
  const isEditMode = useMemo(() => Boolean(id), [id]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: searchParams.get("type") || "event",
    title: "",
    status: "draft",
    featured: false,
    description: "",
    hero: defaultHero,
    seo: defaultSEO,
    eventDetails: defaultEventDetails,
    productDetails: defaultProductDetails,
    galleryDetails: defaultGalleryDetails,
    sections: [],
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchItem = async () => {
      try {
        const res = await getAdminLandingPageById(id);
        const item = res.data;

        setFormData({
          type: item.type || "event",
          title: item.title || "",
          status: item.status || "draft",
          featured: Boolean(item.featured),
          description: item.description || "",
          hero: item.hero || defaultHero,
          seo: item.seo || defaultSEO,
          eventDetails: item.eventDetails || defaultEventDetails,
          productDetails: item.productDetails || defaultProductDetails,
          galleryDetails: item.galleryDetails || defaultGalleryDetails,
          sections: item.sections || [],
        });
      } catch (error) {
        console.error("Failed to load landing page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, isEditMode]);

  const handleRootChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNestedChange = (group, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [field]: value,
      },
    }));
  };

  const handleHeroImageUpload = (uploaded) => {
    setFormData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        coverImage: {
          url: uploaded?.url || "",
          publicId: uploaded?.publicId || "",
        },
      },
    }));
  };

  const handleGalleryImageUpload = (uploaded) => {
    if (!uploaded?.url) return;

    setFormData((prev) => ({
      ...prev,
      galleryDetails: {
        ...prev.galleryDetails,
        galleryImages: [
          ...(prev.galleryDetails.galleryImages || []),
          {
            url: uploaded.url,
            publicId: uploaded.publicId || "",
          },
        ],
      },
    }));
  };

  const removeGalleryImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      galleryDetails: {
        ...prev.galleryDetails,
        galleryImages: prev.galleryDetails.galleryImages.filter(
          (_, index) => index !== indexToRemove
        ),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        type: formData.type,
        title: formData.title,
        status: formData.status,
        featured: formData.featured,
        description: formData.description,
        hero: JSON.stringify(formData.hero),
        seo: JSON.stringify(formData.seo),
        eventDetails: JSON.stringify(formData.eventDetails),
        productDetails: JSON.stringify(formData.productDetails),
        galleryDetails: JSON.stringify(formData.galleryDetails),
        sections: JSON.stringify(formData.sections),
      };

      if (isEditMode) {
        await updateLandingPage(id, payload);
      } else {
        await createLandingPage(payload);
      }

      navigate("/admin/landing-pages");
    } catch (error) {
      console.error("Failed to save landing page:", error);
      alert(error.response?.data?.message || "Failed to save landing page");
    } finally {
      setSaving(false);
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'event':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'product':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'gallery':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-[#FFD700] animate-spin"></div>
          </div>
          <p className="mt-4 text-indigo-900/60">Loading landing page...</p>
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
                  <span className="relative z-10 text-[#FFD700]">Landing Page</span>
                  <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
                </span>
              </>
            ) : (
              <>
                Create{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#FFD700]">Landing Page</span>
                  <span className="absolute bottom-1 left-0 h-3 w-full bg-[#FFD700]/20 -z-0"></span>
                </span>
              </>
            )}
          </h2>
          <p className="mt-2 text-indigo-900/70">
            Create a dedicated public-facing landing page
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
            onClick={() => setActiveTab("hero")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
              activeTab === "hero"
                ? "text-[#FFD700]"
                : "text-indigo-900/60 hover:text-indigo-900"
            }`}
          >
            Hero Section
            {activeTab === "hero" && (
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
            Main Content
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
            SEO
            {activeTab === "seo" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-indigo-900"></span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
              activeTab === "details"
                ? "text-[#FFD700]"
                : "text-indigo-900/60 hover:text-indigo-900"
            }`}
          >
            {formData.type === "event" ? "Event Details" : formData.type === "product" ? "Product Details" : "Gallery"}
            {activeTab === "details" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-indigo-900"></span>
            )}
          </button>
        </div>

        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <span className="text-[#FFD700]">{getTypeIcon(formData.type)}</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Basic Information</h3>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Page Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  Page Type <span className="text-[#FFD700]">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleRootChange}
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  disabled={isEditMode}
                >
                  <option value="event">Event Landing Page</option>
                  <option value="product">Product Landing Page</option>
                  <option value="gallery">Gallery Landing Page</option>
                </select>
                {isEditMode && (
                  <p className="mt-1 text-xs text-indigo-900/40">Page type cannot be changed after creation</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  Page Title <span className="text-[#FFD700]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleRootChange}
                  placeholder="e.g., Annual Leadership Summit 2024"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleRootChange}
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Featured */}
              <div className="flex items-center">
                <label className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50/30 px-4 py-3 cursor-pointer hover:border-[#FFD700] transition-colors">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleRootChange}
                    className="h-4 w-4 rounded border-indigo-300 text-[#FFD700] focus:ring-[#FFD700]"
                  />
                  <span className="text-sm font-medium text-indigo-900">Featured landing page</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section Tab */}
        {activeTab === "hero" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Hero Section</h3>
            </div>

            <div className="grid gap-5">
              {/* Eyebrow */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  Eyebrow Text
                </label>
                <input
                  type="text"
                  value={formData.hero.eyebrow}
                  onChange={(e) => handleNestedChange("hero", "eyebrow", e.target.value)}
                  placeholder="e.g., Featured Event"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>

              {/* Headline */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  Headline <span className="text-[#FFD700]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.hero.headline}
                  onChange={(e) => handleNestedChange("hero", "headline", e.target.value)}
                  placeholder="e.g., The Future of Business Leadership"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>

              {/* Subheadline */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  Subheadline
                </label>
                <textarea
                  value={formData.hero.subheadline}
                  onChange={(e) => handleNestedChange("hero", "subheadline", e.target.value)}
                  placeholder="A brief description that supports the headline..."
                  rows={3}
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>

              {/* CTA Fields */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.hero.ctaText}
                    onChange={(e) => handleNestedChange("hero", "ctaText", e.target.value)}
                    placeholder="e.g., Register Now"
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                    CTA Link
                  </label>
                  <input
                    type="text"
                    value={formData.hero.ctaLink}
                    onChange={(e) => handleNestedChange("hero", "ctaLink", e.target.value)}
                    placeholder="e.g., /booking"
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                  />
                </div>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  Cover Image
                </label>
                <div className="flex flex-col gap-3">
                  <MediaUploadButton
                    folder={`reena-gore/landing-pages/${formData.type}`}
                    onUpload={handleHeroImageUpload}
                    buttonText="Upload Cover Image"
                  />
                  {formData.hero.coverImage?.url && (
                    <div className="relative mt-3">
                      <img
                        src={formData.hero.coverImage.url}
                        alt="Hero cover"
                        className="h-48 w-full rounded-xl object-cover border border-indigo-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleNestedChange("hero", "coverImage", { url: "", publicId: "" })}
                        className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white hover:bg-red-700 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Tab */}
        {activeTab === "content" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Main Description</h3>
            </div>

            <TiptapEditor
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              placeholder="Write the main landing page description..."
              uploadFolder={`reena-gore/landing-pages/${formData.type}`}
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

            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={formData.seo.title}
                  onChange={(e) => handleNestedChange("seo", "title", e.target.value)}
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
                  value={formData.seo.description}
                  onChange={(e) => handleNestedChange("seo", "description", e.target.value)}
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
                  <p className="text-sm text-[#FFD700]">{formData.seo.title || formData.title || "Page Title"}</p>
                  <p className="text-xs text-indigo-900/40">{window.location.origin}/landing/{formData.title?.toLowerCase().replace(/\s+/g, '-') || 'page-slug'}</p>
                  <p className="text-xs text-indigo-900/70 line-clamp-2">{formData.seo.description || "Page description will appear here..."}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Tab - Event Details */}
        {activeTab === "details" && formData.type === "event" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Event Details</h3>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Date</label>
                <input
                  type="date"
                  value={formData.eventDetails.date || ""}
                  onChange={(e) => handleNestedChange("eventDetails", "date", e.target.value)}
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Time</label>
                <input
                  type="text"
                  value={formData.eventDetails.time}
                  onChange={(e) => handleNestedChange("eventDetails", "time", e.target.value)}
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Location</label>
                <input
                  type="text"
                  value={formData.eventDetails.location}
                  onChange={(e) => handleNestedChange("eventDetails", "location", e.target.value)}
                  placeholder="e.g., Virtual or Physical Address"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Price (KES)</label>
                <input
                  type="number"
                  value={formData.eventDetails.price}
                  onChange={(e) => handleNestedChange("eventDetails", "price", Number(e.target.value))}
                  placeholder="0 for free events"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Capacity</label>
                <input
                  type="number"
                  value={formData.eventDetails.capacity}
                  onChange={(e) => handleNestedChange("eventDetails", "capacity", Number(e.target.value))}
                  placeholder="Max attendees"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Registration Link</label>
                <input
                  type="text"
                  value={formData.eventDetails.registrationLink}
                  onChange={(e) => handleNestedChange("eventDetails", "registrationLink", e.target.value)}
                  placeholder="External registration URL"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* Details Tab - Product Details */}
        {activeTab === "details" && formData.type === "product" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Product Details</h3>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Price</label>
                <input
                  type="number"
                  value={formData.productDetails.price}
                  onChange={(e) => handleNestedChange("productDetails", "price", Number(e.target.value))}
                  placeholder="0 for free products"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Currency</label>
                <input
                  type="text"
                  value={formData.productDetails.currency}
                  onChange={(e) => handleNestedChange("productDetails", "currency", e.target.value)}
                  placeholder="KES, USD, etc."
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Delivery Type</label>
                <input
                  type="text"
                  value={formData.productDetails.deliveryType}
                  onChange={(e) => handleNestedChange("productDetails", "deliveryType", e.target.value)}
                  placeholder="e.g., Digital Download, Physical Product"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Payment Button Label</label>
                <input
                  type="text"
                  value={formData.productDetails.paymentLabel}
                  onChange={(e) => handleNestedChange("productDetails", "paymentLabel", e.target.value)}
                  placeholder="Buy Now"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50/30 px-4 py-3 cursor-pointer hover:border-[#FFD700] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.productDetails.paymentEnabled}
                    onChange={(e) => handleNestedChange("productDetails", "paymentEnabled", e.target.checked)}
                    className="h-4 w-4 rounded border-indigo-300 text-[#FFD700] focus:ring-[#FFD700]"
                  />
                  <span className="text-sm font-medium text-indigo-900">Enable payment processing</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Details Tab - Gallery */}
        {activeTab === "details" && formData.type === "gallery" && (
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-900/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD700]/10">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-black">Gallery</h3>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Event Date</label>
                <input
                  type="date"
                  value={formData.galleryDetails.eventDate || ""}
                  onChange={(e) => handleNestedChange("galleryDetails", "eventDate", e.target.value)}
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Location</label>
                <input
                  type="text"
                  value={formData.galleryDetails.location}
                  onChange={(e) => handleNestedChange("galleryDetails", "location", e.target.value)}
                  placeholder="Event location"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-indigo-900/70">Video Embed URL</label>
                <input
                  type="text"
                  value={formData.galleryDetails.videoEmbedUrl}
                  onChange={(e) => handleNestedChange("galleryDetails", "videoEmbedUrl", e.target.value)}
                  placeholder="YouTube or Vimeo embed URL"
                  className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-black placeholder:text-indigo-900/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>
            </div>

            {/* Gallery Images Upload */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-indigo-900/70">
                Gallery Images
              </label>
              <MediaUploadButton
                folder="reena-gore/landing-pages/galleries"
                onUpload={handleGalleryImageUpload}
                buttonText="Upload Image"
              />

              {formData.galleryDetails.galleryImages?.length > 0 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {formData.galleryDetails.galleryImages.map((image, index) => (
                    <div key={`${image.url}-${index}`} className="group relative rounded-xl border border-indigo-200 bg-white p-2">
                      <img
                        src={image.url}
                        alt={`Gallery ${index + 1}`}
                        className="h-48 w-full rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-700"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/landing-pages")}
            className="rounded-xl border border-indigo-200 bg-white px-6 py-3 text-sm font-medium text-indigo-900 transition-all duration-200 hover:border-[#FFD700] hover:text-[#FFD700]"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={saving}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-black px-6 py-3 text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20 disabled:cursor-not-allowed disabled:opacity-60 min-w-[180px]"
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
                  {isEditMode ? "Update Landing Page" : "Create Landing Page"}
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