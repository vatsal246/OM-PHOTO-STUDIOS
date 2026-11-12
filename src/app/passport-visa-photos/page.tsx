"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  MessageCircle,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Camera,
  ArrowRight,
  Info,
} from "lucide-react";
import { COUNTRY_SPECS } from "@/lib/countrySpecs";
import { CountryPhotoSpec } from "@/lib/types";
import { useActionModals } from "@/components/ActionModalsContext";
import CountrySpecModal from "@/components/CountrySpecModal";

export default function PassportVisaPhotosPage() {
  const { openWhatsApp } = useActionModals();
  const [activeSpec, setActiveSpec] = useState<CountryPhotoSpec | null>(null);

  const photoDayTips = [
    {
      title: "Clothing & Colors",
      detail:
        "Wear dark or contrasting collared clothing. Avoid pure white or light grey shirts, as they blend into official white/grey backdrops and may lead to rejection.",
    },
    {
      title: "Eyeglasses Policy",
      detail:
        "The USA strictly prohibits eyeglasses for DS-160 and visa photos. Other countries permit clear prescription glasses only if there is zero glare, reflection, or thick rim obscuring your eyes. We recommend taking photos without glasses whenever possible.",
    },
    {
      title: "Facial Expression & Headgear",
      detail:
        "Keep a neutral facial expression with both eyes open and mouth closed. Head coverings for religious reasons are permitted, provided the full face from bottom of chin to forehead is unobstructed.",
    },
    {
      title: "Baby & Infant Photos",
      detail:
        "For infants and toddlers, no hands or parents should be visible in the frame. We use specialized soft padded posing supports to keep babies safe and upright.",
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-studio-blue-600 bg-studio-blue-50 px-3 py-1 rounded-full border border-studio-blue-100">
            Biometric Standards Guide
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Passport &amp; Visa Photo Specifications
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Guaranteed compliance with international embassy guidelines. Calibrated lighting, millimeter-precision cutting, and digital portal formats.
          </p>
        </div>

        {/* Official Authority Reminder Alert Box */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start gap-4 shadow-xs">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-sm leading-relaxed">
            <h4 className="font-bold text-amber-900 text-base">
              Important: Confirm Exact Embassy Guidelines Prior to Your Appointment
            </h4>
            <p className="text-xs sm:text-sm text-amber-800">
              Photo specifications differ significantly between sovereign countries and can be updated without prior warning by embassies, High Commissions, and visa processing partners (e.g. VFS Global, BLS, TLScontact). While Om Photo Studio follows up-to-date ICAO biometric standards, we strongly recommend that customers check their application checklist or visa appointment letter to confirm current requirements.
            </p>
          </div>
        </div>

        {/* Country Specifications Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Popular Country Specifications
            </h2>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Click any card to inspect full requirements
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUNTRY_SPECS.map((spec) => (
              <div
                key={spec.slug}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card hover:shadow-cardHover hover:border-studio-blue-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-studio-blue-600 uppercase tracking-wider">
                      {spec.dimensions}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Standard
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold text-slate-900">{spec.country}</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {spec.specSummary}
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-slate-700">
                      <span className="font-semibold text-slate-900 shrink-0">Background:</span>
                      <span>{spec.background}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <span className="font-semibold text-slate-900 shrink-0">Head Size:</span>
                      <span>{spec.headSize}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <span className="font-semibold text-slate-900 shrink-0">Glasses:</span>
                      <span>{spec.glasses}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => setActiveSpec(spec)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-studio-blue-700 bg-studio-blue-50 hover:bg-studio-blue-100 transition text-center"
                  >
                    View Details Modal
                  </button>
                  <button
                    onClick={() => {
                      const text = `Hello Om Photo Studio, I am applying for ${spec.country} visa. Please confirm your availability and price for ${spec.dimensions} photos.`;
                      openWhatsApp(text);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition text-center flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Ask on WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips for Photo Day Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-studio-gold-50 text-studio-gold-600 rounded-xl border border-studio-gold-200">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Tips to Ensure Your Photos Are Accepted First Time
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Quick checklist before visiting our Somvari Bazar studio
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {photoDayTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {tip.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {tip.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-studio-blue-600 to-studio-blue-700 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-studio-blue-600/20">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to Get Your Photos?</h3>
            <p className="text-blue-100 text-sm max-w-xl">
              Appointments take just 15 minutes. Walk-ins are always welcome, or reserve an appointment slot online to guarantee immediate service.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/book"
              className="px-6 py-3.5 rounded-xl font-bold text-studio-blue-900 bg-white hover:bg-blue-50 transition shadow-md text-sm text-center"
            >
              Book 15-Min Slot
            </Link>
            <button
              onClick={() =>
                openWhatsApp("Hello Om Photo Studio, I need photos for my passport/visa application.")
              }
              className="px-5 py-3.5 rounded-xl font-bold text-white bg-white/20 hover:bg-white/30 border border-white/30 transition text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>

      {/* Country Specs Modal */}
      <CountrySpecModal
        spec={activeSpec}
        onClose={() => setActiveSpec(null)}
      />
    </div>
  );
}

