import { NextRequest, NextResponse } from "next/server";
import connect from "../../../dbConnect/dbConnect";
// @ts-ignore
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../../models/userModel";

connect();

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { username, fullname, email, gender, password } = body;
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return NextResponse.json({
      success: false,
      message: "User with this email already exists",
    });
  }

  const usernameExists = await User.findOne({ username: username.slice(1).split(" ").join("_") });
  if (usernameExists) {
    return NextResponse.json({
      success: false,
      message: "Username already taken",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const pp = gender === "male"
    ? "../../../assets/maleDefault.png"
    : "../../../assets/femaleDefault.png";

  const newUser = new User({
    username: username.slice(1).split(" ").join("_"),
    profilePicture: pp,
    fullname,
    email,
    gender,
    password: hashedPassword,
  });
  await newUser.save();

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

  const res =  NextResponse.json({
    success: true,
    user: newUser,
    message: "User registered successfully",
  });

  res.cookies.set("token", token, {
    httpOnly: true
  });

  return res;
}
