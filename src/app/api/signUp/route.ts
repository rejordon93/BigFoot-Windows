import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import bcryptjs from "bcryptjs";
import { signUpSchema } from "@/schemas/signUp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = signUpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const { username, email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    const findExistingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (findExistingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
