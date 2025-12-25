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
      profilePicture, 
    } = body;

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return NextResponse.json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const formattedUsername = username.split(" ").join("_");
    const usernameExists = await User.findOne({ username: formattedUsername });

    if (usernameExists) {
      return NextResponse.json({
        success: false,
        message: "Username already taken",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const defaultPP =
      gender === "male"
        ? "https://res.cloudinary.com/demo/image/upload/v1720000000/maleDefault.png"
        : "https://res.cloudinary.com/demo/image/upload/v1720000000/femaleDefault.png";

    const finalProfilePicture = profilePicture || defaultPP;

    const newUser = await User.create({
      username: formattedUsername,
      fullname,
      email,
      gender,
      password: hashedPassword,
      profilePicture: finalProfilePicture,
    });

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
