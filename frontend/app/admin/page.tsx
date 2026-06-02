"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { api } from "@/lib/api";
import { removeToken } from "@/lib/auth";

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api("/projects").then(setProjects);
    api("/blog/all").then(setPosts);
  }, []);

  const handleLogout = () => {
    removeToken();
    router.push("/admin/login");
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
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "64px",
          }}
        >
          <div>
            <p style={{
              fontSize: "11px",
              color: "#00D4AA",
              fontFamily: "var(--font-geist-mono)",
              letterSpacing: "0.2em",
              marginBottom: "8px",
            }}>
              DASHBOARD
            </p>
            <h1 style={{
              fontSize: "36px",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-1.5px",
            }}>
              Welcome back, Manvendra
            </h1>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 24px",
              background: "transparent",
              color: "#52525b",
              border: "1px solid #1a1a1a",
              borderRadius: "8px",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "var(--font-geist-mono)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#f87171";
              e.currentTarget.style.color = "#f87171";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1a1a1a";
              e.currentTarget.style.color = "#52525b";
            }}
          >
            logout
          </button>
        </motion.div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
          {[
            { label: "Total Projects", value: projects.length },
            { label: "Blog Posts", value: posts.length },
            { label: "Published Posts", value: (posts as any[]).filter((p: any) => p.published).length },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                background: "#0f0f0f",
                border: "1px solid #1a1a1a",
                borderRadius: "16px",
                padding: "28px",
              }}
            >
              <p style={{ fontSize: "36px", fontWeight: 600, color: "#ffffff", letterSpacing: "-2px", fontFamily: "var(--font-geist-mono)" }}>
                {stat.value}
              </p>
              <p style={{ fontSize: "13px", color: "#52525b", marginTop: "4px" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { label: "Manage Projects", href: "/admin/projects", desc: "Add, edit or delete projects" },
            { label: "Manage Blog", href: "/admin/blog", desc: "Write and publish blog posts" },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <Link
                href={item.href}
                style={{
                  display: "block",
                  background: "#0f0f0f",
                  border: "1px solid #1a1a1a",
                  borderRadius: "16px",
                  padding: "32px",
                  textDecoration: "none",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00D4AA";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,212,170,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1a1a1a";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 500, color: "#ffffff", marginBottom: "8px" }}>
                  {item.label}
                </h3>
                <p style={{ fontSize: "14px", color: "#52525b" }}>
                  {item.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}