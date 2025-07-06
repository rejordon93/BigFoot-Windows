import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getToken } from "@/helpers/getToken";
import { ProfileData } from "@/type";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { firstname, lastname, state, city, zip }: ProfileData = body;

    if (!firstname || !lastname || !state || !city || !zip) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // get user form token
    const id = await getToken(req);

    if (!id) {
      return NextResponse.json({ message: "No User" }, { status: 401 });
    }

    // if there is a user check if they have profile
    const profileCheck = await prisma.profile.findUnique({
      where: {
        userId: id,
      },
    });
    if (profileCheck) {
      return NextResponse.json(
        { message: "User alredy has a profile" },
        { status: 400 }
      );
    }

    // if there is a user and there is no profile make a new one
    const newProfile = await prisma.profile.create({
      data: {
        firstname,
        lastname,
        state,
        city,
        zip,
        userId: id,
      },
    });
    return NextResponse.json({
      message: "Profile created successfully",
      profile: newProfile,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
