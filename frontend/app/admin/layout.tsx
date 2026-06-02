"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/admin/login" && !isAuthenticated()) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  return <>{children}</>;
}