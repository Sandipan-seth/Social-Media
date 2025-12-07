import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/userModel';
import connect from '@/dbConnect/dbConnect';

connect();

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  try {
    const clean = name.replace(/\s+/g, "").toLowerCase();

    const pattern = clean
      .split("")
      .map((ch: any) => `${ch}\\s*`)
      .join("");

    const users = await User.find({
      fullname: { $regex: pattern, $options: "i" }
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
