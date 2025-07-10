import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getToken } from "@/helpers/getToken";
import { profileSchema } from "@/schemas/profile"; // ✅ import schema

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ Zod validation
    const parsed = profileSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.format();
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { firstname, lastname, state, city, zip, phone } = parsed.data;

    // ✅ Validate token
    const id = await getToken(req);
    if (!id) {
      return NextResponse.json({ message: "No User" }, { status: 401 });
    }

    // ✅ Check for existing profile
    const profileCheck = await prisma.profile.findUnique({
      where: { userId: id },
    });

    if (profileCheck) {
      return NextResponse.json(
        { message: "User already has a profile" },
        { status: 400 }
      );
    }

    // ✅ Create profile
    const newProfile = await prisma.profile.create({
      data: {
        firstname,
        lastname,
        state,
        city,
        zip,
        phone,
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
