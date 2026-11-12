"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Camera, AlertCircle, ArrowRight, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid admin password");
      }
    } catch {
      setError("Network error while verifying password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-studio-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Camera className="w-7 h-7 text-studio-gold-300" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Om Photo Studio
            </h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              Owner Administration Panel
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700 transition shadow-md shadow-studio-blue-600/30 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            <span>{loading ? "Checking..." : "Sign In to Admin"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <KeyRound className="w-3.5 h-3.5 text-studio-gold-600" />
            <span>Local Development Credentials:</span>
          </div>
          <p>
            Default password: <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-900">admin123</code>
          </p>
          <p className="text-slate-500">
            Configured in <code className="text-slate-700">.env</code> via <code className="text-slate-700">ADMIN_PASSWORD</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

