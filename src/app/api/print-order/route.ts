import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCurrentUserAdmin } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const printOrders = await prisma.printOrder.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ printOrders });
  } catch (error) {
    console.error("GET print orders error:", error);
    return NextResponse.json({ error: "Failed to fetch print orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const customerName = formData.get("customerName") as string;
    const mobile = formData.get("mobile") as string;
    const printSize = formData.get("printSize") as string;
    const quantityStr = formData.get("quantity") as string;
    const finish = formData.get("finish") as string;
    const pickupPreference = formData.get("pickupPreference") as string;
    const notes = (formData.get("notes") as string) || "";
    const consent = formData.get("consent");

    if (!customerName || customerName.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    }

    if (!mobile || !/^[0-9]{10}$/.test(mobile.trim())) {
      return NextResponse.json({ error: "A valid 10-digit Indian mobile number is required." }, { status: 400 });
    }

    if (!printSize || !finish || !pickupPreference) {
      return NextResponse.json({ error: "Please choose print size, finish, and pickup preference." }, { status: 400 });
    }

    if (consent !== "true") {
      return NextResponse.json({ error: "You must consent to submit print order details." }, { status: 400 });
    }

    const quantity = parseInt(quantityStr, 10) || 1;

    // Process uploaded files
    const files = formData.getAll("files") as File[];
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Please upload at least one image file." }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "prints");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const savedFilePaths: string[] = [];
    const savedFileNames: string[] = [];

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "application/pdf"];
    const maxSizeBytes = 15 * 1024 * 1024; // 15MB limit per file

    for (const file of files) {
      if (!file.name) continue;

      if (!allowedMimeTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Unsupported file format (${file.type}). Please upload JPG, PNG, WEBP, or PDF.` },
          { status: 400 }
        );
      }

      if (file.size > maxSizeBytes) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the 15MB limit.` },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || ".jpg";
      const sanitizedBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
      const uniqueName = `${Date.now()}-${sanitizedBase}${ext}`;
      const filePath = path.join(uploadsDir, uniqueName);

      fs.writeFileSync(filePath, buffer);

      savedFilePaths.push(`/uploads/prints/${uniqueName}`);
      savedFileNames.push(file.name);
    }

    const count = await prisma.printOrder.count();
    const reference = `PRN-${new Date().getFullYear()}-${2001 + count}`;

    const printOrder = await prisma.printOrder.create({
      data: {
        reference,
        customerName: customerName.trim(),
        mobile: mobile.trim(),
        printSize,
        quantity,
        finish,
        pickupPreference,
        notes: notes.trim() || null,
        filePaths: JSON.stringify(savedFilePaths),
        fileNames: JSON.stringify(savedFileNames),
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      reference: printOrder.reference,
      printOrder,
    });
  } catch (error) {
    console.error("POST print-order error:", error);
    return NextResponse.json({ error: "Failed to submit print order" }, { status: 500 });
  }
}

