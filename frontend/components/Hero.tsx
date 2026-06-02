"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 64px",
        maxWidth: "1100px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "radial-gradient(circle at 1px 1px, #161616 1px, transparent 0)",
        backgroundSize: "40px 40px",
        zIndex: -1,
      }} />

      <div style={{
        position: "fixed",
        top: "20%",
        right: "10%",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)",
        zIndex: -1,
        pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontSize: "11px",
            color: "#00D4AA",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "32px",
            letterSpacing: "0.2em",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#00D4AA",
            display: "inline-block",
            boxShadow: "0 0 10px #00D4AA",
            animation: "pulse 2s infinite",
          }} />
          AVAILABLE FOR INTERNSHIPS
        </motion.p>

        <h1
          style={{
            fontSize: "clamp(52px, 8vw, 96px)",
            fontWeight: 600,
            lineHeight: 1.0,
            letterSpacing: "-3px",
            marginBottom: "32px",
            color: "#ffffff",
          }}
        >
          Manvendra Singh
          <br />
          <span style={{
            color: "transparent",
            WebkitTextStroke: "1.5px #00D4AA",
          }}>
            Full Stack
          </span>
          <br />
          Developer.
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontSize: "17px",
            color: "#71717a",
            lineHeight: 1.8,
            maxWidth: "500px",
            marginBottom: "48px",
          }}
        >
          I build fast, scalable web apps with clean code and thoughtful UX.
          CS undergrad at DIT University, open to internship opportunities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
        >
          <Link
            href="#work"
            style={{
              padding: "14px 32px",
              background: "#00D4AA",
              color: "#0a0a0a",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              letterSpacing: "0.01em",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00f0c3";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,212,170,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#00D4AA";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            view my work
          </Link>
          <Link
            href="https://github.com/Manvendra18"
            target="_blank"
            style={{
              padding: "14px 32px",
              background: "transparent",
              color: "#a1a1aa",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              border: "1px solid #2a2a2a",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              letterSpacing: "0.01em",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00D4AA";
              e.currentTarget.style.color = "#00D4AA";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,212,170,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2a2a2a";
              e.currentTarget.style.color = "#a1a1aa";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            github
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{
          display: "flex",
          gap: "64px",
          marginTop: "100px",
          paddingTop: "48px",
          borderTop: "1px solid #1a1a1a",
        }}
      >
        {[
          { num: "2+", label: "years coding" },
          { num: "5+", label: "projects built" },
          { num: "2027", label: "graduating" },
        ].map((stat) => (
          <div key={stat.label}>
            <p style={{
              fontSize: "32px",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-1.5px",
              fontFamily: "var(--font-geist-mono)",
            }}>
              {stat.num}
            </p>
            <p style={{
              fontSize: "12px",
              color: "#3f3f46",
              marginTop: "4px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px #00D4AA; }
          50% { opacity: 0.6; box-shadow: 0 0 20px #00D4AA; }
        }
      `}</style>
    </section>
  );
}