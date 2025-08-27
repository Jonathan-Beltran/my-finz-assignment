import { useState } from "react";
import { EyeOff } from "lucide-react";
import {auth, googleProvider} from './firebase';
import { signInWithPopup } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  {/* handle google sign in */}
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error){
      console.error("Error signing in with Google:", error);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white text-[#1F2937] flex flex-col">
      {/* logo */}
      <header className="mx-auto w-full max-w-[1200px] px-6 pt-8 pb-6">
        <div className="font-inter font-bold tracking-tight" style={{ fontSize: 24, lineHeight: "24px", color: "#1F2937" }}>
          FINZ
        </div>
      </header>

      {/* center container */}
      <main className="flex flex-1 items-center justify-center px-4 pb-20">
        {/* main card */}
        <div className="w-full max-w-[568px] rounded-[10px] border bg-white shadow-sm" style={{ borderColor: "#E5E9F2" }}>
          <div className="flex w-full flex-col items-center px-8 py-8">
            {/* welcome back */}
            <h1 className="font-inter font-bold text-center mb-8" style={{ fontSize: 30, lineHeight: "38px", color: "#1F2937" }}>
              Welcome back!
            </h1>

            {/* form fields */}
            <form className="flex w-full max-w-[424px] flex-col gap-4" onSubmit={(e)=>e.preventDefault()}>
              {/* email group */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-inter" style={{ color: "#6B7280", fontWeight: 500, fontSize: 16 }}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-12 w-full rounded-[5px] border px-4 outline-none transition-colors ${
                    email ? 'bg-blue-50' : 'bg-white'
                  }`}
                  style={{ borderColor: "#E5E9F2" }}
                />
              </div>

              {/* password group */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-inter" style={{ color: "#6B7280", fontWeight: 500, fontSize: 16 }}>
                  Password
                </label>
                <div className="relative h-12 w-full">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`h-full w-full rounded-[5px] border px-4 pr-12 outline-none transition-colors ${
                      password ? 'bg-blue-50' : 'bg-white'
                    }`}
                    style={{ borderColor: "#E5E9F2" }}
                  />
                  <EyeOff aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#1F2937]" size={24} strokeWidth={1.75} />
                </div>
              </div>

              {/* forgot password */}
              <div className="flex w-full justify-start">
                <a href="#" className="font-inter underline" style={{ color: "#1F2937", fontWeight: 500, fontSize: 16 }}>
                  Forgot Password?
                </a>
              </div>

              {/* login button */}
              <button
                type="submit"
                className="mx-auto mt-4 flex items-center justify-center rounded-[10px] text-white"
                style={{ width: 240, height: 48, background: "#9F9E9E" }}
              >
                <span className="font-inter" style={{ fontWeight: 500, fontSize: 16 }}>Login</span>
              </button>

              {/* divider */}
              <div className="mt-2 flex items-center">
                <div className="h-px flex-1 bg-[#E5E9F2]" />
                <span className="mx-6 font-inter" style={{ color: "#1F2937", fontWeight: 500, fontSize: 16 }}>or</span>
                <div className="h-px flex-1 bg-[#E5E9F2]" />
              </div>

              {/* continue with google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="mx-auto mt-2 flex items-center justify-center gap-3 rounded-[10px] border bg-white"
                style={{ width: 240, height: 48, borderColor: "#1F2937" }}
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M19.6 10.23c0-.68-.06-1.36-.18-2.02H10v3.82h5.4a4.62 4.62 0 0 1-2 3.03v2.5h3.22c1.89-1.74 2.98-4.3 2.98-7.33Z" fill="#4285F4"/>
                  <path d="M10 20c2.7 0 4.97-.9 6.63-2.44l-3.22-2.5c-.9.6-2.05.95-3.41.95-2.62 0-4.84-1.77-5.63-4.15H.99v2.6A10 10 0 0 0 10 20Z" fill="#34A853"/>
                  <path d="M4.37 11.86A6 6 0 0 1 3.98 10c0-.64.11-1.26.3-1.86V5.54H.99A10 10 0 0 0 0 10c0 1.6.38 3.11.99 4.46l3.38-2.6Z" fill="#FBBC05"/>
                  <path d="M10 3.96c1.47 0 2.78.5 3.81 1.48l2.85-2.85C14.96.95 12.7 0 10 0 6.1 0 2.77 2.24.99 5.54l3.29 2.6C5.07 5.53 7.39 3.96 10 3.96Z" fill="#EA4335"/>
                </svg>
                <span className="font-inter" style={{ fontWeight: 500, fontSize: 16, color: "#1F2937" }}>Continue with Google</span>
              </button>

              {/* bottom sign-up */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="font-inter" style={{ color: "#6B7280", fontWeight: 400, fontSize: 16 }}>Haven't got an account?</span>
                <a href="#" className="font-inter" style={{ color: "#1F2937", fontWeight: 500, fontSize: 16 }}>Sign up</a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
