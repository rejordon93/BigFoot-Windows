import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing quote id" }, { status: 400 });
    }

    const quoteId = parseInt(id, 10);
    if (isNaN(quoteId)) {
      return NextResponse.json({ error: "Invalid quote id" }, { status: 400 });
    }

    const deletedQuote = await prisma.quote.delete({
      where: { id: quoteId },
      include: {
        user: true,
        guest: true,
      },
    });

    return NextResponse.json(deletedQuote, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
