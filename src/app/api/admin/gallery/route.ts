import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCurrentUserAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ items });
  } catch (error) {
    console.error("GET gallery error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, description, imageUrl, isSample } = body;

    if (!title || !category || !imageUrl) {
      return NextResponse.json({ error: "Title, category, and imageUrl are required" }, { status: 400 });
    }

    const count = await prisma.galleryItem.count();
    const item = await prisma.galleryItem.create({
      data: {
        title,
        category,
        description: description || "",
        imageUrl,
        isSample: isSample !== false,
        displayOrder: count + 1,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("POST gallery error:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Item ID required" }, { status: 400 });
    }

    await prisma.galleryItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE gallery error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}

