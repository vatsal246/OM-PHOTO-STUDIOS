import { redirect } from "next/navigation";
import { isCurrentUserAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  // Fetch initial database records
  const [bookings, printOrders, enquiries, settingRecord, galleryItems] = await Promise.all([
    prisma.booking.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.printOrder.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.businessSetting.findUnique({ where: { id: "default" } }),
    prisma.galleryItem.findMany({ orderBy: { displayOrder: "asc" } }),
  ]);

  let parsedPrices = {};
  if (settingRecord?.pricesJson) {
    try {
      parsedPrices = JSON.parse(settingRecord.pricesJson);
    } catch {}
  }

  let parsedHours = {};
  if (settingRecord?.openingHoursJson) {
    try {
      parsedHours = JSON.parse(settingRecord.openingHoursJson);
    } catch {}
  }

  const initialSettings = {
    businessName: settingRecord?.businessName || "Om Photo Studio",
    ownerName: settingRecord?.ownerName || "Dharmesh Pithwa",
    whatsappNumber: settingRecord?.whatsappNumber || "",
    phoneNumber: settingRecord?.phoneNumber || "",
    emailAddress: settingRecord?.emailAddress || "",
    googleReviewUrl: settingRecord?.googleReviewUrl || "",
    prices: parsedPrices,
    holidayNotices: settingRecord?.holidayNotices || "",
    openingHours: parsedHours,
  };

  return (
    <AdminDashboardClient
      initialBookings={JSON.parse(JSON.stringify(bookings))}
      initialPrintOrders={JSON.parse(JSON.stringify(printOrders))}
      initialEnquiries={JSON.parse(JSON.stringify(enquiries))}
      initialSettings={initialSettings}
      initialGallery={JSON.parse(JSON.stringify(galleryItems))}
    />
  );
}

