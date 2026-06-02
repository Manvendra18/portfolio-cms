"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((r) => r.json())
      .then(setProjects);
  }, []);

  return (
    <section
      id="work"
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
          SELECTED WORK
        </p>
        <h2 style={{
          fontSize: "48px",
          fontWeight: 600,
          letterSpacing: "-2px",
          marginBottom: "64px",
          color: "#ffffff",
        }}>
          Projects
        </h2>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {projects.length === 0 ? (
          <p style={{ color: "#52525b", fontFamily: "var(--font-geist-mono)", fontSize: "14px" }}>
            no projects yet — add one from the admin dashboard.
          </p>
        ) : (
          projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: "#0f0f0f",
                border: "1px solid #1a1a1a",
                borderRadius: "16px",
                padding: "32px",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",
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
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "16px",
              }}>
                <h3 style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#ffffff",
                  letterSpacing: "-0.5px",
                }}>
                  {project.title}
                </h3>
                <Link
                  href={project.githubUrl || "#"}
                  target="_blank"
                  style={{
                    color: "#3f3f46",
                    transition: "all 0.2s",
                    display: "flex",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00D4AA";
                    e.currentTarget.style.transform = "translate(2px, -2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#3f3f46";
                    e.currentTarget.style.transform = "translate(0, 0)";
                  }}
                >
                  <ArrowUpRight size={20} />
                </Link>
              </div>

              <p style={{
                fontSize: "15px",
                color: "#52525b",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}>
                {project.description}
              </p>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {project.techStack.map((t) => (
                  <span key={t} style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-geist-mono)",
                    color: "#00D4AA",
                    background: "rgba(0,212,170,0.08)",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    letterSpacing: "0.05em",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}