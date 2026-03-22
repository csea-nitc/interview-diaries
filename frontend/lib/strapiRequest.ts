export function strapiRequest(path: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("strapi_jwt") : null;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  return fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });
}
