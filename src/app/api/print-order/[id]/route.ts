import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCurrentUserAdmin } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await request.json();
    const valid = ["PENDING", "PROCESSING", "READY_FOR_PICKUP", "COMPLETED", "CANCELLED"];

    if (!valid.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updated = await prisma.printOrder.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json({ success: true, printOrder: updated });
  } catch (error) {
    console.error("PATCH print order error:", error);
    return NextResponse.json({ error: "Failed to update print order" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.printOrder.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE print order error:", error);
    return NextResponse.json({ error: "Failed to delete print order" }, { status: 500 });
  }
}

