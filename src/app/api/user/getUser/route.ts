import connect from "@/dbConnect/dbConnect";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import jwt from "jsonwebtoken";

connect();

export async function POST(req : NextRequest) {
    const {token} = await req.json();

    try {
        const decodedToken = jwt.verify(token as string , process.env.JWT_SECRET as string);

        const user = await User.findOne({
            email: decodedToken.email
        });
        
        if(!user){
            return NextResponse.json({ 
                success:false,
                error: "User not found"
            });
        }

        return NextResponse.json({ 
            success:true,
            data: user
        });

    }catch (error) {
        return NextResponse.json({ 
            success:false,
            error: "Failed to fetch user"
        });
    }

}