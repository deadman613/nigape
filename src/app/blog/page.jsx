import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { getBaseUrl } from "@/lib/base-url";
import "@/styles/blog.css";

const fetchBlogs = async (searchParams) => {
  const baseUrl = await getBaseUrl();
  const queryString = new URLSearchParams(searchParams).toString();
  const separator = queryString ? "?" : "";
  const res = await fetch(`${baseUrl}/api/blog${separator}${queryString}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

export const metadata = {
  title: "Blog | NIGAPE",
  description: "AI insights, career playbooks, and tech updates from the NIGAPE team.",
};

export default async function BlogPage({ searchParams }) {
  const params = (await searchParams) || {};
  const resolvedParams = { ...params };
  const page = Number(resolvedParams.page) || 1;
  const searchQuery = resolvedParams.search || "";
  const currentTag = resolvedParams.tag || "";
  const baseUrl = await getBaseUrl();

  let data;
  try {
    data = await fetchBlogs({ ...resolvedParams, page });
  } catch (error) {
    console.error(error);
    data = { data: [], pagination: { page: 1, totalPages: 1, limit: 0, total: 0 } };
  }

  const blogs = data?.data || [];
  const hasFilters = Boolean(searchQuery || currentTag);
  const gridBlogs = blogs;
  const discoveredTags = Array.from(new Set(blogs.flatMap((b) => b.tags || []))).slice(0, 10);

  return (
    <main className="min-h-screen bg-black text-white font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Hero ── */}
        <div className="relative rounded-3xl overflow-hidden border border-[#9234eb]/30 bg-gradient-to-br from-[#0d0d1a] to-[#120820] p-8 sm:p-12 mb-10 shadow-2xl">
          {/* glow blobs */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#9234eb]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#FF40EB]/15 blur-3xl" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-[#FF40EB] font-semibold text-sm uppercase tracking-widest mb-2">Stories & Updates</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
                Insights for{" "}
                <span className="bg-gradient-to-r from-[#9234eb] to-[#FF40EB] bg-clip-text text-transparent">
                  Builders & Learners
                </span>
              </h1>
              <p className="text-white/60 max-w-xl leading-relaxed">
                AI trends, career playbooks, and real-world guides from the NIGAPE team.
              </p>
              <p className="text-white/40 text-sm mt-3">{data?.pagination?.total || 0} articles · Updated weekly</p>
            </div>
          </div>
        </div>

        {/* ── Search + Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <form
            className="flex flex-1 items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus-within:border-[#9234eb]/60 transition-colors"
            action="/blog"
            method="GET"
            role="search"
          >
            <input type="hidden" name="tag" value={currentTag} />
            <svg className="w-4 h-4 text-white/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="search"
              name="search"
              placeholder="Search articles…"
              defaultValue={searchQuery}
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white/30"
            />
            <button
              type="submit"
              className="text-xs font-semibold px-3 py-1 rounded-xl bg-[#9234eb] hover:bg-[#7b2cbf] transition-colors text-white"
            >
              Search
            </button>
          </form>

          {hasFilters && (
            <Link
              href="/blog"
              className="flex items-center gap-1 px-4 py-2 rounded-2xl border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20 text-sm transition-colors"
            >
              ✕ Clear filters
            </Link>
          )}
        </div>

        {/* ── Tag chips ── */}
        {discoveredTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {discoveredTags.map((tag) => {
              const tp = new URLSearchParams();
              tp.set("tag", tag);
              if (searchQuery) tp.set("search", searchQuery);
              const isActive = tag === currentTag;
              return (
                <Link
                  key={tag}
                  href={`/blog?${tp.toString()}`}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    isActive
                      ? "bg-[#9234eb] border-[#9234eb] text-white shadow-lg shadow-[#9234eb]/30"
                      : "border-[#9234eb]/30 text-white/60 hover:border-[#9234eb]/70 hover:text-white bg-white/5"
                  }`}
                >
                  #{tag}
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Section heading ── */}
        {gridBlogs.length > 0 && (
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-semibold text-white/80">
              {hasFilters ? "Search results" : "All Articles"}
            </h2>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-sm">{gridBlogs.length} posts</span>
          </div>
        )}

        {/* ── Grid ── */}
        {gridBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {gridBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} baseUrl={baseUrl} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-3xl border border-dashed border-white/10 text-white/40">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-white/60">No posts found</p>
            <p className="text-sm mt-1">Try a different keyword or{" "}
              <Link href="/blog" className="text-[#9234eb] hover:underline">clear filters</Link>
            </p>
          </div>
        )}

        {/* ── Pagination ── */}
        {data?.pagination?.totalPages > 1 && (
          <nav className="flex justify-center items-center gap-2" aria-label="Blog pagination">
            {data.pagination.page > 1 && (
              <Link
                href={`/blog?${(() => { const p = new URLSearchParams(resolvedParams); p.set("page", String(data.pagination.page - 1)); return p.toString(); })()}`}
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:border-[#9234eb]/50 hover:text-white text-sm transition-all"
              >
                ← Prev
              </Link>
            )}
            {Array.from({ length: data.pagination.totalPages }).map((_, i) => {
              const n = i + 1;
              const isActive = n === data.pagination.page;
              const p = new URLSearchParams(resolvedParams);
              p.set("page", n.toString());
              return (
                <Link
                  key={n}
                  href={`/blog?${p.toString()}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#9234eb] text-white shadow-lg shadow-[#9234eb]/30"
                      : "border border-white/10 bg-white/5 text-white/60 hover:border-[#9234eb]/40 hover:text-white"
                  }`}
                >
                  {n}
                </Link>
              );
            })}
            {data.pagination.page < data.pagination.totalPages && (
              <Link
                href={`/blog?${(() => { const p = new URLSearchParams(resolvedParams); p.set("page", String(data.pagination.page + 1)); return p.toString(); })()}`}
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:border-[#9234eb]/50 hover:text-white text-sm transition-all"
              >
                Next →
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}

