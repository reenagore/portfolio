import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicGalleryBySlug } from "../services/galleryPage.service";

export default function GalleryDetails() {
  const { slug } = useParams();

  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await getPublicGalleryBySlug(slug);
        setGallery(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-40 text-center">
        Loading gallery...
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="py-40 text-center">
        Gallery not found.
      </div>
    );
  }

  return (
    <div className="bg-white">

      {/* Hero */}

      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={gallery.coverImage?.url}
          alt={gallery.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-20 text-white md:px-6">
          <div>
            <h1 className="max-w-4xl text-5xl font-bold leading-tight">
              {gallery.title}
            </h1>

            <p className="mt-4 text-lg text-white/90">
              {gallery.images?.length || 0} Photos
            </p>
          </div>
        </div>
      </section>

      {/* Description */}

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6">

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: gallery.description,
            }}
          />

        </div>
      </section>

      {/* Video */}

      {gallery.videoUrl && (
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">

            <div className="overflow-hidden rounded-3xl shadow-xl">

              <iframe
                src={gallery.videoUrl}
                title={gallery.title}
                className="aspect-video w-full"
                allowFullScreen
              />

            </div>

          </div>
        </section>
      )}

      {/* Images */}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">

          <div className="columns-1 gap-5 md:columns-2 lg:columns-3">

            {gallery.images?.map((image, index) => (
              <div
                key={index}
                className="mb-5 overflow-hidden rounded-2xl"
              >
                <img
                  src={image.url}
                  alt={`${gallery.title}-${index}`}
                  className="w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}