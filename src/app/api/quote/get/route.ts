import { NextResponse } from "next/server";
import prisma from "@/database/prisma";

export async function GET() {
  try {
    const allQuotes = await prisma.quote.findMany({
      orderBy: { createdAt: "desc" }, // Optional: show newest first
      include: {
        user: true, // Include user info if available
        guest: true, // Include guest info if available
      },
    });

    return NextResponse.json(allQuotes, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
