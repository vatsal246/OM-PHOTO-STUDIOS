"use client";

import React from "react";
import { CountryPhotoSpec } from "@/lib/types";
import { useActionModals } from "./ActionModalsContext";
import { X, MessageCircle, AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

interface CountrySpecModalProps {
  spec: CountryPhotoSpec | null;
  onClose: () => void;
}

export default function CountrySpecModal({ spec, onClose }: CountrySpecModalProps) {
  const { openWhatsApp } = useActionModals();

  if (!spec) return null;

  const handleWhatsAppInquiry = () => {
    const text = `Hello Om Photo Studio, I need photos for ${spec.country} with specifications (${spec.dimensions}). Please confirm requirements and availability.`;
    openWhatsApp(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-studio-blue-50 text-studio-blue-600 flex items-center justify-center font-bold text-lg border border-studio-blue-100">
            📸
          </div>
          <div>
            <span className="text-xs font-semibold text-studio-blue-600 uppercase tracking-wider">
              Photo Specifications
            </span>
            <h3 className="text-2xl font-bold text-slate-900">{spec.country}</h3>
          </div>
        </div>

        {/* Official Authority Disclaimer Note */}
        <div className="mt-5 p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <span className="font-semibold block mb-0.5">Please Confirm Official Guidelines:</span>
              Exact photo requirements, acceptable head dimensions, background shades, and clothing rules can change per embassy or consulate advisories. Customers are strongly encouraged to confirm latest requirements with the official visa processing authority before their visit.
            </div>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="mt-6 space-y-3.5 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-slate-500 font-medium">Standard Dimensions:</span>
            <span className="font-bold text-slate-900">{spec.dimensions}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-slate-500 font-medium">Background Color:</span>
            <span className="font-semibold text-slate-800">{spec.background}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-slate-500 font-medium">Head &amp; Face Proportion:</span>
            <span className="font-semibold text-slate-800">{spec.headSize}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-slate-500 font-medium">Eyeglasses Policy:</span>
            <span className="font-semibold text-slate-800">{spec.glasses}</span>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 leading-relaxed">
            <span className="font-semibold text-studio-blue-900 block mb-1">Important Studio Note:</span>
            {spec.notes}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleWhatsAppInquiry}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] transition shadow-md shadow-emerald-600/20"
          >
            <MessageCircle className="w-5 h-5" />
            Ask on WhatsApp about {spec.country.split(" ")[0]} Photo
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

