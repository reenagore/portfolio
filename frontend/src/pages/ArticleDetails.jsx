import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPublicArticleBySlug } from "../services/article.service";

export default function ArticleDetails() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeHeading, setActiveHeading] = useState("");
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await getPublicArticleBySlug(slug);
        setArticle(res.data);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  useEffect(() => {
    if (article?.content) {
      // Extract headings from content
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = article.content;
      const headingElements = tempDiv.querySelectorAll("h2, h3");
      const extractedHeadings = Array.from(headingElements).map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.textContent,
        level: heading.tagName.toLowerCase(),
      }));
      setHeadings(extractedHeadings);
    }
  }, [article]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = document.querySelectorAll("h2, h3");
      let currentHeading = "";
      headingElements.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          currentHeading = heading.textContent;
        }
      });
      setActiveHeading(currentHeading);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHeading = (headingText) => {
    const headingElement = Array.from(document.querySelectorAll("h2, h3")).find(
      (el) => el.textContent === headingText
    );
    if (headingElement) {
      headingElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-slate-500">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500">Article not found.</p>
          <Link to="/insights" className="mt-4 inline-block text-indigo-600 hover:underline">
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section with Image Left, Content Right */}
      <div className="border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            {/* Left - Cover Image */}
            {article.coverImage?.url && (
              <div className="order-2 md:order-1">
                <img
                  src={article.coverImage.url}
                  alt={article.title}
                  className="w-full rounded-xl object-cover border border-slate-200 shadow-md"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            )}

            {/* Right - Title and Description */}
            <div className="order-1 md:order-2">
              <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
                {article.category}
              </p>

              <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
                {article.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                <span className="font-medium text-slate-700">{article.authorName || "Reena Gore"}</span>
                <span>•</span>
                <span>{article.readTime || 1} min read</span>
                {article.publishedAt && (
                  <>
                    <span>•</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </>
                )}
              </div>

              {article.excerpt && (
                <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                  {article.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content and Table of Contents */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content - 70% on desktop */}
          <div className="w-full lg:w-2/3">
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-li:text-slate-600">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {/* Tags Footer */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
                <span className="text-sm font-medium text-slate-700">Tags:</span>
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Back Button */}
            <div className="mt-8">
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Articles
              </Link>
            </div>
          </div>

          {/* Table of Contents - 30% on desktop */}
          {headings.length > 0 && (
            <div className="w-full lg:w-1/3">
              <div className="sticky top-6 rounded-lg border border-slate-200 bg-slate-50/50 p-5">
                <h3 className="text-base font-semibold text-slate-900">Table of Contents</h3>
                <nav className="mt-3">
                  <ul className="space-y-2">
                    {headings.map((heading, index) => (
                      <li key={index}>
                        <button
                          onClick={() => scrollToHeading(heading.text)}
                          className={`text-left text-sm transition hover:text-indigo-600 ${
                            activeHeading === heading.text
                              ? "font-medium text-indigo-600"
                              : "text-slate-600"
                          } ${heading.level === "h3" ? "ml-4" : ""}`}
                        >
                          {heading.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}