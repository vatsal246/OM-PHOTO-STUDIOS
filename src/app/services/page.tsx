"use client";

import React from "react";
import Link from "next/link";
import {
  Camera,
  ShieldCheck,
  Users,
  Printer,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useActionModals } from "@/components/ActionModalsContext";
import LiveStatusBadge from "@/components/LiveStatusBadge";

export default function ServicesPage() {
  const { openWhatsApp, settings } = useActionModals();

  const servicesList = [
    {
      id: "passport",
      title: "Passport-size Photographs",
      tagline: "India Passport, OCI, Driving License & Official Documents",
      price: settings.prices?.passport || "₹100 (Set of 8 prints)",
      turnaround: "10 – 15 Minutes",
      icon: Camera,
      color: "bg-blue-50 text-studio-blue-600 border-blue-200",
      description:
        "High-definition, true-to-life passport photos printed on non-fading photographic paper. Photographed under calibrated studio softboxes ensuring even, shadowless illumination and clean white/off-white background matching Indian Passport Seva Kendra standards.",
      features: [
        "Standard 3.5 cm x 4.5 cm (India Passport) and 2 x 2 inch (OCI)",
        "Compliant with Passport Seva Kendra, RTO & Banking criteria",
        "Set of 8 physical prints ready in 15 minutes",
        "Digital soft copy delivered via WhatsApp / Email on request",
        "Special patient handling for babies, kids, and senior citizens",
      ],
      action: "Book Passport Photo",
      actionHref: "/book?service=passport",
    },
    {
      id: "visa",
      title: "International Visa Photographs",
      tagline: "USA (2x2\"), UK, Schengen, Canada (50x70mm), Australia & Global",
      price: settings.prices?.visa || "₹150 (Set of 4 prints + soft copy)",
      turnaround: "15 Minutes",
      icon: ShieldCheck,
      color: "bg-amber-50 text-studio-gold-600 border-amber-200",
      description:
        "Embassy and consulate regulations are notoriously strict. A minor variation in background tone, eye-level alignment, or reflection on spectacles can lead to visa rejection. We verify dimensions and regulations for over 70+ countries before cutting your prints.",
      features: [
        "USA DS-160 & Visa (Strict 2x2 inch, white BG, no eyeglasses policy)",
        "Schengen & UK (35x45 mm, light grey background, 70-80% face ratio)",
        "Canada Visa & Work Permit (50x70 mm with official studio back-stamp)",
        "Formatted digital image under 240KB ready for online embassy uploads",
        "Free re-click guarantee if rejected on photography grounds",
      ],
      action: "Book Visa Photo",
      actionHref: "/book?service=visa",
    },
    {
      id: "portrait",
      title: "General Studio Photography",
      tagline: "Portraits, Headshots, Matrimonial & Family Sessions",
      price: settings.prices?.portrait || "Starting from ₹350",
      turnaround: "Same Day / Next Day",
      icon: Users,
      color: "bg-red-50 text-studio-coral-600 border-red-200",
      description:
        "Whether you need an updated LinkedIn corporate headshot, a respectful matrimonial profile picture, or a cherished family portrait, our Malad West studio provides a calm, relaxed environment with multiple backdrops and flattering portrait lighting.",
      features: [
        "Corporate & LinkedIn headshots with transparent/solid backgrounds",
        "Matrimonial profiles capturing natural expressions",
        "Family and multi-generation group portraits",
        "Gentle retouching to remove minor blemishes while looking natural",
        "Both high-resolution digital files and framed prints available",
      ],
      action: "Book Portrait Session",
      actionHref: "/book?service=general",
    },
    {
      id: "prints",
      title: "Photo Printing & Digital Copies",
      tagline: "Lab Quality Photo Paper • Available on Request",
      price: "Available on request",
      turnaround: "Same Day Pickup",
      icon: Printer,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      description:
        "Bring your mobile phone pictures, vacation memories, or event photographs to life on premium photo paper. We offer standard 4x6, 5x7, 8x10, and A4 prints with choice of glossy or luster/matte finish.",
      features: [
        "4x6 inch standard album prints",
        "5x7 inch and 8x10 inch framing prints",
        "A4 size premium portraits",
        "Choice between glossy vibrancy and non-reflective matte luster",
        "Color correction and contrast balancing before printing",
      ],
      action: "Request Print Order",
      actionHref: "/print-order",
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <LiveStatusBadge showDetails={true} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Our Photography Services
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Professional photography and biometric photo solutions crafted for Malad West residents, students, professionals, and international travelers.
          </p>
        </div>

        {/* Services Detail List */}
        <div className="space-y-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-card hover:shadow-cardHover transition-all"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                  {/* Left Column: Info & Specs */}
                  <div className="lg:col-span-8 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className={`p-3 rounded-2xl border ${service.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {service.tagline}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                        Key Features &amp; Standards:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                        {service.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pricing & Action Card */}
                  <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-5">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Estimated Pricing
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-studio-blue-700 block mt-0.5">
                        {service.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Clock className="w-4 h-4 text-studio-gold-600 shrink-0" />
                      <span>Ready in: <strong>{service.turnaround}</strong></span>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <Link
                        href={service.actionHref}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700 transition shadow-sm"
                      >
                        <Calendar className="w-4 h-4" />
                        {service.action}
                      </Link>

                      <button
                        onClick={() =>
                          openWhatsApp(
                            `Hello Dharmesh ji, I would like to inquire about ${service.title} (${service.price}). When can I visit?`
                          )
                        }
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        WhatsApp Enquiry
                      </button>
                    </div>

                    {service.id === "visa" && (
                      <div className="pt-2">
                        <Link
                          href="/passport-visa-photos"
                          className="text-xs font-semibold text-studio-blue-600 hover:text-studio-blue-800 flex items-center justify-center gap-1"
                        >
                          Check Country Specs Table <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Walk-in note */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
          <h3 className="text-lg font-bold text-slate-900">Need Urgent Photos Right Now?</h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            You don&apos;t necessarily need an advance booking. Walk into our studio at Shop No. 1, Somvari Bazar, near Patla Devi Temple in Malad West during working hours for express 15-minute service.
          </p>
          <div className="pt-2">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=19.182917,72.842194"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-studio-coral-600 hover:text-studio-coral-700 underline underline-offset-4"
            >
              Get Directions to Studio on Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

