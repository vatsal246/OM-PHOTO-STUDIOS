import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSlotsForDate, getISTDateString } from "@/lib/time";
import { isCurrentUserAdmin } from "@/lib/auth";
import { z } from "zod";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  countryOrType: z.string().optional(),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  timeSlot: z.string().min(1, "Please select an appointment time slot"),
  numberOfPeople: z.number().int().min(1).max(20).default(1),
  notes: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to store booking details" }),
  }),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (date) {
      // Find all active bookings on this date (not cancelled)
      const existingBookings = await prisma.booking.findMany({
        where: {
          appointmentDate: date,
          status: { not: "CANCELLED" },
        },
        select: {
          timeSlot: true,
        },
      });

      const bookedSlots = existingBookings.map((b) => b.timeSlot);
      const { slots, error } = generateSlotsForDate(date, bookedSlots);

      if (error) {
        return NextResponse.json({ error }, { status: 400 });
      }

      return NextResponse.json({ date, slots, bookedSlots });
    }

    // If no date, verify if admin to list all bookings
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Date parameter required" }, { status: 400 });
    }

    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("GET bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = bookingSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;
    const todayStr = getISTDateString();

    // Past date prevention
    if (data.appointmentDate < todayStr) {
      return NextResponse.json(
        { error: "Cannot book appointments for past dates." },
        { status: 400 }
      );
    }

    // Prevent duplicate booking for the same date & time slot
    const existingConflict = await prisma.booking.findFirst({
      where: {
        appointmentDate: data.appointmentDate,
        timeSlot: data.timeSlot,
        status: { not: "CANCELLED" },
      },
    });

    if (existingConflict) {
      return NextResponse.json(
        { error: `The slot ${data.timeSlot} on ${data.appointmentDate} is already booked. Please choose another time.` },
        { status: 409 }
      );
    }

    // Generate reference number
    const count = await prisma.booking.count();
    const reference = `OPS-${new Date().getFullYear()}-${1001 + count}`;

    const booking = await prisma.booking.create({
      data: {
        reference,
        customerName: data.customerName.trim(),
        mobile: data.mobile.trim(),
        email: data.email?.trim() || null,
        service: data.service,
        countryOrType: data.countryOrType?.trim() || null,
        appointmentDate: data.appointmentDate,
        timeSlot: data.timeSlot,
        numberOfPeople: data.numberOfPeople,
        notes: data.notes?.trim() || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      reference: booking.reference,
      booking,
    });
  } catch (error) {
    console.error("POST booking error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

