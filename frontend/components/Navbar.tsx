"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "16px 64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <span style={{ fontSize: "15px", fontWeight: 500, color: "#ffffff", letterSpacing: "-0.3px" }}>
          manvendra<span style={{ color: "#00D4AA" }}>.dev</span>
        </span>
      </Link>

      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {["work", "blog", "about"].map((item) => (
          <Link
            key={item}
            href={`#${item}`}
            style={{
              fontSize: "13px",
              color: "#71717a",
              textDecoration: "none",
              transition: "color 0.2s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#71717a")}
          >
            {item}
          </Link>
        ))}
        <Link
          href="/Manvendra_Singh_Resume.pdf"
          style={{
            fontSize: "12px",
            color: "#00D4AA",
            border: "1px solid #00D4AA",
            padding: "7px 18px",
            borderRadius: "6px",
            textDecoration: "none",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            letterSpacing: "0.05em",
            fontFamily: "var(--font-geist-mono)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#00D4AA";
            e.currentTarget.style.color = "#0a0a0a";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,170,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#00D4AA";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          resume
        </Link>
      </div>
    </nav>
  );
}