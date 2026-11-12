"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Printer,
  MessageSquare,
  Settings,
  Images,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Phone,
  Trash2,
  Plus,
  Save,
  Eye,
} from "lucide-react";
import { useActionModals } from "../ActionModalsContext";

interface BookingItem {
  id: string;
  reference: string;
  customerName: string;
  mobile: string;
  email: string | null;
  service: string;
  countryOrType: string | null;
  appointmentDate: string;
  timeSlot: string;
  numberOfPeople: number;
  notes: string | null;
  status: string;
  createdAt: string;
}

interface PrintOrderItem {
  id: string;
  reference: string;
  customerName: string;
  mobile: string;
  printSize: string;
  quantity: number;
  finish: string;
  pickupPreference: string;
  filePaths: string;
  fileNames: string;
  notes: string | null;
  status: string;
  createdAt: string;
}

interface EnquiryItem {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  isSample: boolean;
  displayOrder: number;
}

interface Props {
  initialBookings: BookingItem[];
  initialPrintOrders: PrintOrderItem[];
  initialEnquiries: EnquiryItem[];
  initialSettings: any;
  initialGallery: GalleryItem[];
}

export default function AdminDashboardClient({
  initialBookings,
  initialPrintOrders,
  initialEnquiries,
  initialSettings,
  initialGallery,
}: Props) {
  const router = useRouter();
  const { refreshSettings } = useActionModals();

  const [activeTab, setActiveTab] = useState<
    "bookings" | "prints" | "enquiries" | "settings" | "gallery"
  >("bookings");

  // Data states
  const [bookings, setBookings] = useState<BookingItem[]>(initialBookings);
  const [printOrders, setPrintOrders] = useState<PrintOrderItem[]>(initialPrintOrders);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries);
  const [settings, setSettings] = useState<any>(initialSettings);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);

  // Search & Filters for Bookings
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("ALL");

  // Status feedback toast
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(
    null
  );
  const showFeedback = (message: string, type: "success" | "error" = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // Booking Status Update
  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
        showFeedback(`Booking status changed to ${newStatus}`);
      } else {
        showFeedback("Failed to update status", "error");
      }
    } catch {
      showFeedback("Network error updating booking", "error");
    }
  };

  // Print Order Status Update
  const updatePrintOrderStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/print-order/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setPrintOrders((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
        showFeedback(`Print order status updated to ${newStatus}`);
      } else {
        showFeedback("Failed to update status", "error");
      }
    } catch {
      showFeedback("Network error updating print order", "error");
    }
  };

  // Enquiry Status Update
  const updateEnquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        showFeedback(`Inquiry status updated to ${newStatus}`);
      }
    } catch {
      showFeedback("Network error updating inquiry", "error");
    }
  };

  // Settings Save
  const [savingSettings, setSavingSettings] = useState(false);
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        showFeedback("Business settings successfully saved to SQLite database!");
        await refreshSettings();
      } else {
        showFeedback("Failed to save settings", "error");
      }
    } catch {
      showFeedback("Error connecting to server", "error");
    } finally {
      setSavingSettings(false);
    }
  };

  // Gallery New Item
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("passport");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) {
      showFeedback("Title and Image URL are required", "error");
      return;
    }
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          category: newCategory,
          imageUrl: newImageUrl.trim(),
          description: newDescription.trim(),
          isSample: true,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setGallery((prev) => [...prev, data.item]);
        setNewTitle("");
        setNewImageUrl("");
        setNewDescription("");
        showFeedback("New gallery item created!");
      }
    } catch {
      showFeedback("Failed to add gallery item", "error");
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setGallery((prev) => prev.filter((i) => i.id !== id));
        showFeedback("Gallery item removed.");
      }
    } catch {
      showFeedback("Failed to delete gallery item", "error");
    }
  };

  // Metrics
  const pendingBookingsCount = bookings.filter((b) => b.status === "PENDING").length;
  const confirmedBookingsCount = bookings.filter((b) => b.status === "CONFIRMED").length;
  const pendingPrintsCount = printOrders.filter((p) => p.status === "PENDING" || p.status === "PROCESSING").length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === "NEW").length;

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.mobile.includes(bookingSearch) ||
      b.reference.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesStatus =
      bookingStatusFilter === "ALL" || b.status === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-800">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-extrabold tracking-tight">Om Photo Studio</span>
            <span className="text-xs bg-studio-gold-500 text-slate-950 font-bold px-2 py-0.5 rounded">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Prop. <strong>Dharmesh Pithwa</strong>
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-semibold transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Toast alert */}
        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-md animate-in fade-in ${
              feedback.type === "success"
                ? "bg-emerald-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            <span>{feedback.message}</span>
            <button onClick={() => setFeedback(null)}>✕</button>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => {
              setActiveTab("bookings");
              setBookingStatusFilter("PENDING");
            }}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs cursor-pointer hover:border-studio-blue-400 transition"
          >
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Pending Bookings
            </span>
            <span className="text-3xl font-black text-amber-600 block mt-1">
              {pendingBookingsCount}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Awaiting studio approval
            </span>
          </div>

          <div
            onClick={() => {
              setActiveTab("bookings");
              setBookingStatusFilter("CONFIRMED");
            }}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs cursor-pointer hover:border-studio-blue-400 transition"
          >
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Upcoming Bookings
            </span>
            <span className="text-3xl font-black text-studio-blue-600 block mt-1">
              {confirmedBookingsCount}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Confirmed appointments
            </span>
          </div>

          <div
            onClick={() => setActiveTab("prints")}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs cursor-pointer hover:border-studio-blue-400 transition"
          >
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Active Print Orders
            </span>
            <span className="text-3xl font-black text-emerald-600 block mt-1">
              {pendingPrintsCount}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Processing or awaiting pickup
            </span>
          </div>

          <div
            onClick={() => setActiveTab("enquiries")}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs cursor-pointer hover:border-studio-blue-400 transition"
          >
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              New Enquiries
            </span>
            <span className="text-3xl font-black text-studio-coral-600 block mt-1">
              {newEnquiriesCount}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Unanswered contact requests
            </span>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === "bookings"
                ? "bg-studio-blue-600 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("prints")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === "prints"
                ? "bg-studio-blue-600 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>Print Orders ({printOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("enquiries")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === "enquiries"
                ? "bg-studio-blue-600 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === "settings"
                ? "bg-studio-blue-600 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Business Settings</span>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === "gallery"
                ? "bg-studio-blue-600 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Images className="w-4 h-4" />
            <span>Gallery ({gallery.length})</span>
          </button>
        </div>

        {/* TAB 1: BOOKINGS MANAGEMENT */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Appointment Bookings Management
                </h3>
                <p className="text-xs text-slate-500">
                  Filter, confirm, complete, or cancel customer appointments.
                </p>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, phone, ref..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-studio-blue-500 bg-white"
                  />
                </div>

                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">Pending Only</option>
                  <option value="CONFIRMED">Confirmed Only</option>
                  <option value="COMPLETED">Completed Only</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No bookings found matching your search.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-3">Ref / Date</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Service</th>
                      <th className="py-3 px-3">Slot</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.map((b) => {
                      const isPending = b.status === "PENDING";
                      const isConfirmed = b.status === "CONFIRMED";
                      const isCompleted = b.status === "COMPLETED";
                      const isCancelled = b.status === "CANCELLED";

                      return (
                        <tr key={b.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-3">
                            <span className="font-mono font-bold text-slate-900 block">
                              {b.reference}
                            </span>
                            <span className="text-[11px] text-slate-500">{b.appointmentDate}</span>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="font-bold text-slate-900 block">{b.customerName}</span>
                            <div className="flex items-center gap-1.5 text-slate-500">
                              <span>+91 {b.mobile}</span>
                              <a
                                href={`https://wa.me/91${b.mobile}?text=${encodeURIComponent(
                                  `Hello ${b.customerName}, regarding your Om Photo Studio appointment (${b.reference}) on ${b.appointmentDate} at ${b.timeSlot}:`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:text-emerald-700 font-semibold"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            </div>
                            {b.email && <span className="text-[10px] text-slate-400 block">{b.email}</span>}
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="font-semibold text-slate-800 block">{b.service}</span>
                            {b.countryOrType && (
                              <span className="text-[11px] text-studio-blue-600 block">
                                {b.countryOrType}
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400">
                              {b.numberOfPeople} person(s)
                            </span>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded inline-block">
                              {b.timeSlot}
                            </span>
                            {b.notes && (
                              <span className="text-[11px] text-slate-500 italic block mt-1 max-w-xs truncate" title={b.notes}>
                                &ldquo;{b.notes}&rdquo;
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-3">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide inline-block ${
                                isConfirmed
                                  ? "bg-blue-100 text-blue-800"
                                  : isCompleted
                                  ? "bg-emerald-100 text-emerald-800"
                                  : isCancelled
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-right space-x-1">
                            {isPending && (
                              <button
                                onClick={() => updateBookingStatus(b.id, "CONFIRMED")}
                                className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px]"
                              >
                                Confirm
                              </button>
                            )}

                            {(isPending || isConfirmed) && (
                              <button
                                onClick={() => updateBookingStatus(b.id, "COMPLETED")}
                                className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                              >
                                Done
                              </button>
                            )}

                            {!isCancelled && (
                              <button
                                onClick={() => updateBookingStatus(b.id, "CANCELLED")}
                                className="px-2 py-1 rounded bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 text-[11px]"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRINT ORDERS */}
        {activeTab === "prints" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Photo Print Orders</h3>
              <p className="text-xs text-slate-500">
                View customer print requests, inspect uploaded files, and update production status.
              </p>
            </div>

            {printOrders.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No print requests currently in database.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {printOrders.map((p) => {
                  let files: string[] = [];
                  let names: string[] = [];
                  try {
                    files = JSON.parse(p.filePaths);
                    names = JSON.parse(p.fileNames);
                  } catch {}

                  return (
                    <div
                      key={p.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-studio-blue-700 text-sm">
                            {p.reference}
                          </span>
                          <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                            {p.status}
                          </span>
                        </div>

                        <div className="text-xs space-y-1 text-slate-700">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Customer:</span>
                            <span className="font-bold text-slate-900">{p.customerName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Mobile:</span>
                            <span className="font-semibold">+91 {p.mobile}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Specs:</span>
                            <span className="font-bold text-slate-900">
                              {p.printSize} • {p.finish} ({p.quantity} prints)
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Pickup Preference:</span>
                            <span className="font-semibold text-studio-coral-600">{p.pickupPreference}</span>
                          </div>
                          {p.notes && (
                            <div className="pt-1 text-slate-600 italic">
                              Note: &ldquo;{p.notes}&rdquo;
                            </div>
                          )}
                        </div>

                        {/* Uploaded File Previews */}
                        <div className="pt-2">
                          <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">
                            Uploaded Photos ({files.length}):
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {files.map((filePath, i) => (
                              <a
                                key={i}
                                href={filePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-16 h-16 rounded-lg overflow-hidden border border-slate-300 bg-white block"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={filePath}
                                  alt={names[i] || "uploaded photo"}
                                  className="w-full h-full object-cover group-hover:scale-110 transition"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white">
                                  <Eye className="w-4 h-4" />
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Status changer & WhatsApp trigger */}
                      <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                        <select
                          value={p.status}
                          onChange={(e) => updatePrintOrderStatus(p.id, e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="READY_FOR_PICKUP">READY FOR PICKUP</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>

                        <a
                          href={`https://wa.me/91${p.mobile}?text=${encodeURIComponent(
                            `Hello ${p.customerName}, regarding your photo print request (${p.reference}) at Om Photo Studio:`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Chat Customer
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Website Enquiries</h3>
              <p className="text-xs text-slate-500">
                Messages submitted through the studio contact form.
              </p>
            </div>

            {enquiries.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No inquiries submitted yet.
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{enq.name}</span>
                        <span className="text-xs text-slate-400">• +91 {enq.mobile}</span>
                        {enq.email && <span className="text-xs text-slate-400">({enq.email})</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            enq.status === "NEW"
                              ? "bg-red-100 text-red-800"
                              : enq.status === "CONTACTED"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {enq.status}
                        </span>
                        <select
                          value={enq.status}
                          onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                          className="px-2 py-1 rounded border border-slate-300 text-xs bg-white font-semibold"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="RESOLVED">RESOLVED</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500">
                      Service Interested In: <strong>{enq.service}</strong>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 bg-white p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                      &ldquo;{enq.message}&rdquo;
                    </p>

                    <div className="pt-1 flex justify-end">
                      <a
                        href={`https://wa.me/91${enq.mobile}?text=${encodeURIComponent(
                          `Hello ${enq.name}, thank you for contacting Om Photo Studio regarding ${enq.service}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Reply on WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BUSINESS SETTINGS */}
        {activeTab === "settings" && (
          <form
            onSubmit={handleSaveSettings}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900">Studio Business Settings</h3>
              <p className="text-xs text-slate-500">
                Update phone numbers, WhatsApp, Google review link, and pricing. All changes save directly to SQLite.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                1. Owner &amp; Contact Configurations
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Studio Name
                  </label>
                  <input
                    type="text"
                    value={settings.businessName}
                    onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-studio-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    value={settings.ownerName}
                    onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-studio-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Studio WhatsApp Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 9820012345 (Leave empty to test guidance modal)"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-studio-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    If empty, user buttons trigger a helpful modal asking Dharmesh to configure it.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Calling Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98200 12345"
                    value={settings.phoneNumber}
                    onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-studio-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Google Review Link (Business Profile URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://g.page/r/.../review (Leave empty to test unconfigured modal)"
                    value={settings.googleReviewUrl}
                    onChange={(e) => setSettings({ ...settings, googleReviewUrl: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-studio-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    If empty, the &ldquo;Leave a Google Review&rdquo; button pops up an informative modal explaining to configure it here.
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                2. Display Prices &amp; Starting From Rates
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Passport Photo Rate
                  </label>
                  <input
                    type="text"
                    value={settings.prices?.passport || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        prices: { ...settings.prices, passport: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Visa Photo Rate
                  </label>
                  <input
                    type="text"
                    value={settings.prices?.visa || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        prices: { ...settings.prices, visa: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Portrait Studio Session
                  </label>
                  <input
                    type="text"
                    value={settings.prices?.portrait || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        prices: { ...settings.prices, portrait: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Holiday Notices */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                3. Temporary Holiday Notice
              </h4>
              <textarea
                rows={2}
                placeholder="e.g. Studio will be closed on Diwali (Nov 15) for celebrations."
                value={settings.holidayNotices}
                onChange={(e) => setSettings({ ...settings, holidayNotices: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingSettings}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-bold text-white bg-studio-blue-600 hover:bg-studio-blue-700 transition shadow-md disabled:opacity-50 text-xs sm:text-sm"
              >
                <Save className="w-4 h-4" />
                <span>{savingSettings ? "Saving Settings..." : "Save All Business Settings"}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 5: GALLERY MANAGER */}
        {activeTab === "gallery" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Gallery Items Manager</h3>
              <p className="text-xs text-slate-500">
                Add demonstration photography samples or real photos to showcase on the website.
              </p>
            </div>

            {/* Add New Item Form */}
            <form
              onSubmit={handleAddGalleryItem}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Add New Gallery Item
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Baby Passport Photo"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  >
                    <option value="passport">Passport Photo</option>
                    <option value="visa">Visa Photography</option>
                    <option value="portrait">Portrait</option>
                    <option value="family">Family Session</option>
                    <option value="prints">Photo Prints</option>
                    <option value="digital">Digital Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Image URL / Path
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/gallery/passport-setup.svg"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="Brief description of lighting setup or dimensions..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-studio-blue-600 hover:bg-studio-blue-700 text-white font-bold text-xs transition"
              >
                <Plus className="w-4 h-4" />
                Add Item to Gallery
              </button>
            </form>

            {/* Existing Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white p-3 space-y-2 flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-studio-blue-600">
                      {item.category}
                    </span>
                    <h5 className="font-bold text-slate-900 text-sm">{item.title}</h5>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

