"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoginImage from "@/assets/login-image.png";
import MasLoginButton from "@/components/MasLoginButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (auth) {
      setIsLoading(true);
      const result = await auth.login(email, password);
      
      if (result.success && result.user) {
        const user = result.user;
        
        // Check if user is active
        if (user.status !== "ACTIVE") {
          setError("Your account is not active. Please contact administration.");
          setIsLoading(false);
          await auth.logout();
          return;
        }

        // Redirection logic based on role
        // For now, both go to dashboard as per menuConfig
        router.push("/dashboard");
      } else {
        setError(result.message || "An error occurred during login");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 flex flex-col items-center">
          <div className="mb-6">
            <Image 
              src="/logos/mass logo.png" 
              alt="MAS Logo" 
              width={220} 
              height={80} 
              className="mx-auto" 
              priority
            />
          </div>
          
          <h2 className="mt-2 text-center text-[28px] font-normal text-[#164b85]">
            Welcome Back !
          </h2>
          <p className="mt-3 text-center text-sm font-semibold text-gray-500 mb-8">
            Access your dashboard securely
          </p>

          {error && (
            <div className="mt-4 w-full rounded-md bg-red-50 p-4 mb-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 w-full">
            {/* Primary SSO Button */}
            <div className="mb-8 w-full">
              <MasLoginButton />
            </div>
            
            {/* 
              --- MANUALLY HIDDEN TRADITIONAL LOGIN FORM ---
            <div className="relative mt-6 mb-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-400">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-gray-900 mb-2">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 bg-[#f8f9fa] py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#164b85] sm:text-sm sm:leading-6"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" title="Password" className="block text-xs font-bold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 bg-[#f8f9fa] py-3.5 px-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#164b85] sm:text-sm sm:leading-6"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 z-20"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.888 9.888L3 3m18 18l-6.888-6.888" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#164b85] focus:ring-[#164b85]"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs font-semibold text-gray-500">
                    Remember Me
                  </label>
                </div>

                <div className="text-xs">
                  <a href="#" className="font-semibold text-gray-500 hover:text-gray-900">
                    Forgot Password
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex w-full justify-center rounded-md px-3 py-3.5 text-sm font-semibold text-white transition-all shadow-sm ${
                    isLoading 
                      ? "bg-blue-400 cursor-not-allowed" 
                      : "bg-[#144880] hover:bg-[#0f3661] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#144880]"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
            */}
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={LoginImage}
          alt="Login background"
          priority
        />
      </div>
    </div>
  );
}
