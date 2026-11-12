"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Printer,
  UploadCloud,
  FileImage,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  MessageCircle,
  Navigation,
  Info,
} from "lucide-react";
import { useActionModals } from "@/components/ActionModalsContext";
import LiveStatusBadge from "@/components/LiveStatusBadge";

interface PrintPreview {
  file: File;
  previewUrl: string;
}

interface PrintConfirmation {
  reference: string;
  customerName: string;
  mobile: string;
  printSize: string;
  quantity: number;
  finish: string;
  pickupPreference: string;
  fileCount: number;
}

export default function PrintOrderPage() {
  const { openWhatsApp } = useActionModals();

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [printSize, setPrintSize] = useState("4x6 inch (Standard)");
  const [quantity, setQuantity] = useState(1);
  const [finish, setFinish] = useState("Glossy");
  const [pickupPreference, setPickupPreference] = useState("Same Day Evening");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  // Files & Previews
  const [selectedPreviews, setSelectedPreviews] = useState<PrintPreview[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmation, setConfirmation] = useState<PrintConfirmation | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    const validNewPreviews: PrintPreview[] = [];
    for (const file of filesArray) {
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        setErrorMessage(`Skipped "${file.name}" because only images and PDFs are allowed.`);
        continue;
      }
      if (file.size > 15 * 1024 * 1024) {
        setErrorMessage(`File "${file.name}" exceeds 15MB limit.`);
        continue;
      }
      const previewUrl = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : "";
      validNewPreviews.push({ file, previewUrl });
    }

    setSelectedPreviews((prev) => [...prev, ...validNewPreviews]);
  };

  const removeFile = (index: number) => {
    setSelectedPreviews((prev) => {
      const copy = [...prev];
      if (copy[index]?.previewUrl) {
        URL.revokeObjectURL(copy[index].previewUrl);
      }
      copy.splice(index, 1);
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!mobile.trim() || !/^[0-9]{10}$/.test(mobile.trim())) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (selectedPreviews.length === 0) {
      setErrorMessage("Please upload at least one image file for printing.");
      return;
    }

    if (!consent) {
      setErrorMessage("Please agree to the consent terms before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("customerName", customerName.trim());
      formData.append("mobile", mobile.trim());
      formData.append("printSize", printSize);
      formData.append("quantity", String(quantity));
      formData.append("finish", finish);
      formData.append("pickupPreference", pickupPreference);
      formData.append("notes", notes.trim());
      formData.append("consent", "true");

      for (const preview of selectedPreviews) {
        formData.append("files", preview.file);
      }

      const res = await fetch("/api/print-order", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to submit print order.");
      } else {
        setConfirmation({
          reference: data.reference,
          customerName: customerName.trim(),
          mobile: mobile.trim(),
          printSize,
          quantity,
          finish,
          pickupPreference,
          fileCount: selectedPreviews.length,
        });
      }
    } catch (err) {
      console.error("Print submit error:", err);
      setErrorMessage("Network issue submitting print request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleShareOnWhatsApp = () => {
    if (!confirmation) return;
    const text = `Hello Om Photo Studio! I have submitted a Photo Print Order.\n\n• Order Ref: ${confirmation.reference}\n• Name: ${confirmation.customerName}\n• Size: ${confirmation.printSize}\n• Qty: ${confirmation.quantity}\n• Finish: ${confirmation.finish}\n• Pickup: ${confirmation.pickupPreference}\n• Files Uploaded: ${confirmation.fileCount}\n\nPlease let me know the final price and pickup confirmation. Thank you!`;
    openWhatsApp(text);
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <LiveStatusBadge showDetails={true} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Photo Print Order Request
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Upload your favorite photos from your phone or camera for high-definition lab printing. Collect directly from our Somvari Bazar studio in Malad West.
          </p>
        </div>

        {/* Studio Disclaimer Notice */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs sm:text-sm">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-amber-950 font-semibold mb-0.5">
              Pickup &amp; Pricing Policy:
            </strong>
            Final price and pickup time will be confirmed by the studio upon checking original resolution and color profiles. Photo printing is available on request.
          </div>
        </div>

        {/* Confirmation Screen */}
        {confirmation ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-xl space-y-6 animate-in zoom-in-95">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Request Received
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Print Request Submitted!
                </h2>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Order Reference Number
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
                  <span className="font-semibold text-slate-900 block">Print Specs:</span>
                  <span>
                    {confirmation.printSize} • {confirmation.finish} Finish ({confirmation.quantity} copies)
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Pickup Preference:</span>
                  <span>{confirmation.pickupPreference}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900 leading-relaxed">
              <strong className="block font-semibold mb-0.5">What Happens Next:</strong>
              Dharmesh ji will review your uploaded image files, ensure sharp resolution and proper aspect ratio cropping, and send you the exact total cost and pickup schedule.
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleShareOnWhatsApp}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-5 h-5" />
                Send Print Order Details via WhatsApp
              </button>

              <button
                onClick={() => {
                  setConfirmation(null);
                  setSelectedPreviews([]);
                }}
                className="py-3.5 px-4 rounded-xl font-semibold text-slate-600 hover:text-slate-900 text-sm transition"
              >
                Upload Another Photo
              </button>
            </div>
          </div>
        ) : (
          /* Print Order Form */
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

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                1. Customer Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunita Joshi"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
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
              </div>
            </div>

            {/* Upload Zone */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                <span>2. Upload Images</span>
                <span className="text-xs text-slate-400 font-normal">Max 15MB per file</span>
              </h3>

              <div className="border-2 border-dashed border-slate-300 hover:border-studio-blue-500 rounded-2xl p-6 sm:p-8 text-center transition bg-slate-50/50 hover:bg-blue-50/20">
                <input
                  type="file"
                  id="print-upload"
                  multiple
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="print-upload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-studio-blue-50 text-studio-blue-600 flex items-center justify-center border border-studio-blue-200">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-studio-blue-700">
                    Click to select photos from phone or computer
                  </span>
                  <span className="text-xs text-slate-500">
                    Supports JPG, PNG, WEBP, and PDF documents
                  </span>
                </label>
              </div>

              {/* Uploaded File Previews */}
              {selectedPreviews.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Selected Files ({selectedPreviews.length}):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedPreviews.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-100 aspect-square group shadow-xs"
                      >
                        {item.previewUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.previewUrl}
                            alt={item.file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-slate-500 text-xs">
                            <FileImage className="w-6 h-6 mb-1 text-slate-400" />
                            <span className="truncate w-full">{item.file.name}</span>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 shadow-md"
                          aria-label="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div className="absolute bottom-0 inset-x-0 bg-slate-900/70 p-1 text-[9px] text-white truncate text-center backdrop-blur-xs">
                          {item.file.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Print Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                3. Print Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Print Dimensions
                  </label>
                  <select
                    value={printSize}
                    onChange={(e) => setPrintSize(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 bg-white"
                  >
                    <option value="4x6 inch (Standard)">4 x 6 inch (Standard Album)</option>
                    <option value="5x7 inch">5 x 7 inch (Tabletop Frame)</option>
                    <option value="8x10 inch">8 x 10 inch (Portrait Frame)</option>
                    <option value="A4 (8.3x11.7 inch)">A4 Size (Certificate / Wall)</option>
                    <option value="Passport Size Sheet">Passport Size Sheet (8 copies)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Paper Finish
                  </label>
                  <select
                    value={finish}
                    onChange={(e) => setFinish(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 bg-white"
                  >
                    <option value="Glossy">Glossy (Vibrant &amp; Shiny)</option>
                    <option value="Matte">Matte / Luster (Anti-glare)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Number of Copies
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Pickup Preference at Studio
                  </label>
                  <select
                    value={pickupPreference}
                    onChange={(e) => setPickupPreference(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 bg-white"
                  >
                    <option value="Same Day Evening">Same Day Evening</option>
                    <option value="Next Day Morning">Next Day Morning (10:30 AM)</option>
                    <option value="Next Day Evening">Next Day Evening (6:00 PM)</option>
                    <option value="Weekend Pickup">Weekend Pickup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Framing / Special Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please crop white borders"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-studio-blue-500 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Consent */}
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
                  I confirm that I own or have permission to reproduce the uploaded photographs. I understand that Om Photo Studio will review the file quality and confirm final price before printing.
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700 active:scale-95 transition shadow-lg shadow-studio-blue-600/25 disabled:opacity-50"
              >
                <Printer className="w-5 h-5" />
                {submitting ? "Uploading & Submitting..." : "Submit Photo Print Request"}
              </button>

              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    "Hello Dharmesh ji, I want to send photos on WhatsApp for direct printing."
                  )
                }
                className="py-4 px-5 rounded-xl font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                Send via WhatsApp Instead
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

