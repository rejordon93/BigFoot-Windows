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

    const employee = await prisma.employee.findUnique({
      where: { email: normalizedEmial },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    // set is onlint to true when login
    await prisma.employee.update({
      where: {
        email,
      },
      data: {
        role: "EMPLOYEE",
      },
    });

    // check if validPassword
    const validPassword = await bcryptjs.compare(password, employee.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not defined");
    }

    // if validPassword make a token!
    const token = jwt.sign(
      { id: employee.id, email: employee.email },
      process.env.TOKEN_SECRET,

      { expiresIn: "1d" }
    );

    // send response!
    const response = NextResponse.json({
      message: "Login successful",
      username: employee.username,
      email: employee.email,
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
