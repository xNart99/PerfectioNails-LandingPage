import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * POST /api/contact
 * Saves a customer enquiry to the database.
 * The admin can view all enquiries in the dashboard.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, day, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    await prisma.enquiry.create({
      data: { name, phone, email, service, day, message },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
