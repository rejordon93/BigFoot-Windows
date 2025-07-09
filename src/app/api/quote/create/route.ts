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

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !zip ||
      !serviceType ||
      !preferredDate
    ) {
      return NextResponse.json(
        { message: "Missing data from form" },
        { status: 400 }
      );
    }

    const tokenData = await getToken(req);

    let userId = null;
    let guestId = null;

    if (tokenData) {
      userId = tokenData;
    } else {
      const existingGuest = await prisma.guest.findUnique({ where: { email } });

      if (existingGuest) {
        guestId = existingGuest.id;
      } else {
        const newGuest = await prisma.guest.create({
          data: { email, name: fullName },
        });
        guestId = newGuest.id;
      }
    }

    const newQuote = await prisma.quote.create({
      data: {
        fullName,
        email,
        phone,
        address,
        zip,
        serviceType,
        preferredDate: new Date(preferredDate),
        additionalDetails,
        userId,
        guestId,
      },
    });

    return NextResponse.json(newQuote, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
