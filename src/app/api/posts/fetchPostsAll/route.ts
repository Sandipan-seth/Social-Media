import connect from "@/dbConnect/dbConnect";
import { Post } from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor");
    const LIMIT = 15;

    const matchStage: any = { isOnlyFriends: false };

    if (cursor) {
      matchStage.createdAt = { $lt: new Date(cursor) };
    }

    const posts = await Post.aggregate([
      { $match: matchStage },

      // ✅ Latest uploads first
      { $sort: { createdAt: -1 } },

      // ✅ Pagination
      { $limit: LIMIT },

      // Populate author
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },

      // Lightweight response
      {
        $project: {
          content: 1,
          picture: 1,
          createdAt: 1,
          isOnlyFriends: 1,
          "author.username": 1,
          "author.profilePicture": 1,
          "author.isVerified": 1,

          likeCount: { $size: "$likes" },
          commentCount: { $size: "$comments" },
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      posts,
      nextCursor:
        posts.length > 0
          ? posts[posts.length - 1].createdAt
          : null,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
