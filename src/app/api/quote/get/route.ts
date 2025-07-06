import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getToken } from "@/helpers/getToken";

type guestEmail = {
  email: string;
};

export async function GET(req: NextRequest) {
  try {
    const body: guestEmail = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = getToken(req); // check if a logged-in user exists

    if (user) {
      // Try finding a user with this email
      const getUser = await prisma.user.findUnique({
        where: { email },
        include: {
          quotes: true,
        },
      });

      if (getUser) {
        return NextResponse.json(getUser.quotes, { status: 200 });
      }
    }

    // If no token or not a user, check Guest
    const guestUser = await prisma.guest.findUnique({
      where: { email },
      include: {
        quotes: true,
      },
    });

    if (guestUser) {
      return NextResponse.json(guestUser.quotes, { status: 200 });
    }

    // If no user or guest found
    return NextResponse.json(
      { message: "No records found for this email" },
      { status: 404 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
