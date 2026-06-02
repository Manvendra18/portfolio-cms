"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const data = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      setToken(data.token);
      router.push("/admin");
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* glow */}
      <div style={{
        position: "fixed",
        top: "30%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "400px",
        background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* grid */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "radial-gradient(circle at 1px 1px, #161616 1px, transparent 0)",
        backgroundSize: "40px 40px",
        zIndex: 0,
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "48px",
          background: "#0f0f0f",
          border: "1px solid #1a1a1a",
          borderRadius: "20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p style={{
            fontSize: "11px",
            color: "#00D4AA",
            fontFamily: "var(--font-geist-mono)",
            letterSpacing: "0.2em",
            marginBottom: "12px",
          }}>
            ADMIN ACCESS
          </p>
          <h1 style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-1px",
            marginBottom: "8px",
          }}>
            Welcome back
          </h1>
          <p style={{
            fontSize: "14px",
            color: "#52525b",
            marginBottom: "40px",
          }}>
            Sign in to manage your portfolio
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{
                fontSize: "12px",
                color: "#71717a",
                display: "block",
                marginBottom: "8px",
                letterSpacing: "0.05em",
                fontFamily: "var(--font-geist-mono)",
              }}>
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "#141414",
                  border: "1px solid #222222",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  fontFamily: "var(--font-geist-sans)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00D4AA")}
                onBlur={(e) => (e.target.style.borderColor = "#222222")}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <div>
              <label style={{
                fontSize: "12px",
                color: "#71717a",
                display: "block",
                marginBottom: "8px",
                letterSpacing: "0.05em",
                fontFamily: "var(--font-geist-mono)",
              }}>
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "#141414",
                  border: "1px solid #222222",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  fontFamily: "var(--font-geist-sans)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00D4AA")}
                onBlur={(e) => (e.target.style.borderColor = "#222222")}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: "13px",
                  color: "#f87171",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              onClick={handleLogin}
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                padding: "14px",
                background: loading ? "#1a1a1a" : "#00D4AA",
                color: loading ? "#52525b" : "#0a0a0a",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                marginTop: "8px",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "#00f0c3";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,170,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "#00D4AA";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {loading ? "signing in..." : "sign in"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}