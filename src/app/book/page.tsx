"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Navigation,
  MapPin,
  Sparkles,
  Camera,
} from "lucide-react";
import { getISTDateString } from "@/lib/time";
import { useActionModals } from "@/components/ActionModalsContext";
import LiveStatusBadge from "@/components/LiveStatusBadge";

interface TimeSlotItem {
  time: string;
  isAvailable: boolean;
  reason?: string;
}

interface BookingConfirmation {
  reference: string;
  customerName: string;
  mobile: string;
  service: string;
  appointmentDate: string;
  timeSlot: string;
  numberOfPeople: number;
}

function BookPageContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "passport";
  const { openWhatsApp } = useActionModals();

  const todayStr = getISTDateString();

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(
    initialService === "visa"
      ? "Visa Photographs"
      : initialService === "general"
      ? "General Studio Photography"
      : "Passport-size Photographs"
  );
  const [countryOrType, setCountryOrType] = useState(
    initialService === "visa" ? "USA (2x2 inch)" : "India Passport (3.5x4.5 cm)"
  );
  const [appointmentDate, setAppointmentDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  // Slot generation & fetching
  const [slots, setSlots] = useState<TimeSlotItem[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  // Fetch slots whenever appointmentDate changes
  useEffect(() => {
    async function fetchSlots() {
      setLoadingSlots(true);
      setSelectedSlot("");
      setErrorMessage("");
      try {
        const res = await fetch(`/api/bookings?date=${appointmentDate}`);
        if (res.ok) {
          const data = await res.json();
          setSlots(data.slots || []);
        } else {
          const err = await res.json();
          setErrorMessage(err.error || "Failed to load slots for selected date.");
          setSlots([]);
        }
      } catch (e) {
        console.error("Slot fetch error:", e);
        setErrorMessage("Network issue while checking available time slots.");
      } finally {
        setLoadingSlots(false);
      }
    }

    if (appointmentDate) {
      fetchSlots();
    }
  }, [appointmentDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMessage("Please enter your full name (minimum 2 characters).");
      return;
    }

    if (!mobile.trim() || !/^[0-9]{10}$/.test(mobile.trim())) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!appointmentDate || appointmentDate < todayStr) {
      setErrorMessage("Please select today or a future date.");
      return;
    }

    if (!selectedSlot) {
      setErrorMessage("Please select an available time slot.");
      return;
    }

    if (!consent) {
      setErrorMessage("Please check the consent box to confirm your appointment.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          mobile: mobile.trim(),
          email: email.trim() || undefined,
          service,
          countryOrType:
            service.includes("Passport") || service.includes("Visa")
              ? countryOrType
              : undefined,
          appointmentDate,
          timeSlot: selectedSlot,
          numberOfPeople: Number(numberOfPeople),
          notes: notes.trim() || undefined,
          consent: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to create booking. Please try another slot.");
      } else {
        setConfirmation({
          reference: data.reference,
          customerName: customerName.trim(),
          mobile: mobile.trim(),
          service,
          appointmentDate,
          timeSlot: selectedSlot,
          numberOfPeople: Number(numberOfPeople),
        });
      }
    } catch (err) {
      console.error("Booking submit error:", err);
      setErrorMessage("A server error occurred. Please try again or reach us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleShareOnWhatsApp = () => {
    if (!confirmation) return;
    const text = `Hello Om Photo Studio! I have booked an appointment.\n\n• Reference: ${confirmation.reference}\n• Name: ${confirmation.customerName}\n• Service: ${confirmation.service}\n• Date: ${confirmation.appointmentDate}\n• Time Slot: ${confirmation.timeSlot}\n• People: ${confirmation.numberOfPeople}\n\nPlease confirm availability. Thank you!`;
    openWhatsApp(text);
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2">
            <LiveStatusBadge showDetails={true} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Book a Photo Appointment
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Reserve your 15-minute slot at Om Photo Studio, Malad West. Fast, guaranteed zero-waiting service.
          </p>
        </div>

        {/* Confirmation Modal / Screen if booking is complete */}
        {confirmation ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-xl space-y-6 animate-in zoom-in-95">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Appointment Reserved
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Booking Confirmed!
                </h2>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Booking Reference Number
                </span>
                <span className="text-lg font-black text-studio-blue-700 font-mono">
                  {confirmation.reference}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                <div>
                  <span className="font-semibold text-slate-900 block">Customer Name:</span>
                  <span>{confirmation.customerName}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Mobile:</span>
                  <span>{confirmation.mobile}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Date &amp; Time:</span>
                  <span className="font-bold text-studio-blue-600">
                    {confirmation.appointmentDate} at {confirmation.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Service:</span>
                  <span>{confirmation.service} ({confirmation.numberOfPeople} person/people)</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900 leading-relaxed">
              <strong className="block font-semibold mb-0.5">Location Reminder:</strong>
              Shop No. 1, Monday Market, Near Patla Devi Temple, Bhailal Road, Somvari Bazar, Malad West, Mumbai – 400064. Walk-in 5 minutes before your time.
            </div>

            {/* Actions on Confirmation */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleShareOnWhatsApp}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-5 h-5" />
                Send Booking Details via WhatsApp
              </button>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=19.182917,72.842194"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition"
              >
                <Navigation className="w-4 h-4 text-studio-coral-500" />
                Get Driving Directions
              </a>

              <button
                onClick={() => {
                  setConfirmation(null);
                  setSelectedSlot("");
                }}
                className="py-3.5 px-4 rounded-xl font-semibold text-slate-600 hover:text-slate-900 text-sm transition"
              >
                Book Another Slot
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-8"
          >
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Step 1: Personal Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <User className="w-5 h-5 text-studio-blue-600" />
                1. Customer Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 focus:border-studio-blue-500 bg-white"
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
                      className="w-full px-4 py-2.5 rounded-r-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 focus:border-studio-blue-500 bg-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 focus:border-studio-blue-500 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Service Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Camera className="w-5 h-5 text-studio-gold-600" />
                2. Select Service &amp; Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Service Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 focus:border-studio-blue-500 bg-white"
                  >
                    <option value="Passport-size Photographs">Passport-size Photographs (8 prints)</option>
                    <option value="Visa Photographs">Visa Photographs (Embassy compliant)</option>
                    <option value="General Studio Photography">General Studio Portrait</option>
                    <option value="Family Photography">Family Group Session</option>
                    <option value="Photo Printing">Photo Printing (Available on request)</option>
                  </select>
                </div>

                {(service.includes("Passport") || service.includes("Visa")) && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Country Specification <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={countryOrType}
                      onChange={(e) => setCountryOrType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 focus:border-studio-blue-500 bg-white"
                    >
                      <option value="India Passport (3.5x4.5 cm)">India Passport (3.5x4.5 cm)</option>
                      <option value="USA (2x2 inch)">USA Visa / DS-160 (2x2 inch)</option>
                      <option value="UK Visa & Passport (35x45 mm)">UK Visa &amp; Passport (35x45 mm)</option>
                      <option value="Schengen Visa (35x45 mm)">Schengen Visa (35x45 mm)</option>
                      <option value="Canada Visa (50x70 mm)">Canada Visa (50x70 mm)</option>
                      <option value="Other Country">Other Country (Custom)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Number of People
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 focus:border-studio-blue-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Special Notes / Instructions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Infant 6 months, or need digital copy"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 focus:border-studio-blue-500 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Date & Time Slot Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Clock className="w-5 h-5 text-studio-coral-600" />
                3. Choose Appointment Date &amp; Time
              </h3>

              <div className="max-w-xs">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Appointment Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  required
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 focus:border-studio-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Available 30-Minute Slots on {appointmentDate} (IST): <span className="text-red-500">*</span>
                </label>

                {loadingSlots ? (
                  <div className="py-8 text-center text-xs text-slate-500 animate-pulse">
                    Checking available studio slots in Malad West...
                  </div>
                ) : slots.length === 0 ? (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
                    No available booking slots remaining on this date. Please select another date or walk in directly.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {slots.map((slotItem) => {
                      const isSelected = selectedSlot === slotItem.time;
                      return (
                        <button
                          key={slotItem.time}
                          type="button"
                          disabled={!slotItem.isAvailable}
                          onClick={() => setSelectedSlot(slotItem.time)}
                          className={`p-2.5 rounded-xl text-xs font-bold text-center border transition ${
                            !slotItem.isAvailable
                              ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through"
                              : isSelected
                              ? "bg-studio-blue-600 text-white border-studio-blue-600 shadow-md ring-2 ring-studio-blue-400"
                              : "bg-white text-slate-800 border-slate-300 hover:border-studio-blue-400 hover:bg-blue-50/50"
                          }`}
                        >
                          <div>{slotItem.time}</div>
                          {!slotItem.isAvailable && (
                            <span className="block text-[9px] font-normal text-slate-400">
                              {slotItem.reason || "Booked"}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-studio-blue-600 focus:ring-studio-blue-500 border-slate-300"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I consent to Om Photo Studio securely storing my appointment booking information locally to manage my session schedule. I understand no online payment is required right now and payment is made at the studio upon collecting prints.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700 active:scale-95 transition shadow-lg shadow-studio-blue-600/25 disabled:opacity-50"
              >
                <Calendar className="w-5 h-5" />
                {submitting ? "Reserving Slot..." : "Confirm & Reserve Appointment"}
              </button>

              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    `Hello Dharmesh ji, I would like to book an appointment for ${service} on ${appointmentDate}.`
                  )
                }
                className="py-4 px-5 rounded-xl font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                Book via WhatsApp Instead
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-slate-500 text-sm">
          Loading appointment scheduler...
        </div>
      }
    >
      <BookPageContent />
    </Suspense>
  );
}
