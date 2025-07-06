import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import bcryptjs from "bcryptjs";
import { SignUpProps } from "@/type";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password }: SignUpProps = body;
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const normalizedEmial = email.toLowerCase();

    const findExstingUser = await prisma.user.findUnique({
      where: { email: normalizedEmial },
    });

    if (findExstingUser) {
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
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: newUser,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
