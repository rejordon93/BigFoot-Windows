import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getToken } from "@/helpers/getToken";

export async function GET(req: NextRequest) {
  try {
    // get user ID from token
    const userId = getToken(req);

    if (!userId) {
      return NextResponse.json({ message: "No User" }, { status: 401 });
    }

    // find profile by userId (not profile id)
    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { message: "No profile found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Profile data retrieved successfully",
      profileData: profile,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
