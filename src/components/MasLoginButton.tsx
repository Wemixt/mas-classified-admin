"use client";

import React from "react";

/**
 * MasLoginButton Component
 * Handles redirection to AWS Cognito SSO login page.
 */
const MasLoginButton: React.FC = () => {
  const handleMasLogin = () => {
    // Read environment variables (using VITE_ prefix as requested)
    // Note: In Next.js, process.env is used to access these. 
    // We also check import.meta.env for compatibility if using a Vite-based setup.
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
    const redirectUri = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI;

    if (!clientId || !domain || !redirectUri) {
      console.error("Missing Cognito configuration in environment variables:", { clientId, domain, redirectUri });
      alert("SSO Login is not configured correctly. Please check environment variables.");
      return;
    }

    // Build Cognito login URL
    // Format: https://<domain>/login/continue?client_id=<client_id>&redirect_uri=<redirect_uri>&response_type=code&scope=email+openid+profile
    const baseUrl = domain.endsWith("/") ? domain.slice(0, -1) : domain;
    const loginUrl = `${baseUrl}/login/continue?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=email+openid+profile`;

    console.log("[MasLoginButton] Redirecting to:", loginUrl);

    // Redirect to Cognito login page
    window.location.href = loginUrl;
  };

  return (
    <button
      onClick={handleMasLogin}
      className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent transition-all"
      type="button"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Lambda_logo.svg" 
        alt="MAS Logo" 
        className="h-5 w-5"
      />
      Login with MAS
    </button>
  );
};

export default MasLoginButton;
