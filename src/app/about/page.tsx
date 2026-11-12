"use client";

import React from "react";
import Link from "next/link";
import {
  Camera,
  Award,
  Heart,
  Users,
  MapPin,
  Clock,
  MessageCircle,
  Navigation,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useActionModals } from "@/components/ActionModalsContext";
import LiveStatusBadge from "@/components/LiveStatusBadge";

export default function AboutPage() {
  const { openWhatsApp } = useActionModals();

  const values = [
    {
      title: "Biometric Accuracy",
      desc: "Every passport and visa photo is inspected for head-to-crown millimeter ratios, eye reflection, and lighting symmetry.",
      icon: ShieldCheck,
    },
    {
      title: "Patient & Friendly Service",
      desc: "We take extra care with crying babies, elderly parents, and first-time visa applicants so you feel relaxed and confident.",
      icon: Heart,
    },
    {
      title: "Community Heritage",
      desc: "Operating at Shop No. 1, Somvari Bazar, we take pride in serving Malad West generations for passports, weddings, and milestones.",
      icon: Users,
    },
    {
      title: "Fast Turnaround",
      desc: "We value your schedule. Standard passport photos are processed, printed, and packaged within 15 minutes.",
      icon: Clock,
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <LiveStatusBadge showDetails={true} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            About Om Photo Studio
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Malad West&apos;s trusted neighborhood photography studio founded and managed by Dharmesh Pithwa.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-studio-gold-600 bg-studio-gold-50 px-3 py-1 rounded-full border border-studio-gold-200">
                Studio Heritage
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                A Neighborhood Studio Built on Trust and Precision
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Located in the bustling Somvari Bazar market right next to the historic Patla Devi Temple in Malad West, <strong>Om Photo Studio</strong> was established with a straightforward promise: delivering true-to-life photography with unmatched precision, speed, and genuine hospitality.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Over the years, proprietor <strong>Dharmesh Pithwa</strong> has photographed thousands of local families, college students applying for international study permits, professionals moving abroad for work, and neighbors renewing their Indian passports.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                While technology in photography has evolved from traditional darkrooms to modern digital sensors, our commitment to patient, personalized service has remained unchanged.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Founded &amp; Managed by Dharmesh Pithwa</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Specialized in Official Biometrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Located at Somvari Bazar, Malad West</span>
                </div>
              </div>
            </div>

            {/* Right Card: Studio Profile */}
            <div className="lg:col-span-5 bg-gradient-to-tr from-slate-900 to-studio-navy-900 text-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-studio-gold-400 text-slate-900 flex items-center justify-center font-bold text-xl shadow-md">
                <Camera className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs text-studio-gold-300 font-bold uppercase tracking-wider block">
                  Studio Proprietor
                </span>
                <h3 className="text-2xl font-black text-white mt-0.5">Dharmesh Pithwa</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Master Photographer &amp; Biometric Specialist
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-xs text-slate-300 leading-relaxed">
                &ldquo;A passport or visa photo might look simple, but an application rejection causes days of delay and stress. We take responsibility for getting the proportions, lighting, and background right on the very first try.&rdquo;
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => openWhatsApp("Hello Dharmesh ji, I would like to inquire about photo services.")}
                  className="w-full py-3 px-4 rounded-xl font-bold text-slate-950 bg-studio-gold-400 hover:bg-studio-gold-300 transition text-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message Dharmesh on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Our Guiding Principles */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900">Our Core Principles</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Why Malad West residents trust us for their important documentation photos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-studio-blue-50 text-studio-blue-600 flex items-center justify-center border border-studio-blue-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{v.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Studio Location Map Action */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-50 text-studio-coral-600 rounded-2xl border border-red-100 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Shop No. 1, Somvari Bazar, Malad West
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Bhailal Road, Near Patla Devi Temple, Monday Market, Mumbai – 400064
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=19.182917,72.842194"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700 transition text-xs sm:text-sm text-center shadow-sm flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
            <Link
              href="/book"
              className="px-5 py-3 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition text-xs sm:text-sm text-center"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

