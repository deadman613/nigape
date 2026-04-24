"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BlogEditor from "@/components/BlogEditor";
import { withAdminCsrf } from "@/lib/client-csrf";

const baseState = {
  title: "",
  slug: "",
  coverImg: "",
  tags: "",
  content: "",
};

const clientSlugify = (raw = "") =>
  raw
    .toString()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const slugHelpId = "blog-form-slug-help";
const tagsHelpId = "blog-form-tags-help";

const BlogForm = ({ initialData = null, mode = "create" }) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState(() => ({
    ...baseState,
    ...initialData,
    tags: initialData?.tags?.join(", ") || initialData?.tags || "",
    content: initialData?.content || "",
  }));
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const formTitle = useMemo(() => (mode === "edit" ? "Update Post" : "Create Post"), [mode]);
  const titleLength = formValues.title.trim().length;
  const contentText = formValues.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = contentText ? contentText.split(" ").length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 220));
  const normalizedSlug = (formValues.slug || clientSlugify(formValues.title) || "").trim();
  const tagCount = formValues.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean).length;
  const checklist = [
    { label: "Title added", ok: Boolean(formValues.title.trim()) },
    { label: "Slug ready", ok: Boolean(normalizedSlug) },
    { label: "Content added", ok: wordCount > 0 },
    { label: "Cover image set", ok: Boolean(formValues.coverImg.trim()) },
  ];

  useEffect(() => {
    if (!slugTouched && formValues.title) {
      setFormValues((prev) => ({
        ...prev,
        slug: clientSlugify(prev.title) || prev.slug,
      }));
    }
  }, [formValues.title, slugTouched]);

  const setField = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus({ type: null, message: "" });

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      const response = await fetch(
        "/api/upload",
        withAdminCsrf({
          method: "POST",
          body: uploadData,
        })
      );
      const result = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error("Session expired. Please sign in again.");
      }
      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }
      setField("coverImg", result.url);
      setStatus({ type: "success", message: "Image uploaded" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      if (!formValues.title.trim() || !formValues.content.trim()) {
        throw new Error("Title and content are required");
      }

      const payload = {
        title: formValues.title.trim(),
        slug: formValues.slug.trim() || clientSlugify(formValues.title),
        coverImg: formValues.coverImg?.trim() || "",
        tags: formValues.tags,
        content: formValues.content,
      };

      const isEdit = mode === "edit" && initialData?.id;
      const endpoint = isEdit ? `/api/blog/${initialData.id}` : "/api/blog";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(
        endpoint,
        withAdminCsrf({
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      );

      const result = await response.json().catch(() => ({}));

      if (response.status === 401) {
        throw new Error("Session expired. Please sign in again.");
      }
      if (!response.ok) {
        throw new Error(result.error || "Unable to save blog");
      }

      setStatus({ type: "success", message: isEdit ? "Post updated" : "Post created" });
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit} aria-busy={submitting || uploading}>
      <header className="admin-form__header">
        <div>
          <p className="eyebrow">Publishing Studio</p>
          <h2>{formTitle}</h2>
          <p>Build, optimize, and publish posts from a single workspace.</p>
        </div>
        <div className="admin-form__meta" aria-label="Writing stats">
          <span>{wordCount} words</span>
          <span>{readTime} min read</span>
          <span>{tagCount} tags</span>
        </div>
      </header>

      <div className="blog-workspace">
        <section className="blog-workspace__main">
          <label className="field field--title">
            <span>Title</span>
            <input
              type="text"
              name="title"
              required
              maxLength={140}
              value={formValues.title}
              onChange={(event) => setField("title", event.target.value)}
              placeholder="Write a clear, benefit-driven headline"
            />
            <small>{titleLength}/140</small>
          </label>

          <label className="editor-label">
            <span>Content</span>
            <BlogEditor value={formValues.content} onChange={(html) => setField("content", html)} />
          </label>
        </section>

        <aside className="blog-workspace__side" aria-label="Post settings">
          <section className="admin-card">
            <h3>Post Settings</h3>

            <label className="field">
              <span>Slug</span>
              <input
                type="text"
                name="slug"
                value={formValues.slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setField("slug", clientSlugify(event.target.value));
                }}
                aria-describedby={slugHelpId}
                placeholder="your-post-slug"
              />
              <small id={slugHelpId}>Auto-generated from title. You can edit it before publishing.</small>
            </label>

            <p className="slug-preview">/blog/{normalizedSlug || "your-post-slug"}</p>

            <label className="field">
              <span>Tags</span>
              <input
                type="text"
                name="tags"
                placeholder="marketing, release, seo"
                value={formValues.tags}
                onChange={(event) => setField("tags", event.target.value)}
                aria-describedby={tagsHelpId}
              />
              <small id={tagsHelpId}>Comma-separated topics used for search and related posts.</small>
            </label>
          </section>

          <section className="admin-card">
            <h3>Cover Image</h3>
            <label className="field">
              <span>Image URL</span>
              <input
                type="text"
                name="coverImg"
                placeholder="https://"
                value={formValues.coverImg}
                onChange={(event) => setField("coverImg", event.target.value)}
              />
            </label>

            <label className="field field--file">
              <span>Upload image</span>
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} disabled={uploading} />
              <small>
                {uploading
                  ? "Uploading..."
                  : "JPEG, PNG, and WebP only. Upload goes to ImgBB and URL is filled automatically."}
              </small>
            </label>

            {formValues.coverImg?.trim() ? (
              <div className="cover-preview">
                <img src={formValues.coverImg} alt="Cover preview" loading="lazy" />
              </div>
            ) : (
              <p className="cover-preview--empty">No cover selected yet.</p>
            )}
          </section>

          <section className="admin-card">
            <h3>Publish Checklist</h3>
            <ul className="publish-checklist">
              {checklist.map((item) => (
                <li key={item.label} className={item.ok ? "is-complete" : ""}>
                  <span aria-hidden="true">{item.ok ? "✓" : "•"}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {status.message ? (
        <p
          className={`form-status form-status--${status.type}`}
          role={status.type === "error" ? "alert" : "status"}
          aria-live={status.type === "error" ? "assertive" : "polite"}
        >
          {status.message}
        </p>
      ) : null}

      <div className="form-actions">
        <button type="button" className="btn btn--ghost" onClick={() => router.push("/admin/blog")}> 
          Cancel
        </button>
        <button type="submit" className="btn btn--primary" disabled={submitting || uploading}>
          {submitting ? "Saving..." : formTitle}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
