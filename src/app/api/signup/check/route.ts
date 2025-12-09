import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConnect/dbConnect";

connect();

export async function POST(req: NextRequest) {
    const { username, email } = await req.json();

    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
        return NextResponse.json({ 
            success : false,
            message: "Username already taken"
        });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return NextResponse.json({ 
            success : false,
            message: "Email already taken"
        });
    }
    return NextResponse.json({ success: true });



}