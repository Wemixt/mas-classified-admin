"use client";

import React from "react";
import Image from "next/image";

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

    // Build Cognito login URL using requested format
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
      className="group flex w-full cursor-pointer items-center justify-center gap-4 rounded-xl bg-white px-6 py-4 text-lg font-bold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164b85]"
      type="button"
    >
      <Image 
        src="/logos/mass logo.png" 
        alt="MAS Logo" 
        width={55} 
        height={24} 
        className="object-contain"
      />
      <span>Continue with MAS</span>
    </button>
  );
};

export default MasLoginButton;
