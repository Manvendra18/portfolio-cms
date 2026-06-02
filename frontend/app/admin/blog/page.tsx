"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { api } from "@/lib/api";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  published: boolean;
}

const empty = { title: "", slug: "", content: "", tags: "", published: false };

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPosts = () => api("/blog/all").then(setPosts);
  useEffect(() => { fetchPosts(); }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const payload = { ...form, tags: (form.tags as any).split(",").map((t: string) => t.trim()) };
    if (editId) {
      await api(`/blog/${editId}`, { method: "PUT", body: JSON.stringify(payload) });
    } else {
      await api("/blog", { method: "POST", body: JSON.stringify(payload) });
    }
    setForm(empty);
    setEditId(null);
    setShowForm(false);
    fetchPosts();
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await api(`/blog/${id}`, { method: "DELETE" });
    fetchPosts();
  };

  const handleEdit = (p: Post) => {
    setForm({ ...p, tags: p.tags.join(", ") } as any);
    setEditId(p.id);
    setShowForm(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "#141414",
    border: "1px solid #222222",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    fontFamily: "var(--font-geist-sans)",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontSize: "11px",
    color: "#71717a",
    display: "block" as const,
    marginBottom: "8px",
    letterSpacing: "0.1em",
    fontFamily: "var(--font-geist-mono)",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", padding: "40px 64px" }}>
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "radial-gradient(circle at 1px 1px, #161616 1px, transparent 0)",
        backgroundSize: "40px 40px",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px" }}
        >
          <div>
            <Link href="/admin" style={{ fontSize: "12px", color: "#52525b", textDecoration: "none", fontFamily: "var(--font-geist-mono)", display: "block", marginBottom: "8px" }}>
              ← back
            </Link>
            <h1 style={{ fontSize: "32px", fontWeight: 600, color: "#ffffff", letterSpacing: "-1px" }}>
              Blog Posts
            </h1>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setForm(empty); setEditId(null); }}
            style={{
              padding: "12px 24px",
              background: "#00D4AA",
              color: "#0a0a0a",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00f0c3";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,170,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#00D4AA";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {showForm ? "cancel" : "+ new post"}
          </button>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "#0f0f0f",
                border: "1px solid #1a1a1a",
                borderRadius: "16px",
                padding: "32px",
                marginBottom: "32px",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 500, color: "#ffffff", marginBottom: "24px" }}>
                {editId ? "Edit Post" : "New Post"}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { key: "title", label: "TITLE", placeholder: "Post title" },
                  { key: "slug", label: "SLUG", placeholder: "post-slug" },
                  { key: "tags", label: "TAGS", placeholder: "react, javascript, webdev" },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={labelStyle}>{field.label}</label>
                    <input
                      value={(form as any)[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#00D4AA")}
                      onBlur={(e) => (e.target.style.borderColor = "#222222")}
                    />
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    style={{ width: "16px", height: "16px", accentColor: "#00D4AA" }}
                  />
                  <label style={{ ...labelStyle, marginBottom: 0 }}>PUBLISHED</label>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>CONTENT</label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Write your blog post content here..."
                    rows={8}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "#00D4AA")}
                    onBlur={(e) => (e.target.style.borderColor = "#222222")}
                  />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  marginTop: "24px",
                  padding: "12px 32px",
                  background: loading ? "#1a1a1a" : "#00D4AA",
                  color: loading ? "#52525b" : "#0a0a0a",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                }}
              >
                {loading ? "saving..." : editId ? "save changes" : "publish post"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: "#0f0f0f",
                border: "1px solid #1a1a1a",
                borderRadius: "12px",
                padding: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1a1a1a")}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <p style={{ fontSize: "16px", fontWeight: 500, color: "#ffffff" }}>
                    {post.title}
                  </p>
                  <span style={{
                    fontSize: "10px",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    background: post.published ? "rgba(0,212,170,0.1)" : "rgba(82,82,91,0.2)",
                    color: post.published ? "#00D4AA" : "#52525b",
                    fontFamily: "var(--font-geist-mono)",
                    letterSpacing: "0.05em",
                  }}>
                    {post.published ? "published" : "draft"}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#52525b", fontFamily: "var(--font-geist-mono)" }}>
                  /{post.slug}
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleEdit(post)}
                  style={{
                    padding: "8px 16px",
                    background: "transparent",
                    color: "#71717a",
                    border: "1px solid #222222",
                    borderRadius: "6px",
                    fontSize: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#00D4AA";
                    e.currentTarget.style.color = "#00D4AA";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#222222";
                    e.currentTarget.style.color = "#71717a";
                  }}
                >
                  edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    padding: "8px 16px",
                    background: "transparent",
                    color: "#71717a",
                    border: "1px solid #222222",
                    borderRadius: "6px",
                    fontSize: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#f87171";
                    e.currentTarget.style.color = "#f87171";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#222222";
                    e.currentTarget.style.color = "#71717a";
                  }}
                >
                  delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}