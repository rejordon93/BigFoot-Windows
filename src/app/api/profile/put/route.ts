import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getToken } from "@/helpers/getToken";
import { ProfileData } from "@/type";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstname, lastname, state, city, zip }: ProfileData = body;

    if (!firstname || !lastname || !state || !city || !zip) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const userId = getToken(req);
    if (!userId) {
      return NextResponse.json(
        { message: "No user with that ID" },
        { status: 401 }
      );
    }

    // check if profile exists
    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { message: "You don't have a profile yet. Create one first." },
        { status: 404 }
      );
    }

    // update profile
    const updatedProfile = await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        firstname,
        lastname,
        state,
        city,
        zip,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      newProfile: updatedProfile,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
