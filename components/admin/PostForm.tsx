"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Save, Globe, Eye } from "lucide-react";

/* Load Tiptap editor client-side only (it uses browser APIs) */
const PostEditor = dynamic(() => import("./PostEditor"), { ssr: false });

const CATEGORIES = ["Trends", "Care", "Before & After", "Camp Hill"];

interface PostFormProps {
  /** Existing post data for edit mode; undefined for create mode. */
  initialData?: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    tags: string[];
    published: boolean;
    metaTitle: string;
    metaDescription: string;
  };
}

/**
 * Shared create/edit form for blog posts.
 * Calls POST /api/posts for new posts, PUT /api/posts/[id] for edits.
 */
export default function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? "");
  const [category, setCategory] = useState(initialData?.category ?? CATEGORIES[0]);
  const [tags, setTags] = useState(initialData?.tags?.join(", ") ?? "");
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async (shouldPublish?: boolean) => {
    setSaving(true);
    setError("");

    const body = {
      title, excerpt, content, coverImage, category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      published: shouldPublish ?? published,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
    };

    try {
      const url = isEdit ? `/api/posts/${initialData!.id}` : "/api/posts";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Save failed");
      }

      const post = await res.json();
      router.push(`/dashboard/posts/${post.id}/edit`);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-[32px] text-ink">
          {isEdit ? "Edit post" : "New post"}
        </h1>
        <div className="flex items-center gap-3">
          {isEdit && initialData?.published && (
            <a
              href={`/journal/${title.toLowerCase().replace(/\s+/g, "-")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-[12px] text-ink-faint hover:text-gold-deep transition-colors"
            >
              <Eye size={14} /> Preview ↗
            </a>
          )}
          <button
            onClick={() => save(false)}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 font-sans text-[12px] tracking-[0.15em] uppercase font-medium border border-rule text-ink hover:border-gold transition-all disabled:opacity-60"
          >
            <Save size={14} />
            Save draft
          </button>
          <button
            onClick={() => save(true)}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 font-sans text-[12px] tracking-[0.15em] uppercase font-medium bg-ink text-cream border border-ink hover:bg-gold-deep hover:border-gold-deep transition-all disabled:opacity-60"
          >
            <Globe size={14} />
            {published ? "Update & publish" : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 font-sans text-[13px] rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

        {/* Main content */}
        <div className="flex flex-col gap-5">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title…"
            className="font-serif text-[28px] text-ink border-b-2 border-rule focus:border-gold outline-none bg-transparent py-2 placeholder:text-ink-faint/50 transition-colors"
          />

          {/* Excerpt */}
          <div>
            <label className="block font-sans text-[11px] tracking-[0.2em] uppercase text-ink-faint mb-2">
              Excerpt (shown in card and meta description)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              placeholder="A short summary of the post…"
              className="w-full font-serif text-[16px] text-ink border border-rule bg-white p-3 outline-none focus:border-gold transition-colors resize-none rounded"
            />
          </div>

          {/* Cover image */}
          <div>
            <label className="block font-sans text-[11px] tracking-[0.2em] uppercase text-ink-faint mb-2">
              Cover image URL
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://…"
              className="w-full font-sans text-[14px] text-ink border border-rule bg-white p-3 rounded outline-none focus:border-gold transition-colors"
            />
            {coverImage && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={coverImage} alt="Cover preview" className="mt-2 h-32 object-cover rounded border border-rule" />
            )}
          </div>

          {/* Body editor */}
          <div>
            <label className="block font-sans text-[11px] tracking-[0.2em] uppercase text-ink-faint mb-2">
              Body content
            </label>
            <PostEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Category */}
          <div className="bg-white border border-rule rounded-lg p-4">
            <label className="block font-sans text-[11px] tracking-[0.2em] uppercase text-ink-faint mb-3">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full font-sans text-[14px] text-ink border border-rule bg-cream-warm p-2.5 rounded outline-none focus:border-gold transition-colors"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white border border-rule rounded-lg p-4">
            <label className="block font-sans text-[11px] tracking-[0.2em] uppercase text-ink-faint mb-3">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="gel manicure, Brisbane, trends"
              className="w-full font-sans text-[14px] text-ink border border-rule bg-cream-warm p-2.5 rounded outline-none focus:border-gold transition-colors"
            />
          </div>

          {/* Published toggle */}
          <div className="bg-white border border-rule rounded-lg p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 accent-gold"
              />
              <span className="font-sans text-[13px] text-ink font-medium">Published</span>
            </label>
            <p className="font-sans text-[12px] text-ink-faint mt-1.5">
              {published ? "Visible to all visitors." : "Only visible to admins."}
            </p>
          </div>

          {/* SEO overrides */}
          <div className="bg-white border border-rule rounded-lg p-4">
            <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-ink-faint mb-3">
              SEO overrides <span className="normal-case text-[10px]">(optional)</span>
            </div>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Meta title…"
              className="w-full font-sans text-[13px] text-ink border border-rule bg-cream-warm p-2.5 rounded outline-none focus:border-gold transition-colors mb-2"
            />
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              placeholder="Meta description…"
              className="w-full font-sans text-[13px] text-ink border border-rule bg-cream-warm p-2.5 rounded outline-none focus:border-gold transition-colors resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
