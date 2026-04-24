import Link from "next/link";
import Image from "next/image";
import BlogCard from "@/components/BlogCard";
import { getBaseUrl } from "@/lib/base-url";
import "@/styles/blog.css";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));

const toExcerpt = (html, maxLength = 210) => {
  if (!html) return "";
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const fetchBlogs = async (searchParams) => {
  const baseUrl = await getBaseUrl();
  const queryString = new URLSearchParams(searchParams).toString();
  const separator = queryString ? "?" : "";
  const res = await fetch(`${baseUrl}/api/blog${separator}${queryString}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};

export const metadata = {
  title: "Blog",
  description: "Latest posts across every site using this shared template.",
};

export default async function BlogPage({ searchParams }) {
  const params = (await searchParams) || {};
  const resolvedParams = { ...params };
  const page = Number(resolvedParams.page) || 1;
  const searchQuery = resolvedParams.search || "";
  const currentTag = resolvedParams.tag || "";

  let data;
  try {
    data = await fetchBlogs({ ...resolvedParams, page });
  } catch (error) {
    console.error(error);
    data = { data: [], pagination: { page: 1, totalPages: 1, limit: 0, total: 0 } };
  }

  const blogs = data?.data || [];
  const hasFilters = Boolean(searchQuery || currentTag);
  const featured = !hasFilters && page === 1 && blogs.length ? blogs[0] : null;
  const gridBlogs = featured ? blogs.slice(1) : blogs;
  const discoveredTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags || []))).slice(0, 8);
  const featuredCover = featured?.coverImg?.trim() || "/placeholder.svg";
  const featuredExternal = Boolean(featuredCover && /^(https?:)?\/\//i.test(featuredCover));

  return (
    <main id="main-content" className="blog-index" role="main">
      <header className="blog-index__hero">
        <div className="blog-index__hero-copy">
          <p className="eyebrow">Stories & Updates</p>
          <h1>Insights for Builders and Learners</h1>
          <p>
            Explore practical playbooks, AI trends, and industry updates from our team.
            Use search and tags to quickly find what matters to you.
          </p>
          <div className="blog-index__hero-meta">
            <span>{data?.pagination?.total || 0} articles</span>
            <span>Updated weekly</span>
          </div>
        </div>
        <div className="blog-index__hero-actions">
          <Link href="/admin/blog/create" className="btn btn--ghost">
            + New Post
          </Link>
          <Link href="/contact-us" className="btn btn--primary">
            Work With Us
          </Link>
        </div>
      </header>

      <section className="blog-toolbar" aria-label="Blog controls">
        <form className="blog-search" action="/blog" method="GET" role="search" aria-label="Blog search">
          <input type="hidden" name="tag" value={currentTag} />
          <input
            type="search"
            name="search"
            placeholder="Search by title, content, or tags"
            defaultValue={searchQuery}
            aria-label="Search blog posts"
          />
          <button type="submit">Search</button>
        </form>

        {hasFilters ? (
          <Link href="/blog" className="blog-clear-filters">
            Clear filters
          </Link>
        ) : null}
      </section>

      {discoveredTags.length ? (
        <section className="blog-topics" aria-label="Popular topics">
          {discoveredTags.map((tag) => {
            const tagParams = new URLSearchParams();
            tagParams.set("tag", tag);
            if (searchQuery) {
              tagParams.set("search", searchQuery);
            }

            return (
              <Link
                key={tag}
                href={`/blog?${tagParams.toString()}`}
                className={tag === currentTag ? "is-active" : ""}
              >
                #{tag}
              </Link>
            );
          })}
        </section>
      ) : null}

      {featured ? (
        <article className="blog-featured">
          <Link href={`/blog/${featured.slug}`} className="blog-featured__media" aria-label={`Read ${featured.title}`}>
            <Image
              src={featuredCover}
              alt={featured.title}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              unoptimized={featuredExternal}
              priority
            />
          </Link>

          <div className="blog-featured__copy">
            <p className="eyebrow">Featured article</p>
            <h2>
              <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p>{toExcerpt(featured.content, 240)}</p>
            <div className="blog-featured__meta">
              <span>{formatDate(featured.createdAt)}</span>
              <span>{featured.tags?.slice(0, 3).join(" • ") || "General"}</span>
            </div>
            <Link href={`/blog/${featured.slug}`} className="btn btn--primary">
              Read featured post
            </Link>
          </div>
        </article>
      ) : null}

      {gridBlogs.length ? (
        <div className="blog-grid">
          {gridBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="empty">No posts found for this filter. Try a different keyword or topic.</p>
      )}

      {data?.pagination?.totalPages > 1 && (
        <nav className="pagination" aria-label="Blog pagination">
          {data.pagination.page > 1 ? (
            <Link
              href={`/blog?${(() => {
                const prevParams = new URLSearchParams(resolvedParams);
                prevParams.set("page", String(data.pagination.page - 1));
                return prevParams.toString();
              })()}`}
            >
              Prev
            </Link>
          ) : null}

          {Array.from({ length: data.pagination.totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            const isActive = pageNumber === data.pagination.page;
            const paramsClone = new URLSearchParams(resolvedParams);
            paramsClone.set("page", pageNumber.toString());

            return (
              <Link key={pageNumber} href={`/blog?${paramsClone.toString()}`} aria-current={isActive ? "page" : undefined}>
                {pageNumber}
              </Link>
            );
          })}

          {data.pagination.page < data.pagination.totalPages ? (
            <Link
              href={`/blog?${(() => {
                const nextParams = new URLSearchParams(resolvedParams);
                nextParams.set("page", String(data.pagination.page + 1));
                return nextParams.toString();
              })()}`}
            >
              Next
            </Link>
          ) : null}
        </nav>
      )}
    </main>
  );
}
