"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Filter,
  Eye,
  X,
  MessageCircle,
  Calendar,
  Sparkles,
  Info,
} from "lucide-react";
import { useActionModals } from "@/components/ActionModalsContext";

interface GalleryItemType {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  description: string;
  specDetails: string;
}

export default function GalleryPage() {
  const { openWhatsApp } = useActionModals();
  const [activeFilter, setActiveFilter] = useState("all");
  const [modalItem, setModalItem] = useState<GalleryItemType | null>(null);

  const galleryItems: GalleryItemType[] = [
    {
      id: "1",
      title: "Passport Photo Setup",
      category: "passport",
      categoryLabel: "Passport Photos",
      image: "/gallery/passport-setup.svg",
      description:
        "Balanced dual softbox lighting setup with pure white/off-white background. Designed specifically for Indian biometric passports, PAN cards, and OCI cards.",
      specDetails: "35x45 mm • 80% Face Ratio • Shadowless",
    },
    {
      id: "2",
      title: "Visa Photography Alignment",
      category: "visa",
      categoryLabel: "Visa Photography",
      image: "/gallery/visa-setup.svg",
      description:
        "Computer-aided biometric alignment grid ensuring strict adherence to embassy facial measurements and ear visibility standards.",
      specDetails: "2x2 inch & 35x45 mm • DS-160 Verified",
    },
    {
      id: "3",
      title: "Professional Studio Portrait",
      category: "portrait",
      categoryLabel: "Portraits & Headshots",
      image: "/gallery/portrait-setup.svg",
      description:
        "Subtle three-point studio lighting configured for executive headshots, matrimonial portfolios, and LinkedIn profile branding.",
      specDetails: "High-Resolution • Balanced Exposure",
    },
    {
      id: "4",
      title: "Family Photography Session",
      category: "family",
      categoryLabel: "Family & Kids",
      image: "/gallery/family-setup.svg",
      description:
        "Spacious studio grouping setup with wide neutral background suitable for multi-generation family pictures, parents with toddlers, and milestones.",
      specDetails: "Even Depth-of-Field • Multi-Subject Lighting",
    },
    {
      id: "5",
      title: "High-Definition Photo Printing",
      category: "prints",
      categoryLabel: "Photo Prints",
      image: "/gallery/prints-setup.svg",
      description:
        "High-density ink droplet reproduction on Fuji archival glossy and luster matte photographic paper from 4x6 up to A4 sizes.",
      specDetails: "Archival Paper • Glossy / Matte Finish",
    },
    {
      id: "6",
      title: "Digital Delivery & Web Optimization",
      category: "digital",
      categoryLabel: "Digital Soft Copies",
      image: "/gallery/digital-setup.svg",
      description:
        "Instant delivery of compressed, web-ready JPEG files calibrated under 240KB with exact 600x600 pixel requirements for online portals.",
      specDetails: "WhatsApp / Email Delivery • Cloud-Safe",
    },
  ];

  const categories = [
    { key: "all", label: "All Works" },
    { key: "passport", label: "Passport Photos" },
    { key: "visa", label: "Visa Standards" },
    { key: "portrait", label: "Portraits" },
    { key: "family", label: "Family Sessions" },
    { key: "prints", label: "Photo Prints" },
    { key: "digital", label: "Digital Copies" },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-studio-blue-600 bg-studio-blue-50 px-3 py-1 rounded-full border border-studio-blue-100">
            Studio Showcase
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Sample Photography Gallery
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            A visual overview of our lighting calibration, biometric setups, and photo print finishing standards at Om Photo Studio.
          </p>
        </div>

        {/* Clear Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs sm:text-sm">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="block text-amber-950 font-semibold mb-0.5">
              Demonstration Sample Notice:
            </strong>
            To respect the privacy of our local customers in Malad West, the images displayed below are illustrative demonstration samples representing our studio equipment, background standards, and finishing options rather than customer photographs.
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeFilter === cat.key
                  ? "bg-studio-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between group"
            >
              <div
                className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
                onClick={() => setModalItem(item)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 bg-white/90 text-slate-900 rounded-full shadow-lg">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>
                <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                  {item.categoryLabel}
                </span>
                <span className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                  Sample Demonstration
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-studio-blue-600 font-semibold">
                  <span>{item.specDetails}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-studio-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 flex gap-2">
                  <button
                    onClick={() => setModalItem(item)}
                    className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition text-center"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() =>
                      openWhatsApp(
                        `Hello Dharmesh ji, I saw your sample for "${item.title}". I would like to book a similar photography session.`
                      )
                    }
                    className="py-2 px-3 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Zoomed View */}
        {modalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <button
                onClick={() => setModalItem(null)}
                className="absolute top-4 right-4 z-10 p-2 text-slate-500 hover:text-slate-800 bg-white/80 rounded-full hover:bg-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] bg-slate-100 border-b border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={modalItem.image}
                  alt={modalItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-studio-blue-600 uppercase tracking-wider">
                    {modalItem.categoryLabel}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    Demonstration Sample
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900">
                  {modalItem.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {modalItem.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Technical Details:</span>
                  <span>{modalItem.specDetails}</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/book"
                    className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700 transition text-center shadow-md shadow-studio-blue-600/20"
                  >
                    Book This Style Now
                  </Link>
                  <button
                    onClick={() => {
                      const text = `Hello Dharmesh ji, I am inquiring about the ${modalItem.title} service.`;
                      openWhatsApp(text);
                    }}
                    className="py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    WhatsApp Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

