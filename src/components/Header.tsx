"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Calendar, MessageCircle, Menu, X, Globe, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useActionModals } from "./ActionModalsContext";
import LiveStatusBadge from "./LiveStatusBadge";

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { openWhatsApp } = useActionModals();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/passport-visa-photos", label: t.nav.passportVisa },
    { href: "/book", label: t.nav.bookNow },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/print-order", label: t.nav.printOrder },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
    { href: "/faq", label: t.nav.faq },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top micro-bar: Local address, Hours badge & Language toggle */}
      <div className="bg-studio-navy-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <LiveStatusBadge showDetails={false} />
            <span className="hidden sm:inline text-slate-300">
              Shop No. 1, Somvari Bazar, Malad West, Mumbai
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
              <Globe className="w-3.5 h-3.5 text-studio-gold-400" />
              <button
                onClick={() => setLanguage("en")}
                className={`px-1.5 py-0.5 rounded transition ${
                  language === "en" ? "bg-studio-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-1.5 py-0.5 rounded transition ${
                  language === "hi" ? "bg-studio-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
                title="हिंदी में देखें"
              >
                हिन्दी
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => setLanguage("mr")}
                className={`px-1.5 py-0.5 rounded transition ${
                  language === "mr" ? "bg-studio-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
                title="मराठीत पहा"
              >
                मराठी
              </button>
            </div>

            <Link
              href="/admin"
              className="text-slate-400 hover:text-white transition text-[11px] underline underline-offset-2"
            >
              Owner Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-studio-blue-500 rounded-lg p-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-studio-blue-600 to-studio-blue-700 flex items-center justify-center text-white shadow-md shadow-studio-blue-600/20 group-hover:scale-105 transition-transform">
                <Camera className="w-6 h-6 text-studio-gold-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-studio-blue-700 transition-colors">
                  {t.brandName}
                </span>
                <span className="text-[11px] font-semibold text-studio-gold-600 tracking-wider uppercase">
                  Malad West • Since 2005
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
              {navLinks.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive(link.href)
                      ? "text-studio-blue-700 bg-studio-blue-50"
                      : "text-slate-600 hover:text-studio-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* More dropdown or direct links for remaining */}
              <Link
                href="/about"
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive("/about")
                    ? "text-studio-blue-700 bg-studio-blue-50"
                    : "text-slate-600 hover:text-studio-blue-600 hover:bg-slate-50"
                }`}
              >
                {t.nav.about}
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive("/contact")
                    ? "text-studio-blue-700 bg-studio-blue-50"
                    : "text-slate-600 hover:text-studio-blue-600 hover:bg-slate-50"
                }`}
              >
                {t.nav.contact}
              </Link>
            </nav>

            {/* Header Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                onClick={() => openWhatsApp("Hello Dharmesh ji, I am checking availability for photo services at Om Photo Studio.")}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-xs"
                title="Message on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{t.actions.whatsappUs}</span>
              </button>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700 transition shadow-md shadow-studio-blue-600/25 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.actions.bookAppointment}</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => openWhatsApp("Hello Dharmesh ji, I need quick photo services in Malad West.")}
                className="p-2 text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200"
                aria-label="WhatsApp Us"
              >
                <MessageCircle className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-studio-blue-500"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700"
              >
                <Calendar className="w-4 h-4" />
                {t.actions.bookAppointment}
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp();
                }}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                {t.actions.whatsappUs}
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold transition ${
                    isActive(link.href)
                      ? "text-studio-blue-700 bg-studio-blue-50 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Owner: Dharmesh Pithwa</span>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-studio-blue-600 font-semibold underline"
              >
                Admin Area
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

