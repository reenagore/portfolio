import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPublicProductBySlug } from "../services/product.service";
import PurchaseModal from "../components/common/PurchaseModal";

export default function ProductDetails() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getPublicProductBySlug(slug);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-slate-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500">Product not found.</p>
          <Link to="/products" className="mt-4 inline-block text-indigo-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price, currency = "KES") => {
    return `${currency} ${price?.toLocaleString() || 0}`;
  };

  return (
    <div className="bg-white">
      <PurchaseModal
        isOpen={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        product={product}
      />

      {/* Hero Section */}
      <div className="border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {/* Left - Image */}
            <div>
              {product.coverImage?.url ? (
                <img
                  src={product.coverImage.url}
                  alt={product.title}
                  className="w-full rounded-lg object-cover border border-slate-200"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-slate-100 border border-slate-200">
                  <svg
                    className="h-12 w-12 text-slate-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Right - Content */}
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
                {product.format?.toUpperCase() || "PRODUCT"}
              </p>

              <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
                {product.title}
              </h1>

              <p className="mt-4 text-2xl font-semibold text-slate-900">
                {formatPrice(product.cost, product.currency)}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {product.paymentEnabled ? (
                  <button
                    onClick={() => setPurchaseOpen(true)}
                    className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
                  >
                    Buy Now
                  </button>
                ) : (
                  <Link
                    to="/contact"
                    className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
                  >
                    Enquire Now
                  </Link>
                )}

                <Link
                  to="/products"
                  className="rounded-md border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Description - 2/3 width */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-900">Product Overview</h2>

            <div
              className="prose prose-slate mt-5 max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-600"
              dangerouslySetInnerHTML={{
                __html: product.description || "<p>Product details will be available soon.</p>",
              }}
            />
          </div>

          {/* Sidebar - 1/3 width */}
          <div>
            <div className="sticky top-6 rounded-lg border border-slate-200 bg-slate-50/50 p-5">
              <h3 className="text-base font-semibold text-slate-900">Quick Details</h3>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Price</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {formatPrice(product.cost, product.currency)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Format</p>
                  <p className="mt-1 text-slate-700">
                    {product.format?.toUpperCase() || "Digital Download"}
                  </p>
                </div>

                {product.downloadFileName && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">File Name</p>
                    <p className="mt-1 text-sm text-slate-600 break-all">
                      {product.downloadFileName}
                    </p>
                  </div>
                )}
              </div>

              {product.paymentEnabled && (
                <button
                  onClick={() => setPurchaseOpen(true)}
                  className="mt-5 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}