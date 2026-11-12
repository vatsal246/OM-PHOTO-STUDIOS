"use client";

import React, { useState, useEffect } from "react";
import { getStudioOpenStatus, OpenStatus } from "@/lib/time";
import { Clock } from "lucide-react";

export default function LiveStatusBadge({ showDetails = true }: { showDetails?: boolean }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    // Initial calculation
    setStatus(getStudioOpenStatus());

    // Update every 30 seconds
    const interval = setInterval(() => {
      setStatus(getStudioOpenStatus());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!status) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 animate-pulse">
        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
        Checking hours...
      </div>
    );
  }

  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-colors ${
          status.isOpen
            ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
            : "bg-amber-50 text-amber-800 border border-amber-300"
        }`}
      >
        <span className="relative flex h-2 w-2">
          {status.isOpen && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              status.isOpen ? "bg-emerald-500" : "bg-amber-500"
            }`}
          ></span>
        </span>
        <span>{status.statusText}</span>
      </div>

      {showDetails && (
        <span className="text-xs text-slate-600 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          {status.detail} (IST)
        </span>
      )}
    </div>
  );
}

