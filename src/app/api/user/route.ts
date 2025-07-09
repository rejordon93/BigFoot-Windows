import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getToken } from "@/helpers/getToken";

export async function GET(req: NextRequest) {
  const userId = await getToken(req);
  console.log(userId);

  if (!userId) {
    return NextResponse.json({ message: "No User" }, { status: 401 });
  }

  const checkUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!checkUser) {
    return NextResponse.json({ message: "No profile found" }, { status: 404 });
  }

  return NextResponse.json({ user: checkUser });
}
