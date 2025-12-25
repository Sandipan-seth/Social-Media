import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import jwt from "jsonwebtoken";
import { User } from "@/models/userModel";
import connect from "@/dbConnect/dbConnect";

connect();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findById(decoded.id);

    return NextResponse.json({
      success: true,
      loggedIn: true,
      user,
    });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}
