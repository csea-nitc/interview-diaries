"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type AuthUser = { id: number; email: string; username: string } | null;

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("strapi_jwt");

    if (!token) {
      // No token — send them to Strapi's Google OAuth flow
      router.replace("/login");
      return;
    }

    // Validate the token is still alive
    fetch("http://localhost:1337/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem("strapi_jwt");
          router.replace("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUser({ id: data.id, email: data.email, username: data.username });
      })
      .catch(() => {
        localStorage.removeItem("strapi_jwt");
        router.replace("http://localhost:1337/api/connect/google");
      })
      .finally(() => setLoading(false));
  }, [router]);

  return { user, loading };
}
