import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginProps } from "@/type";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password }: LoginProps = body;
    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const normalizedEmial = email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmial },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    // set is onlint to true when login
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        isOnline: true,
      },
    });

    // check if validPassword
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not defined");
    }

    // if validPassword make a token!
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // send response!
    const response = NextResponse.json({
      message: "Login successful",
      username: user.username,
      email: user.email,
    });

    // set token data
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
