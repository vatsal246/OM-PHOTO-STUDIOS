"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Navigation,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useActionModals } from "@/components/ActionModalsContext";
import LiveStatusBadge from "@/components/LiveStatusBadge";

export default function ContactPage() {
  const { openWhatsApp, settings } = useActionModals();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Passport-size Photos");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState<{
    name: string;
    service: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!mobile.trim() || !/^[0-9]{10}$/.test(mobile.trim())) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!message.trim() || message.trim().length < 5) {
      setErrorMessage("Please enter a message (at least 5 characters).");
      return;
    }

    if (!consent) {
      setErrorMessage("Please consent to send your inquiry.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          mobile: mobile.trim(),
          email: email.trim() || undefined,
          service,
          message: message.trim(),
          consent: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to submit inquiry.");
      } else {
        setSuccessData({
          name: name.trim(),
          service,
          message: message.trim(),
        });
      }
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setErrorMessage("Network issue while submitting inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleContinueToWhatsApp = () => {
    if (!successData) return;
    const text = `Hello Dharmesh ji, I submitted an inquiry on your website.\n\n• Name: ${successData.name}\n• Service: ${successData.service}\n• Message: "${successData.message}"\n\nPlease let me know further details. Thank you!`;
    openWhatsApp(text);
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <LiveStatusBadge showDetails={true} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contact Om Photo Studio
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Reach out directly for photo requirements, quote inquiries, or visit our Malad West studio in Somvari Bazar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Details, Map & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Studio Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-5">
              <h3 className="text-xl font-bold text-slate-900">Studio Details</h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-studio-coral-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Address:</strong>
                    <span>
                      Shop No. 1, Monday Market, Near Patla Devi Temple, Bhailal Road, Somvari Bazar, Malad West, Mumbai – 400064, Maharashtra
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-studio-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Working Hours (IST):</strong>
                    <span>Monday – Saturday: 10:00 AM – 9:00 PM</span>
                    <span className="block">Sunday: 10:30 AM – 5:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Phone:</strong>
                    {settings.phoneNumber ? (
                      <a href={`tel:${settings.phoneNumber}`} className="text-studio-blue-600 hover:underline">
                        {settings.phoneNumber}
                      </a>
                    ) : (
                      <span className="text-slate-400">Available on WhatsApp / In-studio</span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Email:</strong>
                    {settings.emailAddress ? (
                      <a href={`mailto:${settings.emailAddress}`} className="text-studio-blue-600 hover:underline">
                        {settings.emailAddress}
                      </a>
                    ) : (
                      <span className="text-slate-400">Available via website enquiry</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => openWhatsApp("Hello Dharmesh ji, I need directions to Om Photo Studio in Malad West.")}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp Directly
                </button>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=19.182917,72.842194"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition text-sm"
                >
                  <Navigation className="w-4 h-4 text-studio-coral-500" />
                  Get Turn-by-Turn Directions
                </a>
              </div>
            </div>

            {/* Map Preview Container */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Google Maps Location
                </span>
                <span className="text-xs font-mono text-slate-400">
                  19.182917, 72.842194
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-tr from-slate-900 to-studio-navy-900 text-white text-center space-y-3">
                <MapPin className="w-8 h-8 text-studio-gold-400 mx-auto" />
                <h4 className="font-bold text-base">Om Photo Studio • Somvari Bazar</h4>
                <p className="text-xs text-slate-300">
                  Monday Market, Near Patla Devi Temple, Bhailal Road, Malad West
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=19.182917,72.842194"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Enquiry Form */}
          <div className="lg:col-span-7">
            {successData ? (
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-xl space-y-6 animate-in zoom-in-95">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Message Received
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                      Thank You, {successData.name}!
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Your inquiry regarding <strong>{successData.service}</strong> has been saved directly to our local studio database. Dharmesh ji will review your requirements and respond promptly.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <span className="font-semibold text-slate-500 block mb-1">Your Message:</span>
                  &ldquo;{successData.message}&rdquo;
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleContinueToWhatsApp}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Continue Inquiry on WhatsApp
                  </button>

                  <button
                    onClick={() => {
                      setSuccessData(null);
                      setMessage("");
                    }}
                    className="py-3.5 px-4 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-sm transition"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Send an Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Have a question about photo sizes, baby photos, or pricing? Leave a message below.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Deepak Merchant"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9820012345"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                        className="w-full px-4 py-2.5 rounded-r-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="deepak@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Service Interested In <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 bg-white"
                    >
                      <option value="Passport-size Photos">Passport-size Photographs</option>
                      <option value="Visa Photographs">Visa Photographs (US, UK, Schengen, etc.)</option>
                      <option value="General Photography">General Studio Portrait</option>
                      <option value="Photo Printing">Photo Printing / Digital Copy</option>
                      <option value="Other Inquiries">General Question / Other</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Message / Requirement Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="e.g. Do you take US visa photos for infants? Do we need to book in advance?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 bg-white"
                    ></textarea>
                  </div>
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-studio-blue-600 focus:ring-studio-blue-500 border-slate-300"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I consent to Om Photo Studio storing my contact details locally to respond to my inquiry.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700 active:scale-95 transition shadow-lg shadow-studio-blue-600/25 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    {submitting ? "Sending..." : "Submit Inquiry to Studio"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

