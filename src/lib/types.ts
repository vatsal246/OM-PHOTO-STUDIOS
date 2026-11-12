export interface BusinessSettingsData {
  businessName: string;
  ownerName: string;
  whatsappNumber: string;
  phoneNumber: string;
  emailAddress: string;
  googleReviewUrl: string;
  prices: Record<string, string>;
  holidayNotices: string;
  openingHours: {
    weekday: string; // e.g. "10:00 AM - 9:00 PM"
    sunday: string;  // e.g. "10:30 AM - 5:00 PM"
  };
}

export interface BookingInput {
  customerName: string;
  mobile: string;
  email?: string;
  service: string;
  countryOrType?: string;
  appointmentDate: string;
  timeSlot: string;
  numberOfPeople: number;
  notes?: string;
}

export interface PrintOrderInput {
  customerName: string;
  mobile: string;
  printSize: string;
  quantity: number;
  finish: string;
  pickupPreference: string;
  notes?: string;
}

export interface EnquiryInput {
  name: string;
  mobile: string;
  email?: string;
  service: string;
  message: string;
}

export interface CountryPhotoSpec {
  country: string;
  slug: string;
  dimensions: string;
  background: string;
  notes: string;
  headSize: string;
  glasses: string;
  specSummary: string;
}

