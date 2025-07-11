import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type tokenProps = {
  id: number;
};

export const getToken = (request: NextRequest) => {
  try {
    // Retrieve the token from cookies
    const token = request.cookies.get("token")?.value || "";

    // Decode the token
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as tokenProps;

    return decodedToken.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Token verification failed:", error.message);
      throw new Error("Invalid token");
    } else {
      console.error("Unknown error during token verification.");
      throw new Error("Invalid token");
    }
  }
};
