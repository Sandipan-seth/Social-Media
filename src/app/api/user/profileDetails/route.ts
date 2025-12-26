import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import connect from "@/dbConnect/dbConnect";

connect();


export async function POST(req: NextRequest) {
  const { username } = await req.json();

  try {
    let user = await User.findOne({
      username: username,
    }).populate("friends").populate("posts");

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User of this Username is not found",
      });
    }

    return NextResponse.json({
      success: true,
      user: user,
      message: "Fetched user successfully",
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
