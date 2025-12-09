import { NextRequest, NextResponse } from "next/server";
import connect from "../../../dbConnect/dbConnect";
// @ts-ignore
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../../models/userModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    const {
      username,
      fullname,
      email,
      gender,
      password,
      profilePicture, // ← Coming from Cloudinary uploader
    } = body;

    // --------------------------
    //  CHECK IF EMAIL ALREADY EXISTS
    // --------------------------
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return NextResponse.json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // --------------------------
    //  CHECK IF USERNAME EXISTS
    // --------------------------
    const formattedUsername = username.split(" ").join("_");
    const usernameExists = await User.findOne({ username: formattedUsername });

    if (usernameExists) {
      return NextResponse.json({
        success: false,
        message: "Username already taken",
      });
    }

    // --------------------------
    //  HASH PASSWORD
    // --------------------------
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // --------------------------
    //  DEFAULT PROFILE PICTURE
    // --------------------------
    const defaultPP =
      gender === "male"
        ? "https://res.cloudinary.com/demo/image/upload/v1720000000/maleDefault.png"
        : "https://res.cloudinary.com/demo/image/upload/v1720000000/femaleDefault.png";

    // FINAL PROFILE PICTURE:
    const finalProfilePicture = profilePicture || defaultPP;

    // --------------------------
    //  CREATE USER
    // --------------------------
    const newUser = await User.create({
      username: formattedUsername,
      fullname,
      email,
      gender,
      password: hashedPassword,
      profilePicture: finalProfilePicture,
    });

    // --------------------------
    //  GENERATE JWT TOKEN
    // --------------------------
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        fullname: newUser.fullname,
        gender: newUser.gender,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    // --------------------------
    //  SEND RESPONSE WITH COOKIE
    // --------------------------
    const res = NextResponse.json({
      success: true,
      message: "User registered successfully",
      username: newUser.username,
      user: newUser,
      token,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.log("Signup Error:", err);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
