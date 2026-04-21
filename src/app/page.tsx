"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

/**
 * Root Page / Home
 * Handles the SSO redirect if a 'code' is present in the URL.
 * Otherwise, redirects to the dashboard.
 */
export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleSSO = async () => {
      // 1. Check for 'code' in the URL
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          console.log("[Home/SSO] Exchanging code for token...");
          
          // 2. Call backend SSO endpoint
          const response = await authService.ssoLogin(code);

          if (response && response.success && response.data) {
            const { accessToken } = response.data;

            // 3. Save token in localStorage and Cookies
            localStorage.setItem("token", accessToken);
            document.cookie = `auth_token=${accessToken}; path=/; max-age=86400; SameSite=Lax`;

            console.log("[Home/SSO] Login successful. Redirecting to dashboard...");

            // 4. Clean the URL and redirect
            window.history.replaceState({}, document.title, "/");
            router.push("/dashboard");
          } else {
            setError(response?.message || "SSO login failed.");
          }
        } catch (err: any) {
          console.error("[Home/SSO] Error during SSO exchange:", err);
          setError(
            err.response?.data?.message || 
            "An error occurred while communicating with the authentication backend."
          );
        }
      } else {
        // 5. No code present, standard redirect to dashboard
        // Note: The middleware will catch this if there's no auth_token
        router.push("/dashboard");
      }
    };

    handleSSO();
  }, [router]);

  // Error UI
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.href = "/login"}
            className="w-full px-6 py-2.5 bg-[#1174BB] text-white font-semibold rounded-md hover:bg-[#0E63A0] transition-all shadow-md"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Loading UI
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#1174BB] animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Authenticating</h2>
        <p className="text-gray-500">Completing your secure session...</p>
      </div>
    </div>
  );
}
