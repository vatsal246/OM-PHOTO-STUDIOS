"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { MessageCircle, Star, Settings, ExternalLink, X, MapPin, AlertCircle } from "lucide-react";

interface ActionModalsContextType {
  openWhatsApp: (prefilledText?: string) => void;
  openGoogleReview: () => void;
  settings: {
    whatsappNumber: string;
    phoneNumber: string;
    emailAddress: string;
    googleReviewUrl: string;
    businessName: string;
    prices?: Record<string, string>;
  };
  refreshSettings: () => Promise<void>;
}

const ActionModalsContext = createContext<ActionModalsContextType | undefined>(undefined);

export function ActionModalsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<{
    whatsappNumber: string;
    phoneNumber: string;
    emailAddress: string;
    googleReviewUrl: string;
    businessName: string;
    prices?: Record<string, string>;
  }>({
    whatsappNumber: "",
    phoneNumber: "",
    emailAddress: "",
    googleReviewUrl: "",
    businessName: "Om Photo Studio",
    prices: {},
  });

  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [pendingWhatsAppMessage, setPendingWhatsAppMessage] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings({
          whatsappNumber: data.whatsappNumber || "",
          phoneNumber: data.phoneNumber || "",
          emailAddress: data.emailAddress || "",
          googleReviewUrl: data.googleReviewUrl || "",
          businessName: data.businessName || "Om Photo Studio",
          prices: data.prices || {},
        });
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const openWhatsApp = (prefilledText?: string) => {
    const text = prefilledText || "Hello Om Photo Studio, I am inquiring about photo services.";
    if (settings.whatsappNumber && settings.whatsappNumber.trim().length >= 10) {
      // Clean phone number: remove non-digits
      let clean = settings.whatsappNumber.replace(/\D/g, "");
      if (clean.length === 10) {
        clean = `91${clean}`; // Default India country code
      }
      const url = `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setPendingWhatsAppMessage(text);
      setWhatsappModalOpen(true);
    }
  };

  const openGoogleReview = () => {
    if (settings.googleReviewUrl && settings.googleReviewUrl.trim().startsWith("http")) {
      window.open(settings.googleReviewUrl, "_blank", "noopener,noreferrer");
    } else {
      setReviewModalOpen(true);
    }
  };

  return (
    <ActionModalsContext.Provider
      value={{
        openWhatsApp,
        openGoogleReview,
        settings,
        refreshSettings: fetchSettings,
      }}
    >
      {children}

      {/* WhatsApp Configuration Modal */}
      {whatsappModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg p-6 bg-white rounded-2xl shadow-2xl border border-slate-100">
            <button
              onClick={() => setWhatsappModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  WhatsApp Direct Message
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Om Photo Studio • Somvari Bazar, Malad West
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900">
                  <p className="font-semibold">WhatsApp Number Setup Required</p>
                  <p className="mt-1 text-amber-800 text-xs leading-relaxed">
                    The studio owner (<strong>Dharmesh Pithwa</strong>) has not configured the studio&apos;s active WhatsApp number yet. Once added in the Admin Settings panel, customer inquiries will directly route to WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            {pendingWhatsAppMessage && (
              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Prefilled Message Ready:
                </span>
                &ldquo;{pendingWhatsAppMessage}&rdquo;
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/admin"
                onClick={() => setWhatsappModalOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white bg-studio-blue-600 hover:bg-studio-blue-700 transition shadow-sm"
              >
                <Settings className="w-4 h-4" />
                Configure in Admin
              </Link>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=19.182917,72.842194"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setWhatsappModalOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              >
                <MapPin className="w-4 h-4 text-studio-coral-500" />
                Visit Studio in Malad
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Google Review URL Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg p-6 bg-white rounded-2xl shadow-2xl border border-slate-100">
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-amber-500 rounded-xl border border-amber-100">
                <Star className="w-7 h-7 fill-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Google Business Review Link
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Om Photo Studio • Dharmesh Pithwa
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-900">
              <p className="font-semibold">Review Link Ready to Configure</p>
              <p className="mt-1 text-blue-800 text-xs leading-relaxed">
                To keep customer reviews authentic and adhere to Google guidelines, the studio does not use fabricated review URLs. Studio owner Dharmesh Pithwa can paste his official Google Business Profile review link in the <strong>Admin Dashboard &gt; Settings</strong>.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/admin"
                onClick={() => setReviewModalOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white bg-studio-blue-600 hover:bg-studio-blue-700 transition shadow-sm"
              >
                <Settings className="w-4 h-4" />
                Open Admin Settings
              </Link>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="px-4 py-2.5 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </ActionModalsContext.Provider>
  );
}

export function useActionModals() {
  const context = useContext(ActionModalsContext);
  if (!context) {
    throw new Error("useActionModals must be used within ActionModalsProvider");
  }
  return context;
}
