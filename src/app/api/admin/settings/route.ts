import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCurrentUserAdmin } from "@/lib/auth";
import { DEFAULT_BUSINESS_SETTINGS } from "@/lib/settings";

export async function GET() {
  try {
    const setting = await prisma.businessSetting.findUnique({
      where: { id: "default" },
    });

    if (!setting) {
      return NextResponse.json(DEFAULT_BUSINESS_SETTINGS);
    }

    let parsedPrices = DEFAULT_BUSINESS_SETTINGS.prices;
    try {
      if (setting.pricesJson) parsedPrices = JSON.parse(setting.pricesJson);
    } catch {}

    let parsedHours = DEFAULT_BUSINESS_SETTINGS.openingHours;
    try {
      if (setting.openingHoursJson) parsedHours = JSON.parse(setting.openingHoursJson);
    } catch {}

    return NextResponse.json({
      businessName: setting.businessName,
      ownerName: setting.ownerName,
      whatsappNumber: setting.whatsappNumber,
      phoneNumber: setting.phoneNumber,
      emailAddress: setting.emailAddress,
      googleReviewUrl: setting.googleReviewUrl,
      prices: parsedPrices,
      holidayNotices: setting.holidayNotices,
      openingHours: parsedHours,
    });
  } catch (error) {
    console.error("GET settings error:", error);
    return NextResponse.json(DEFAULT_BUSINESS_SETTINGS);
  }
}

export async function PUT(request: Request) {
  try {
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const updated = await prisma.businessSetting.upsert({
      where: { id: "default" },
      update: {
        businessName: body.businessName || "Om Photo Studio",
        ownerName: body.ownerName || "Dharmesh Pithwa",
        whatsappNumber: body.whatsappNumber || "",
        phoneNumber: body.phoneNumber || "",
        emailAddress: body.emailAddress || "",
        googleReviewUrl: body.googleReviewUrl || "",
        pricesJson: JSON.stringify(body.prices || {}),
        holidayNotices: body.holidayNotices || "",
        openingHoursJson: JSON.stringify(body.openingHours || {}),
      },
      create: {
        id: "default",
        businessName: body.businessName || "Om Photo Studio",
        ownerName: body.ownerName || "Dharmesh Pithwa",
        whatsappNumber: body.whatsappNumber || "",
        phoneNumber: body.phoneNumber || "",
        emailAddress: body.emailAddress || "",
        googleReviewUrl: body.googleReviewUrl || "",
        pricesJson: JSON.stringify(body.prices || {}),
        holidayNotices: body.holidayNotices || "",
        openingHoursJson: JSON.stringify(body.openingHours || {}),
      },
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("PUT settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

