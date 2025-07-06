import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { QuoteType } from "@/type";
import { getToken } from "@/helpers/getToken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      address,
      zip,
      serviceType,
      preferredDate,
      additionalDetails,
    }: QuoteType = body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !zip ||
      !serviceType ||
      !preferredDate ||
      !additionalDetails
    ) {
      return NextResponse.json(
        { message: "Missing Data from From" },
        { status: 401 }
      );
    }

    const user = getToken(req);

    const newQuote = await prisma.quote.create({
      data: {
        fullName,
        email,
        phone,
        address,
        zip,
        serviceType,
        preferredDate,
        additionalDetails,
        createdAt: new Date(),
        userId: user ?? null,
        guestId: user ? null : 1, // dummy guestId for now
      },
    });

    return NextResponse.json(newQuote, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
