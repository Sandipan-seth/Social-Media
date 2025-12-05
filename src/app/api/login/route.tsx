import connect from "@/dbConnect/dbConnect";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
// @ts-ignore
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log("Login attempt for email:", email, password);

  try {
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existedUser.password
    );
    if (!isValidPassword) {
      return NextResponse.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await jwt.sign(
      {
        id: existedUser._id,
        email: existedUser.email,
        username: existedUser.username,
        fullname: existedUser.fullname,
        gender: existedUser.gender,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      token
    });


    return response;
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: "Login failed",
      error: err.message,
    });
  }
}
