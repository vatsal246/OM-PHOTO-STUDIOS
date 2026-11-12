"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  Calendar,
  Sparkles,
} from "lucide-react";
import { useActionModals } from "@/components/ActionModalsContext";

interface FAQItem {
  q: string;
  a: string;
  cat: string;
}

export default function FAQPage() {
  const { openWhatsApp } = useActionModals();
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("all");

  const faqs: FAQItem[] = [
    {
      cat: "passport",
      q: "How fast can I get my passport or visa photos?",
      a: "Standard passport and visa photos are typically photographed, verified, printed, and cut within 10 to 15 minutes. If you require digital copies formatted for online visa portals (such as US DS-160), we send them instantly to your WhatsApp or email address.",
    },
    {
      cat: "passport",
      q: "Do I need to wear specific clothes for passport or visa photos?",
      a: "Yes! We strongly recommend dark or brightly colored collared shirts. Avoid wearing pure white or light grey tops, as most embassy and passport authorities mandate a white or light grey background; white clothing blends in and can cause your application to be rejected.",
    },
    {
      cat: "passport",
      q: "Are eyeglasses permitted in US and Schengen visa photos?",
      a: "Under the US Department of State policy since November 2016, eyeglasses of any kind (even prescription lenses) are strictly NOT allowed in US visa and DS-160 photos. For Schengen, UK, and other countries, clear prescription glasses are allowed only if there is zero glare, no flash reflection, and the rims do not cover any part of your eyes. For guaranteed approval, we advise taking the photo without glasses.",
    },
    {
      cat: "passport",
      q: "Do you take passport and visa photos for babies and toddlers?",
      a: "Yes, we specialize in infant, newborn, and toddler passport/visa photography. We use specialized soft supports so parents do not appear in the frame, and we patiently take multiple clicks until the child looks directly into the lens with both eyes open.",
    },
    {
      cat: "booking",
      q: "Do I need an appointment or can I walk in directly?",
      a: "Walk-ins are warmly welcome at our studio during all working hours (Monday–Saturday 10:00 AM – 9:00 PM; Sunday 10:30 AM – 5:00 PM). Booking an appointment through our website is recommended during peak evening hours or for family group sessions to guarantee immediate priority service without waiting.",
    },
    {
      cat: "booking",
      q: "What if I need to reschedule or cancel my appointment?",
      a: "There is no cancellation fee or advance deposit required. If your schedule changes, you can message us directly on WhatsApp or book a new slot online anytime.",
    },
    {
      cat: "prints",
      q: "How does photo printing from my phone work?",
      a: "You can easily upload your favorite photos using our online Print Order form or bring them directly to our studio. We print on premium archival photographic paper in glossy and luster matte finishes across standard sizes like 4x6, 5x7, and A4.",
    },
    {
      cat: "location",
      q: "Where exactly is Om Photo Studio located in Malad West?",
      a: "We are located at Shop No. 1, Monday Market, right next to Patla Devi Temple on Bhailal Road in Somvari Bazar, Malad West, Mumbai – 400064. We are within 5-7 minutes of Malad Railway Station (West).",
    },
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCat = activeCategory === "all" || item.cat === activeCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-studio-blue-600 bg-studio-blue-50 px-3 py-1 rounded-full border border-studio-blue-100">
            Got Questions?
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about passport specs, turnaround times, walk-ins, and studio visits.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g., glasses, infant, turnaround, Sunday hours)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 shadow-sm text-sm focus:ring-2 focus:ring-studio-blue-500 bg-white"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { key: "all", label: "All Questions" },
            { key: "passport", label: "Passport & Visa" },
            { key: "booking", label: "Appointments & Walk-ins" },
            { key: "prints", label: "Printing & Digitals" },
            { key: "location", label: "Studio Location" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeCategory === cat.key
                  ? "bg-studio-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
              No matching questions found for &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-studio-blue-700 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-studio-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions? */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Have a question not listed here?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Chat directly with studio owner Dharmesh Pithwa on WhatsApp or book an appointment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openWhatsApp("Hello Dharmesh ji, I have a question regarding photo requirements.")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition text-xs sm:text-sm shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Ask on WhatsApp
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto py-3 px-5 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition text-xs sm:text-sm text-center"
            >
              Contact Us Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

