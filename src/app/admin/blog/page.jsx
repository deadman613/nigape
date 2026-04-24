import Link from "next/link";
import DeleteBlogButton from "@/components/DeleteBlogButton";
import prisma from "@/lib/prisma";

const fetchBlogs = async () =>
  prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));

export default async function AdminBlogPage() {
  let blogs = [];
  try {
    blogs = await fetchBlogs();
  } catch (error) {
    console.error(error);
  }

  const totalTags = blogs.reduce((count, blog) => count + (blog.tags?.length || 0), 0);
  const latestPost = blogs[0];

  return (
    <section className="admin-panel">
      <header className="admin-panel__header">
        <div>
          <p className="eyebrow">Content Hub</p>
          <h1>Blog Control Panel</h1>
          <p>Manage, update, and publish every article powering your sites from one workspace.</p>
        </div>
        <Link href="/admin/blog/create" className="btn btn--primary">
          + New Post
        </Link>
      </header>

      <div className="admin-kpi-grid" aria-label="Blog metrics">
        <article>
          <h3>{blogs.length}</h3>
          <p>Total Posts</p>
        </article>
        <article>
          <h3>{totalTags}</h3>
          <p>Total Tags Used</p>
        </article>
        <article>
          <h3>{latestPost ? formatDate(latestPost.createdAt) : "-"}</h3>
          <p>Last Published</p>
        </article>
      </div>

      {blogs.length ? (
        <div className="admin-post-grid">
          {blogs.map((blog) => (
            <article key={blog.id} className="admin-post-card">
              <div>
                <h3>{blog.title}</h3>
                <p className="admin-table__meta">Published {formatDate(blog.createdAt)}</p>
                <p className="admin-post-card__slug">/blog/{blog.slug}</p>
                <p className="admin-post-card__tags">{blog.tags?.length ? blog.tags.join(" • ") : "No tags"}</p>
              </div>

              <div className="admin-table__actions">
                <Link href={`/blog/${blog.slug}`} className="btn btn--ghost" target="_blank" rel="noreferrer">
                  View
                </Link>
                <Link href={`/admin/blog/edit/${blog.id}`} className="btn">
                  Edit
                </Link>
                <DeleteBlogButton id={blog.id} title={blog.title} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty">No posts yet. Click “+ New Post” to publish your first article.</p>
      )}
    </section>
  );
}
