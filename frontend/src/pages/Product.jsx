import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicProducts } from "../services/product.service";

export default function Products() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getPublicProducts();
        setProducts(res.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price, currency = "KES") => {
    return `${currency} ${price?.toLocaleString() || 0}`;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-4xl">
                Our Products
            </h1>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] rounded-lg bg-slate-200"></div>
                <div className="mt-4 h-4 w-20 rounded bg-slate-200"></div>
                <div className="mt-3 h-6 w-3/4 rounded bg-slate-200"></div>
                <div className="mt-2 h-4 w-full rounded bg-slate-200"></div>
                <div className="mt-2 h-4 w-2/3 rounded bg-slate-200"></div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="h-5 w-20 rounded bg-slate-200"></div>
                  <div className="h-5 w-16 rounded bg-slate-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-slate-500">No products available.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product.slug}`}
                className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:shadow-md"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  {product.coverImage?.url ? (
                    <img
                      src={product.coverImage.url}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
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

                {/* Content */}
                <div className="p-5">
                  {/* Format */}
                  <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                    {product.format?.toUpperCase() || "RESOURCE"}
                  </p>

                  {/* Title */}
                  <h2 className="mt-2 text-lg font-semibold text-slate-900 line-clamp-2">
                    {product.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {product.description?.replace(/<[^>]+>/g, "").slice(0, 120)}
                    {product.description?.length > 120 ? "..." : ""}
                  </p>

                  {/* Price and CTA */}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-base font-semibold text-slate-900">
                      {formatPrice(product.cost, product.currency)}
                    </span>

                    <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition group-hover:gap-2">
                      View Details
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}