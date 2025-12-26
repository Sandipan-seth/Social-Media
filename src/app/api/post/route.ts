import connect from "@/dbConnect/dbConnect";
import { Post } from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(req: NextRequest){
    const {content, author, picture, isOnlyFriends} = await req.json();
    try{
        await Post.create({
            content,
            author,
            createdAt: new Date(),
            likes:[],
            comments:[],
            picture,
            isOnlyFriends: isOnlyFriends? isOnlyFriends : false,
        });

        return NextResponse.json({
            success: true,
            message: "Post created successfully"
        })

    }catch(err){
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "Failed to create post"
        });
    }
}