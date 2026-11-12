import { prisma } from "./prisma";
import { BusinessSettingsData } from "./types";

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettingsData = {
  businessName: "Om Photo Studio",
  ownerName: "Dharmesh Pithwa",
  whatsappNumber: "", // Owner Dharmesh to supply in Admin
  phoneNumber: "",    // Owner Dharmesh to supply in Admin
  emailAddress: "",   // Owner Dharmesh to supply in Admin
  googleReviewUrl: "", // Dharmesh to add actual Google Maps review link in Admin
  prices: {
    passport: "₹100 for 8 prints",
    visa: "₹150 for 4 prints + digital copy",
    portrait: "Starting from ₹350",
    family: "Starting from ₹600",
    print4x6: "₹20 per print",
    printA4: "₹100 per print",
    digitalCopy: "Available on request / ₹50",
  },
  holidayNotices: "",
  openingHours: {
    weekday: "10:00 AM – 9:00 PM (Monday–Saturday)",
    sunday: "10:30 AM – 5:00 PM (Sunday)",
  },
};

export async function getBusinessSettings(): Promise<BusinessSettingsData> {
  try {
    const setting = await prisma.businessSetting.findUnique({
      where: { id: "default" },
    });

    if (!setting) {
      return DEFAULT_BUSINESS_SETTINGS;
    }

    let parsedPrices: Record<string, string> = DEFAULT_BUSINESS_SETTINGS.prices;
    try {
      if (setting.pricesJson) {
        parsedPrices = { ...DEFAULT_BUSINESS_SETTINGS.prices, ...JSON.parse(setting.pricesJson) };
      }
    } catch {
      // fallback
    }

    let parsedHours = DEFAULT_BUSINESS_SETTINGS.openingHours;
    try {
      if (setting.openingHoursJson) {
        parsedHours = { ...DEFAULT_BUSINESS_SETTINGS.openingHours, ...JSON.parse(setting.openingHoursJson) };
      }
    } catch {
      // fallback
    }

    return {
      businessName: setting.businessName || DEFAULT_BUSINESS_SETTINGS.businessName,
      ownerName: setting.ownerName || DEFAULT_BUSINESS_SETTINGS.ownerName,
      whatsappNumber: setting.whatsappNumber || "",
      phoneNumber: setting.phoneNumber || "",
      emailAddress: setting.emailAddress || "",
      googleReviewUrl: setting.googleReviewUrl || "",
      prices: parsedPrices,
      holidayNotices: setting.holidayNotices || "",
      openingHours: parsedHours,
    };
  } catch (error) {
    console.error("Error reading business settings:", error);
    return DEFAULT_BUSINESS_SETTINGS;
  }
}

