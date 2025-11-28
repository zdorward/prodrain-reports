// app/login/page.tsx
"use client";

import { useState } from "react";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const toggleMode = () => setMode(mode === "login" ? "signup" : "login");

  return (
    <main className="bg-slate-100 flex min-h-screen items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-lg md:max-w-xl bg-white shadow-md rounded-lg p-8 md:p-10 space-y-6">
        {mode === "login" ? (
          <>
            <h1 className="text-2xl font-semibold mb-2 text-slate-800">
              Log in
            </h1>
            <form action={login} className="space-y-5 mb-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer inline-flex w-full items-center justify-center rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
              >
                Log in
              </button>
            </form>
            <p className="text-xs text-slate-600 text-center">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-slate-800 font-medium hover:underline cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-2 text-slate-800">
              Create account
            </h1>
            <form action={signup} className="space-y-5 mb-5">
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
                  placeholder="At least 6 characters"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer inline-flex w-full items-center justify-center rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
              >
                Create account
              </button>
            </form>
            <p className="text-xs text-slate-600 text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-slate-800 font-medium hover:underline cursor-pointer"
              >
                Log in
              </button>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
