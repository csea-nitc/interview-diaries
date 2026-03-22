"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CallbackInner() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    // This is the Google access token Strapi passes back to the frontend
    const googleAccessToken = params.get("access_token");

    if (!googleAccessToken) {
      console.error("No access_token found in URL params");
      return;
    }

    // Trade the Google token for the Strapi JWT
    fetch(`http://localhost:1337/api/auth/google/callback?access_token=${googleAccessToken}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to trade token with Strapi");
        return res.json();
      })
      .then((data) => {
        // data contains { jwt: string, user: object }
        if (data.jwt) {
          localStorage.setItem("strapi_jwt", data.jwt);
          router.replace("/companies");
        } else {
          throw new Error("No Strapi JWT inside response");
        }
      })
      .catch((err) => {
        console.error("Token validation failed:", err);
      });
  }, [params, router]);

  const allParams = Object.fromEntries(params.entries());

  return (
    <div className="flex-1 flex flex-col items-center justify-center font-mono text-primary-blue text-sm p-8">
      <div className="mb-4">Signing you in...</div>
      {!params.get("access_token") && (
        <div className="mt-8 bg-red-50 text-red-600 p-4 border border-red-200">
          <p className="font-bold mb-2">Debug Error: No access_token in URL!</p>
          <pre className="text-xs max-w-full overflow-x-auto">{JSON.stringify(allParams, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center font-mono text-primary-blue text-sm">
        Loading...
      </div>
    }>
      <CallbackInner />
    </Suspense>
  );
}
