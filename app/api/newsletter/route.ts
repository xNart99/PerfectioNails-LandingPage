import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * POST /api/newsletter
 * Saves a subscriber email to the database.
 * Returns 200 on success, 409 if already subscribed.
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await prisma.subscriber.upsert({
      where: { email },
      update: { active: true },
      create: { email },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[newsletter]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
