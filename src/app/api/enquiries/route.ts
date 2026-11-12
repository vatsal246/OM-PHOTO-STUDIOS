import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCurrentUserAdmin } from "@/lib/auth";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[0-9]{10}$/, "A valid 10-digit mobile number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  service: z.string().min(1, "Please select the service you are interested in"),
  message: z.string().min(5, "Message must be at least 5 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to send your inquiry" }),
  }),
});

export async function GET() {
  try {
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error("GET enquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = enquirySchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;
    const enquiry = await prisma.enquiry.create({
      data: {
        name: data.name.trim(),
        mobile: data.mobile.trim(),
        email: data.email?.trim() || null,
        service: data.service,
        message: data.message.trim(),
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, enquiry });
  } catch (error) {
    console.error("POST enquiry error:", error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}

