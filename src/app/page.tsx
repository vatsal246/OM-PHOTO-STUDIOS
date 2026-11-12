"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Calendar,
  MessageCircle,
  Navigation,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  Printer,
  Image as ImageIcon,
  Users,
  ChevronRight,
  Info,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { useActionModals } from "@/components/ActionModalsContext";
import LiveStatusBadge from "@/components/LiveStatusBadge";
import CountrySpecModal from "@/components/CountrySpecModal";
import { COUNTRY_SPECS } from "@/lib/countrySpecs";
import { CountryPhotoSpec } from "@/lib/types";

export default function HomePage() {
  const { t } = useLanguage();
  const { openWhatsApp, openGoogleReview, settings } = useActionModals();
  const [selectedCountry, setSelectedCountry] = useState<CountryPhotoSpec | null>(null);

  // Quick service cards
  const services = [
    {
      title: "Passport-size Photos",
      badge: "15 Min Turnaround",
      desc: "Standard Indian passport, PAN card, OCI, driving license, and official application photos printed on premium photo paper.",
      icon: Camera,
      color: "bg-blue-50 text-studio-blue-600 border-blue-200",
      link: "/passport-visa-photos",
      price: settings.prices?.passport || "₹100 (8 prints)",
      action: "Book Passport Photo",
    },
    {
      title: "Visa Photographs",
      badge: "Embassy Compliant",
      desc: "Strict adherence to country-specific rules for USA (2x2\"), UK, Schengen (35x45mm), Canada (50x70mm), Australia, Dubai & more.",
      icon: ShieldCheck,
      color: "bg-amber-50 text-studio-gold-600 border-amber-200",
      link: "/passport-visa-photos",
      price: settings.prices?.visa || "₹150 (4 prints + soft copy)",
      action: "Book Visa Photo",
    },
    {
      title: "General Photography",
      badge: "Studio Session",
      desc: "Clean studio portraiture, matrimonial photos, corporate headshots, and family portraits in our Somvari Bazar studio.",
      icon: Users,
      color: "bg-red-50 text-studio-coral-600 border-red-200",
      link: "/services",
      price: settings.prices?.portrait || "Starting from ₹350",
      action: "Enquire Portrait",
    },
    {
      title: "Photo Prints & Digital Copies",
      badge: "Available on Request",
      desc: "High-definition glossy/matte prints (4x6 to A4) and instant email/WhatsApp digital copies optimized for online portal uploads.",
      icon: Printer,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      link: "/print-order",
      price: "Available on request",
      action: "Order Print",
    },
  ];

  // Why choose us cards
  const whyUs = [
    {
      title: "Convenient Local Studio",
      desc: "Easily accessible at Somvari Bazar, Bhailal Road, right next to Patla Devi Temple in Malad West.",
      icon: MapPin,
    },
    {
      title: "Quick Turnaround",
      desc: "Most passport and visa photos are captured, calibrated, and handed over in just 10 to 15 minutes.",
      icon: Clock,
    },
    {
      title: "Photo Requirements Handled Carefully",
      desc: "Biometric head proportions, lighting symmetry, background tone, and eyeglasses rules verified thoroughly.",
      icon: ShieldCheck,
    },
    {
      title: "Friendly Personal Service",
      desc: "Studio owner Dharmesh Pithwa personally assists every customer, ensuring multiple clicks until you're satisfied.",
      icon: Sparkles,
    },
  ];

  // Gallery Preview Items
  const galleryPreviews = [
    {
      title: "Passport Photo Setup",
      category: "Passport Size",
      image: "/gallery/passport-setup.svg",
      desc: "Even shadowless dual-lighting setup calibrated for Indian and international biometric applications.",
    },
    {
      title: "Visa Photo Setup",
      category: "International Visa",
      image: "/gallery/visa-setup.svg",
      desc: "Precise facial proportion measuring tool compliant with US (2x2\"), Schengen, and Canada standards.",
    },
    {
      title: "Professional Portrait",
      category: "Studio Headshots",
      image: "/gallery/portrait-setup.svg",
      desc: "Sharp business profile portraits and personal branding photos with flattering studio lighting.",
    },
    {
      title: "Family Photography",
      category: "Portraits",
      image: "/gallery/family-setup.svg",
      desc: "Comfortable studio atmosphere for multi-generation family pictures and milestone portraits.",
    },
    {
      title: "Photo Prints",
      category: "Lab Printing",
      image: "/gallery/prints-setup.svg",
      desc: "High-definition prints on archival photographic paper in glossy and luster matte finishes.",
    },
    {
      title: "Digital Photo Delivery",
      category: "Digital Soft Copy",
      image: "/gallery/digital-setup.svg",
      desc: "Instant digital copies formatted to exact pixel and file size limits for online visa portals.",
    },
  ];

  // Demonstration Reviews (Clearly marked for development)
  const demoReviews = [
    {
      name: "Rajesh Panchal",
      date: "October 2026",
      rating: 5,
      comment:
        "Got my US visa photos done here. Dharmesh ji knew the exact DS-160 specification and confirmed no glasses rule. Photos were accepted with zero issues at VFS Mumbai. Very fast service!",
    },
    {
      name: "Meera Thakkar",
      date: "September 2026",
      rating: 5,
      comment:
        "Very patient with elderly parents for passport renewal photos. Located right near Patla Devi Temple in Somvari Bazar. Prints were ready in 10 minutes.",
    },
    {
      name: "Karan D'Souza",
      date: "August 2026",
      rating: 5,
      comment:
        "Accurate Schengen visa photos for German consulate. Light grey background was perfect. Also got a high-res digital copy sent straight to my WhatsApp.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-amber-50/20 py-16 sm:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-studio-gold-100 text-studio-gold-700 border border-studio-gold-300 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-studio-gold-600" />
                <span>Malad West&apos;s Trusted Neighborhood Studio</span>
              </div>

              {/* Exact Main Message */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Passport &amp; Visa Photos in Malad West —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-studio-blue-600 to-studio-blue-700">
                  Ready Fast
                </span>
              </h1>

              {/* Supporting text */}
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Professional passport, visa and studio photography near Patla Devi Temple, Malad West.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Primary CTA */}
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700 active:scale-95 transition shadow-lg shadow-studio-blue-600/30"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment</span>
                </Link>

                {/* Secondary CTA: Get Directions */}
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=19.182917,72.842194"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm sm:text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition active:scale-95"
                >
                  <Navigation className="w-4 h-4 text-studio-coral-500" />
                  <span>Get Directions</span>
                </a>

                {/* Third Quick Action: WhatsApp Us */}
                <button
                  onClick={() => openWhatsApp("Hello Dharmesh ji, I need passport/visa photos. Are you available now?")}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm sm:text-base font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition shadow-sm active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <span>WhatsApp Us</span>
                </button>
              </div>

              {/* Visible Trust Badges */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/70 border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">
                    Fast 15-Min Service
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/70 border border-slate-200/80">
                  <ShieldCheck className="w-5 h-5 text-studio-blue-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">
                    Professional Quality
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/70 border border-slate-200/80">
                  <MapPin className="w-5 h-5 text-studio-coral-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">
                    Convenient Malad West Location
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card Column: Studio Snapshot */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-200/80">
                {/* Floating Aperture Badge */}
                <div className="absolute -top-4 -right-4 bg-studio-gold-500 text-slate-900 font-black text-xs px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  <span>EST. 2005</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Studio Status
                      </span>
                      <LiveStatusBadge showDetails={true} />
                    </div>
                  </div>

                  {/* Highlights Card */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Today&apos;s Highlights
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-studio-blue-600"></span>
                        <strong>US Visa (2x2&quot;) &amp; DS-160</strong> — Digital + Physical Prints
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-studio-blue-600"></span>
                        <strong>Schengen &amp; UK Visas</strong> — Light grey background
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-studio-blue-600"></span>
                        <strong>India Passport &amp; OCI</strong> — Instant 8-print sets
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-studio-blue-600"></span>
                        <strong>Baby &amp; Infant Photos</strong> — Patient studio handling
                      </li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900">
                    <p className="font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-studio-blue-600" />
                      Landmark Location:
                    </p>
                    <p className="mt-0.5 text-blue-800">
                      Shop No. 1, Monday Market, Near Patla Devi Temple, Bhailal Road, Somvari Bazar, Malad West.
                    </p>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <Link
                      href="/book"
                      className="flex-1 py-2.5 px-3 text-center rounded-xl bg-studio-blue-600 hover:bg-studio-blue-700 text-white font-bold text-xs transition"
                    >
                      Book 15-Min Slot
                    </Link>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=19.182917,72.842194"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 text-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1"
                    >
                      <span>Map</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK-SERVICE CARDS SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-studio-blue-600 bg-studio-blue-50 px-3 py-1 rounded-full border border-studio-blue-100">
              Complete Photography Services
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Crafted for Your Every Photographic Need
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              Accurate dimensions, professional lighting, and prompt local service right in Malad West.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card hover:shadow-cardHover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl border ${item.color}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-studio-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Starting Price:</span>
                      <span className="font-bold text-studio-blue-700">{item.price}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <Link
                        href={item.link}
                        className="text-xs font-semibold text-slate-600 hover:text-studio-blue-600 transition flex items-center gap-1"
                      >
                        Learn More <ChevronRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={item.link === "/print-order" ? "/print-order" : "/book"}
                        className="text-xs font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700 px-3 py-1.5 rounded-lg transition shadow-xs"
                      >
                        {item.action}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US SECTION */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-studio-gold-700 bg-studio-gold-100 px-3 py-1 rounded-full border border-studio-gold-200">
              Why Choose Om Photo Studio
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
              Local Experience You Can Count On
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-studio-blue-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-studio-gold-50 text-studio-gold-600 flex items-center justify-center mb-4 border border-studio-gold-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PASSPORT & VISA COUNTRY SPECIFICATIONS SECTION */}
      <section className="py-16 sm:py-20 bg-white" id="visa-specs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-studio-blue-600 bg-studio-blue-50 px-3 py-1 rounded-full border border-studio-blue-100">
                Country Specific Guidelines
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Passport &amp; Visa Specifications
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
                Requirements differ substantially by country. Click on any country below to inspect the specifications and ask us on WhatsApp.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/passport-visa-photos"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-studio-blue-600 hover:text-studio-blue-700 underline underline-offset-4"
              >
                View Complete Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Official Authority Reminder Alert */}
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="block text-amber-950 font-semibold mb-0.5">
                Always Confirm Requirements Before Visiting:
              </strong>
              Embassy rules for background tints (white vs light grey), ear visibility, glasses, and face percentages are updated by individual consulates. We advise customers to cross-check their visa application checklist.
            </div>
          </div>

          {/* Country Specification Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COUNTRY_SPECS.map((spec) => (
              <div
                key={spec.slug}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-studio-blue-400 hover:bg-white hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-studio-blue-700 uppercase tracking-wide">
                      {spec.dimensions}
                    </span>
                    <span className="text-xl">🌐</span>
                  </div>

                  <h3 className="mt-2 text-lg font-bold text-slate-900">{spec.country}</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {spec.specSummary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCountry(spec)}
                    className="text-xs font-bold text-studio-blue-600 hover:text-studio-blue-800 transition"
                  >
                    View Specs Modal &rarr;
                  </button>

                  <button
                    onClick={() => {
                      const text = `Hello Om Photo Studio, I need photos for ${spec.country} (${spec.dimensions}). Please let me know the requirements and slot availability.`;
                      openWhatsApp(text);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Ask on WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BOOKING TEASER SECTION */}
      <section className="py-16 bg-gradient-to-r from-studio-navy-900 via-studio-blue-900 to-studio-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-studio-gold-400 bg-studio-gold-400/10 px-3 py-1 rounded-full border border-studio-gold-400/30">
                Walk-ins Welcome • Priority Bookings
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Skip Waiting Time — Reserve Your Photo Appointment
              </h2>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Walk-ins are always warmly welcomed during studio hours. However, booking an appointment guarantees zero wait time and dedicated camera calibration.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-studio-gold-400" />
                  <span>Mon–Sat: 10:00 AM – 9:00 PM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-studio-gold-400" />
                  <span>Sunday: 10:30 AM – 5:00 PM</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/book"
                className="w-full text-center py-4 px-6 rounded-xl font-extrabold text-slate-900 bg-studio-gold-400 hover:bg-studio-gold-300 transition shadow-lg shadow-studio-gold-400/20 active:scale-95"
              >
                Book Your Slot Online
              </Link>
              <button
                onClick={() => openWhatsApp("Hello Dharmesh ji, I want to book a walk-in photo session today.")}
                className="w-full text-center py-3.5 px-6 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Message on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SAMPLE GALLERY PREVIEW */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-studio-blue-600 bg-studio-blue-50 px-3 py-1 rounded-full border border-studio-blue-100">
                Studio Quality Preview
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Our Work &amp; Equipment Standards
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
                Demonstration samples illustrating our professional lighting, proportions, paper finishes, and digital formats.
              </p>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-studio-blue-600 hover:text-studio-blue-700 underline underline-offset-4"
            >
              Explore Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryPreviews.map((card, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 hover:shadow-cardHover transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                    {card.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-amber-500/90 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                    Demonstration Sample
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-studio-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            * Note: Visuals are illustrative demonstration samples representing studio setup and formatting standards, not actual customer photos.
          </p>
        </div>
      </section>

      {/* 7. REVIEWS & COMMUNITY TRUST SECTION */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                Customer Feedback
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                Trusted by Families &amp; Travellers in Malad
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Demonstration feedback showcasing local customer scenarios.
              </p>
            </div>

            <button
              onClick={openGoogleReview}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition active:scale-95"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Leave a Google Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoReviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{rev.name}</span>
                    <span className="text-slate-400">Malad Resident</span>
                  </div>
                  <span className="text-slate-400">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LOCATION, HOURS & DIRECTIONS SECTION */}
      <section className="py-16 sm:py-20 bg-white" id="location">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-studio-coral-600 bg-studio-coral-50 px-3 py-1 rounded-full border border-studio-coral-100">
                Find Our Studio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Visit Us at Somvari Bazar, Malad West
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Conveniently located near Patla Devi Temple on Bhailal Road. Serving Somvari Bazar, Monday Market, and all nearby areas of Malad West and Kandivali.
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-studio-coral-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Address:</span>
                    <span className="text-slate-700">
                      Shop No. 1, Monday Market, Near Patla Devi Temple, Bhailal Road, Somvari Bazar, Malad West, Mumbai – 400064, Maharashtra, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-studio-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Opening Timings:</span>
                    <span className="text-slate-700 block">Monday–Saturday: 10:00 AM – 9:00 PM</span>
                    <span className="text-slate-700 block">Sunday: 10:30 AM – 5:00 PM</span>
                  </div>
                </div>

                <div className="pt-2">
                  <LiveStatusBadge showDetails={true} />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=19.182917,72.842194"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700 transition shadow-md shadow-studio-blue-600/25 active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions (Google Maps)
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=19.182917,72.842194"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-studio-coral-500" />
                  View on Map
                </a>
              </div>
            </div>

            {/* Right Map Card Column */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
                {/* Visual Map Canvas / Coordinates Box */}
                <div className="p-8 text-center bg-gradient-to-tr from-slate-900 to-studio-navy-900 text-white min-h-[360px] flex flex-col justify-center items-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-studio-coral-500/20 border border-studio-coral-500/40 text-studio-coral-400 flex items-center justify-center">
                    <MapPin className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">Om Photo Studio</h3>
                    <p className="text-xs text-slate-300 mt-1">
                      GPS Coordinates: 19°10&apos;58.5&quot;N 72°50&apos;31.9&quot;E (19.182917, 72.842194)
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 max-w-sm">
                    Just 2 minutes from Patla Devi Temple, Bhailal Road, in the heart of Somvari Bazar market.
                  </p>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=19.182917,72.842194"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-studio-gold-400 hover:bg-studio-gold-300 text-slate-950 font-extrabold text-xs transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open Live Interactive Google Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Country Specification Modal */}
      <CountrySpecModal
        spec={selectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
    </div>
  );
}

