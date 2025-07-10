import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getToken } from "@/helpers/getToken";
import { quoteSchema } from "@/schemas/quote";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = quoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      address,
      zip,
      serviceType,
      preferredDate,
      additionalDetails,
    } = parsed.data;

    let userId = null;
    let guestId = null;

    try {
      const tokenData = await getToken(req);
      userId = tokenData;
    } catch (e: unknown) {
      console.error("No token found, continuing as guest.");
    }

    if (!userId) {
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
