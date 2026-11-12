/**
 * Time utility functions for Om Photo Studio (Malad West, Mumbai)
 * Timezone: Asia/Kolkata (Indian Standard Time, UTC +05:30)
 */

export interface OpenStatus {
  isOpen: boolean;
  statusText: string;
  detail: string;
  todayHours: string;
}

// Convert any Date into IST Date object
export function getISTDate(date: Date = new Date()): Date {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const istOffset = 5.5 * 60 * 60000; // +5:30
  return new Date(utc + istOffset);
}

// Format IST Date to YYYY-MM-DD
export function getISTDateString(date: Date = new Date()): string {
  const ist = getISTDate(date);
  const year = ist.getFullYear();
  const month = String(ist.getMonth() + 1).padStart(2, "0");
  const day = String(ist.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getStudioOpenStatus(refDate: Date = new Date()): OpenStatus {
  const ist = getISTDate(refDate);
  const day = ist.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  const hours = ist.getHours();
  const minutes = ist.getMinutes();
  const currentTotalMinutes = hours * 60 + minutes;

  const isSunday = day === 0;

  // Monday–Saturday: 10:00 AM (600 mins) to 9:00 PM (1260 mins)
  // Sunday: 10:30 AM (630 mins) to 5:00 PM (1020 mins)
  const openMinutes = isSunday ? 10 * 60 + 30 : 10 * 60; // 10:30 AM or 10:00 AM
  const closeMinutes = isSunday ? 17 * 60 : 21 * 60; // 5:00 PM or 9:00 PM

  const todayHours = isSunday ? "10:30 AM – 5:00 PM" : "10:00 AM – 9:00 PM";
  const closeTimeStr = isSunday ? "5:00 PM" : "9:00 PM";
  const nextOpenTimeStr = day === 6 ? "Sunday 10:30 AM" : "tomorrow 10:00 AM";

  if (currentTotalMinutes >= openMinutes && currentTotalMinutes < closeMinutes) {
    return {
      isOpen: true,
      statusText: "Open Now",
      detail: `Closes at ${closeTimeStr}`,
      todayHours,
    };
  } else if (currentTotalMinutes < openMinutes) {
    const openTimeStr = isSunday ? "10:30 AM" : "10:00 AM";
    return {
      isOpen: false,
      statusText: "Closed Now",
      detail: `Opens today at ${openTimeStr}`,
      todayHours,
    };
  } else {
    return {
      isOpen: false,
      statusText: "Closed Now",
      detail: `Opens ${nextOpenTimeStr}`,
      todayHours,
    };
  }
}

export interface TimeSlotOption {
  time: string;
  isAvailable: boolean;
  reason?: string;
}

/**
 * Generate 30-minute booking slots for a given date in IST
 * Respects business hours and past times if the date is today
 */
export function generateSlotsForDate(
  dateString: string,
  bookedSlots: string[] = [],
  currentTime: Date = new Date()
): { slots: TimeSlotOption[]; error?: string } {
  // Validate date format YYYY-MM-DD
  const parts = dateString.split("-").map(Number);
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    return { slots: [], error: "Invalid date format. Expected YYYY-MM-DD" };
  }

  const [year, month, day] = parts;
  const targetDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const dayOfWeek = targetDate.getUTCDay(); // 0 is Sunday

  const istNow = getISTDate(currentTime);
  const todayStr = getISTDateString(currentTime);

  if (dateString < todayStr) {
    return { slots: [], error: "Past dates cannot be selected for appointments." };
  }

  const isToday = dateString === todayStr;
  const isSunday = dayOfWeek === 0;

  // Operating windows
  // Mon-Sat: 10:00 to 21:00 (last booking 20:30)
  // Sun: 10:30 to 17:00 (last booking 16:30)
  const startMinute = isSunday ? 10 * 60 + 30 : 10 * 60;
  const endMinute = isSunday ? 17 * 60 : 21 * 60;

  const currentISTMinutes = istNow.getHours() * 60 + istNow.getMinutes();

  const slots: TimeSlotOption[] = [];

  for (let m = startMinute; m < endMinute; m += 30) {
    const slotHour = Math.floor(m / 60);
    const slotMin = m % 60;

    const period = slotHour >= 12 ? "PM" : "AM";
    const displayHour = slotHour % 12 === 0 ? 12 : slotHour % 12;
    const displayMin = String(slotMin).padStart(2, "0");
    const slotLabel = `${displayHour}:${displayMin} ${period}`;

    let isAvailable = true;
    let reason: string | undefined = undefined;

    const normalizeTime = (t: string) => t.replace(/^0/, "").toUpperCase().trim();
    const isBooked = bookedSlots.some((b) => normalizeTime(b) === normalizeTime(slotLabel));

    // Check if slot has already passed today (add 15 min buffer)
    if (isToday && m <= currentISTMinutes + 15) {
      isAvailable = false;
      reason = "Time passed";
    } else if (isBooked) {
      isAvailable = false;
      reason = "Already booked";
    }

    slots.push({
      time: slotLabel,
      isAvailable,
      reason,
    });
  }

  return { slots };
}
