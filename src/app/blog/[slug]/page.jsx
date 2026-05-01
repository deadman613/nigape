import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBaseUrl } from "@/lib/base-url";
import BlogCard from "@/components/BlogCard";
import "@/styles/blog.css";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(value));

const toText = (html) => (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const calculateReadingMinutes = (html) => {
  const words = toText(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
};

const parseJsonLd = (value) => {
  if (!value || typeof value !== "string") {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const fetchBlog = async (slug) => {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
};

const fetchRelated = async (slug, baseUrl) => {
  // Try tag-based related posts first
  const res = await fetch(`${baseUrl}/api/blog?relatedTo=${slug}&limit=3`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return { data: [] };
  const result = await res.json();

  // If no tag-matched posts, fall back to latest posts (excluding current)
  if (!result.data?.length) {
    const fallback = await fetch(
      `${baseUrl}/api/blog?excludeSlug=${slug}&limit=3`,
      { next: { revalidate: 60 } }
    );
    if (!fallback.ok) return { data: [] };
    return fallback.json();
  }

  return result;
};

export async function generateMetadata(props) {
  const params = await props?.params;
  const slug = params?.slug;
  const blog = slug ? await fetchBlog(slug) : null;

  if (!blog) {
    return {
      title: "Post Not Found",
    };
  }

  const baseUrl = await getBaseUrl();
  const description = blog.content.replace(/<[^>]+>/g, " ").slice(0, 150);
  const isExternalCover = Boolean(blog.coverImg && /^(https?:)?\/\//i.test(blog.coverImg));
  const image = blog.coverImg
    ? isExternalCover
      ? blog.coverImg
      : new URL(blog.coverImg, baseUrl).toString()
    : undefined;
  const canonical = new URL(`/blog/${blog.slug}`, baseUrl).toString();

  return {
    title: blog.title,
    description,
    openGraph: {
      title: blog.title,
      description,
      images: image ? [image] : undefined,
      type: "article",
      url: canonical,
    },
    alternates: { canonical },
  };
}

export default async function BlogDetails(props) {
  const params = await props?.params;
  const slug = params?.slug;
  const blog = slug ? await fetchBlog(slug) : null;

  if (!blog) {
    notFound();
  }

  const baseUrl = await getBaseUrl();
  const related = await fetchRelated(slug, baseUrl);
  const cover = blog.coverImg?.trim();
  const isExternalCover = Boolean(cover && /^(https?:)?\/\//i.test(cover));
  const hasCover = Boolean(cover);
  const imageSrc = hasCover ? cover : "/placeholder.svg";
  const isPlaceholder = !hasCover;
  const canonical = `${baseUrl}/blog/${blog.slug}`;
  const readingMinutes = calculateReadingMinutes(blog.content);
  const publishedDate = formatDate(blog.createdAt);
  const updatedDate = formatDate(blog.updatedAt ?? blog.createdAt);
  const generatedJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    url: canonical,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt ?? blog.createdAt,
    author: {
      "@type": "Person",
      name: "Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Blogcode",
    },
    image: hasCover
      ? isExternalCover
        ? imageSrc
        : new URL(imageSrc, baseUrl).toString()
      : undefined,
    description: blog.content.replace(/<[^>]+>/g, " ").slice(0, 160),
  };
  const customJsonLd = parseJsonLd(blog.schemaJsonLd);
  const jsonLd = customJsonLd || generatedJsonLd;

  return (
    <main id="main-content" className="blog-detail" role="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article aria-labelledby="blog-title">
        <header className="blog-detail__header">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/blog">Blog</Link>
            <span aria-hidden="true">/</span>
            <span>{blog.title}</span>
          </nav>

          <p className="eyebrow">{publishedDate}</p>
          <h1 id="blog-title">{blog.title}</h1>

          <div className="blog-detail__meta" aria-label="Post details">
            <span>{readingMinutes} min read</span>
            <span>Updated {updatedDate}</span>
            <span>By Editorial Team</span>
          </div>

          {blog.tags?.length ? (
            <div className="tags" aria-label="Post tags">
              {blog.tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                  #{tag}
                </Link>
              ))}
            </div>
          ) : null}
        </header>

        <div className={`cover${isPlaceholder ? " cover--placeholder" : ""}`}>
          <Image
            src={imageSrc}
            alt={blog.title}
            fill
            sizes="(max-width: 900px) 100vw, 840px"
            priority
            style={{ objectFit: "cover" }}
            unoptimized={isExternalCover}
          />
          {isPlaceholder ? <span className="cover__hint">Upload a cover image from the admin panel to replace this default artwork.</span> : null}
        </div>

        <div className="content" dangerouslySetInnerHTML={{ __html: blog.content }} />

        <section className="blog-detail__footer-cta" aria-label="Continue reading">
          <p>Want more insights like this?</p>
          <div>
            <Link href="/blog" className="btn btn--ghost">
              Browse all posts
            </Link>
            <Link href="/contact-us" className="btn btn--primary">
              Contact team
            </Link>
          </div>
        </section>
      </article>

      {related?.data?.length ? (
        <aside className="related-cards" aria-label="Recommended posts">
          <div className="related-cards__header">
            <h3>Recommended Reading</h3>
            <Link href="/blog" className="related-cards__all">All articles →</Link>
          </div>
          <div className="related-cards__grid">
            {related.data.map((item) => (
              <BlogCard key={item.id} blog={item} baseUrl={baseUrl} />
            ))}
          </div>
        </aside>
      ) : null}
    </main>
  );
}
