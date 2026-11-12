/**
 * Logic verification tests for Om Photo Studio
 * Tests opening hours, IST time parsing, booking slot generation, and admin session security.
 */

const assert = require("assert");
const crypto = require("crypto");

console.log("Starting test suite for Om Photo Studio business logic...\n");

// --- 1. IST Time and Open/Closed Status Logic ---
function getISTDate(date = new Date()) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const istOffset = 5.5 * 60 * 60000;
  return new Date(utc + istOffset);
}

function getStudioOpenStatus(refDate = new Date()) {
  const ist = getISTDate(refDate);
  const day = ist.getDay(); // 0 = Sun
  const hours = ist.getHours();
  const minutes = ist.getMinutes();
  const currentTotalMinutes = hours * 60 + minutes;

  const isSunday = day === 0;
  const openMinutes = isSunday ? 10 * 60 + 30 : 10 * 60;
  const closeMinutes = isSunday ? 17 * 60 : 21 * 60;

  if (currentTotalMinutes >= openMinutes && currentTotalMinutes < closeMinutes) {
    return { isOpen: true, statusText: "Open Now" };
  } else {
    return { isOpen: false, statusText: "Closed Now" };
  }
}

// Test 1: Weekday at 2:00 PM IST should be OPEN
const weekdayOpenDate = new Date("2026-11-11T08:30:00.000Z"); // 08:30 UTC = 14:00 (2 PM) IST on a Wednesday
const weekdayOpenStatus = getStudioOpenStatus(weekdayOpenDate);
assert.strictEqual(weekdayOpenStatus.isOpen, true, "Weekday 2 PM IST should be Open");
console.log("✔ Test 1 Passed: Weekday 2:00 PM IST is Open");

// Test 2: Weekday at 9:30 PM IST should be CLOSED
const weekdayClosedDate = new Date("2026-11-11T16:00:00.000Z"); // 16:00 UTC = 21:30 (9:30 PM) IST
const weekdayClosedStatus = getStudioOpenStatus(weekdayClosedDate);
assert.strictEqual(weekdayClosedStatus.isOpen, false, "Weekday 9:30 PM IST should be Closed");
console.log("✔ Test 2 Passed: Weekday 9:30 PM IST is Closed");

// Test 3: Sunday at 10:15 AM IST should be CLOSED (Opens at 10:30 AM)
const sundayEarlyDate = new Date("2026-11-15T04:45:00.000Z"); // 04:45 UTC = 10:15 AM IST on Sunday
const sundayEarlyStatus = getStudioOpenStatus(sundayEarlyDate);
assert.strictEqual(sundayEarlyStatus.isOpen, false, "Sunday 10:15 AM IST should be Closed");
console.log("✔ Test 3 Passed: Sunday 10:15 AM IST is Closed (Opens 10:30 AM)");

// Test 4: Sunday at 11:00 AM IST should be OPEN
const sundayOpenDate = new Date("2026-11-15T05:30:00.000Z"); // 05:30 UTC = 11:00 AM IST on Sunday
const sundayOpenStatus = getStudioOpenStatus(sundayOpenDate);
assert.strictEqual(sundayOpenStatus.isOpen, true, "Sunday 11:00 AM IST should be Open");
console.log("✔ Test 4 Passed: Sunday 11:00 AM IST is Open");

// Test 5: Sunday at 5:15 PM IST should be CLOSED (Closes at 5:00 PM)
const sundayLateDate = new Date("2026-11-15T11:45:00.000Z"); // 11:45 UTC = 17:15 (5:15 PM) IST
const sundayLateStatus = getStudioOpenStatus(sundayLateDate);
assert.strictEqual(sundayLateStatus.isOpen, false, "Sunday 5:15 PM IST should be Closed");
console.log("✔ Test 5 Passed: Sunday 5:15 PM IST is Closed (Closes 5:00 PM)");

// --- 2. Slot Generation & Double-Booking Logic ---
function generateSlotsForDate(dateString, bookedSlots = [], currentTime = new Date()) {
  const parts = dateString.split("-").map(Number);
  const [year, month, day] = parts;
  const targetDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const dayOfWeek = targetDate.getUTCDay();

  const isSunday = dayOfWeek === 0;
  const startMinute = isSunday ? 10 * 60 + 30 : 10 * 60;
  const endMinute = isSunday ? 17 * 60 : 21 * 60;

  const slots = [];
  for (let m = startMinute; m < endMinute; m += 30) {
    const slotHour = Math.floor(m / 60);
    const slotMin = m % 60;
    const period = slotHour >= 12 ? "PM" : "AM";
    const displayHour = slotHour % 12 === 0 ? 12 : slotHour % 12;
    const displayMin = String(slotMin).padStart(2, "0");
    const slotLabel = `${displayHour}:${displayMin} ${period}`;

    const isAvailable = !bookedSlots.includes(slotLabel);
    slots.push({ time: slotLabel, isAvailable });
  }
  return slots;
}

// Test 6: Weekday slot count (10:00 to 21:00 in 30m steps = 22 slots)
const weekdaySlots = generateSlotsForDate("2026-11-18", ["11:30 AM", "02:00 PM"]);
assert.strictEqual(weekdaySlots.length, 22, "Weekday should have exactly 22 slots");
const bookedSlot1 = weekdaySlots.find((s) => s.time === "11:30 AM");
assert.strictEqual(bookedSlot1.isAvailable, false, "Booked slot 11:30 AM must be unavailable");
const freeSlot = weekdaySlots.find((s) => s.time === "10:00 AM");
assert.strictEqual(freeSlot.isAvailable, true, "Unbooked slot 10:00 AM must be available");
console.log("✔ Test 6 Passed: Weekday slot generation & unavailable flags work correctly");

// Test 7: Sunday slot count (10:30 to 17:00 in 30m steps = 13 slots)
const sundaySlots = generateSlotsForDate("2026-11-15", []);
assert.strictEqual(sundaySlots.length, 13, "Sunday should have exactly 13 slots (10:30 AM to 4:30 PM)");
assert.strictEqual(sundaySlots[0].time, "10:30 AM", "Sunday first slot must be 10:30 AM");
assert.strictEqual(sundaySlots[sundaySlots.length - 1].time, "4:30 PM", "Sunday last slot must be 4:30 PM");
console.log("✔ Test 7 Passed: Sunday slot generation adheres strictly to Sunday business hours");

// --- 3. Admin Security & Tamper Proofing ---
const SECRET = "test-secret-key";
function createToken(ts) {
  const sig = crypto.createHmac("sha256", SECRET).update(`admin:${ts}`).digest("hex");
  return `${ts}.${sig}`;
}
function verifyToken(token) {
  if (!token) return false;
  const [ts, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", SECRET).update(`admin:${ts}`).digest("hex");
  return sig === expected;
}

const validToken = createToken(Date.now().toString());
assert.strictEqual(verifyToken(validToken), true, "Valid session token must pass");
const tamperedToken = validToken + "tamper";
assert.strictEqual(verifyToken(tamperedToken), false, "Tampered session token must fail");
console.log("✔ Test 8 Passed: Admin HMAC session creation and tamper rejection");

console.log("\nALL 8 BUSINESS LOGIC TESTS PASSED SUCCESSFULLY! 🎉\n");

