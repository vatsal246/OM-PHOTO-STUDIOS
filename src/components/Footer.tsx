"use client";

import React from "react";
import Link from "next/link";
import { Camera, MapPin, Clock, Phone, Mail, MessageCircle, Navigation, ShieldCheck, Heart } from "lucide-react";
import { useActionModals } from "./ActionModalsContext";
import LiveStatusBadge from "./LiveStatusBadge";

export default function Footer() {
  const { openWhatsApp, settings } = useActionModals();

  return (
    <footer className="bg-studio-navy-950 text-slate-300 border-t border-slate-800">
      {/* Upper Footer: Main Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Studio Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-studio-blue-600 flex items-center justify-center text-white shadow-md">
                <Camera className="w-5 h-5 text-studio-gold-300" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white">Om Photo Studio</span>
                <span className="block text-xs font-medium text-studio-gold-400">
                  Prop. Dharmesh Pithwa
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Your neighborhood photography studio in Malad West, Mumbai. Specializing in high-precision passport, visa, and portrait photography with fast turnaround.
            </p>

            <div className="pt-2">
              <LiveStatusBadge showDetails={true} />
            </div>

            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={() => openWhatsApp("Hello Dharmesh ji, I need information regarding photo services.")}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 hover:bg-emerald-900/60 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Us
              </button>
            </div>
          </div>

          {/* Column 2: Studio Location & Directions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-studio-coral-500" />
              Studio Location
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Shop No. 1, Monday Market,<br />
              Near Patla Devi Temple, Bhailal Road,<br />
              Somvari Bazar, Malad West,<br />
              Mumbai – 400064, Maharashtra
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=19.182917,72.842194"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-studio-gold-400 hover:text-studio-gold-300 transition"
              >
                <Navigation className="w-3.5 h-3.5" />
                Get Driving / Walking Directions
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=19.182917,72.842194"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-studio-blue-400 hover:text-studio-blue-300 transition"
              >
                <MapPin className="w-3.5 h-3.5" />
                View on Google Maps (19.1829° N, 72.8422° E)
              </a>
            </div>
          </div>

          {/* Column 3: Hours & Quick Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-studio-gold-400" />
              Studio Working Hours
            </h4>
            <div className="text-sm space-y-2 text-slate-400">
              <div>
                <span className="font-semibold text-slate-200 block">Monday – Saturday:</span>
                <span>10:00 AM – 9:00 PM</span>
              </div>
              <div>
                <span className="font-semibold text-slate-200 block">Sunday:</span>
                <span>10:30 AM – 5:00 PM</span>
              </div>
            </div>

            <div className="pt-2 space-y-1.5 text-xs text-slate-400">
              {settings.phoneNumber ? (
                <a
                  href={`tel:${settings.phoneNumber}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-studio-blue-400" />
                  {settings.phoneNumber}
                </a>
              ) : (
                <div className="flex items-center gap-2 text-slate-500">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone: Configured in Admin</span>
                </div>
              )}

              {settings.emailAddress ? (
                <a
                  href={`mailto:${settings.emailAddress}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <Mail className="w-3.5 h-3.5 text-studio-blue-400" />
                  {settings.emailAddress}
                </a>
              ) : (
                <div className="flex items-center gap-2 text-slate-500">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email: Configured in Admin</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 4: Quick Navigation & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Navigation
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Photo Services
                </Link>
              </li>
              <li>
                <Link href="/passport-visa-photos" className="hover:text-white transition">
                  Passport &amp; Visa Specifications
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition">
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition">
                  Studio Sample Gallery
                </Link>
              </li>
              <li>
                <Link href="/print-order" className="hover:text-white transition">
                  Photo Print Order Request
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-studio-gold-400 transition font-medium">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Visa Compliance Advisory Note */}
        <div className="mt-12 pt-6 border-t border-slate-800/80">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-studio-gold-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300">Visa &amp; Travel Compliance Notice:</strong> Photo specifications (dimensions, background tone, eye-level, facial coverage, headwear, and glasses) are established by official embassies, consulates, and government passport agencies. While Om Photo Studio follows recognized international biometric guidelines, customers must always confirm current requirements with the relevant official authority before their appointment.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Micro Footer: Copyright */}
      <div className="border-t border-slate-900 bg-black/40 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Om Photo Studio. Owned by Dharmesh Pithwa. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Serving Malad West, Somvari Bazar &amp; Mumbai Suburbs
          </p>
        </div>
      </div>
    </footer>
  );
}

