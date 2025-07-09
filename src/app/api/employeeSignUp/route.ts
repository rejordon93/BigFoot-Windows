import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import bcryptjs from "bcryptjs";
import { employeeSignUp } from "@/type";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      username,
      email,
      password,
      position,
      role,
      startDate, // Expecting string like "2024-07-07"
    }: employeeSignUp & {
      position: string;
      role: "EMPLOYEE" | "ADMIN";
      startDate: string;
    } = body;

    if (!username || !email || !password || !position || !role || !startDate) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    const existingEmployee = await prisma.employee.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingEmployee) {
      return NextResponse.json(
        { error: "Employee already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newEmployee = await prisma.employee.create({
      data: {
        username,
        email: normalizedEmail,
        password: hashedPassword,
        position,
        role,
        startDate: new Date(startDate), // Convert string to Date
      },
    });

    return NextResponse.json({
      message: "Employee created successfully",
      success: true,
      user: newEmployee,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
