"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/blog")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  return (
    <section
      id="blog"
      style={{
        padding: "140px 64px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p style={{
          fontSize: "11px",
          color: "#00D4AA",
          fontFamily: "var(--font-geist-mono)",
          letterSpacing: "0.2em",
          marginBottom: "16px",
        }}>
          THOUGHTS
        </p>
        <h2 style={{
          fontSize: "48px",
          fontWeight: 600,
          letterSpacing: "-2px",
          marginBottom: "64px",
          color: "#ffffff",
        }}>
          Blog
        </h2>
      </motion.div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #1a1a1a",
        borderRadius: "16px",
        overflow: "hidden",
      }}>
        {posts.length === 0 ? (
          <p style={{
            color: "#52525b",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "14px",
            padding: "32px",
          }}>
            no posts yet — write one from the admin dashboard.
          </p>
        ) : (
          posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "28px 32px",
                  background: "#0f0f0f",
                  textDecoration: "none",
                  borderBottom: i < posts.length - 1 ? "1px solid #1a1a1a" : "none",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#141414";
                  e.currentTarget.style.paddingLeft = "40px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0f0f0f";
                  e.currentTarget.style.paddingLeft = "32px";
                }}
              >
                <div>
                  <p style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#e4e4e7",
                    marginBottom: "6px",
                  }}>
                    {post.title}
                  </p>
                  <p style={{
                    fontSize: "12px",
                    color: "#3f3f46",
                    fontFamily: "var(--font-geist-mono)",
                  }}>
                    {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </p>
                </div>
                <ArrowUpRight size={16} color="#3f3f46" />
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}