import connect from "@/dbConnect/dbConnect";
import { Post } from "@/models/postModel";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  const { content, author, picture, isOnlyFriends } = await req.json();
  try {
    const post = await Post.create({
      content,
      author,
      createdAt: new Date(),
      likes: [],
      comments: [],
      picture,
      isOnlyFriends: isOnlyFriends ? isOnlyFriends : false,
    });

    const user = await User.findById(author);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid author" },
        { status: 400 }
      );
    }
    user?.posts.push(post._id);
    await user?.save();

    return NextResponse.json({
      success: true,
      message: "Post created successfully",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Failed to create post",
    });
  }
}
