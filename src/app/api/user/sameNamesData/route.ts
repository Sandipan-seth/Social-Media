import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/userModel';
import connect from '@/dbConnect/dbConnect';

connect();

export async function POST(req: NextRequest) {
    const { name } = await req.json();

    try {
        const users = await User.find({
          fullname: { $regex: `^${name}$`, $options: "i" },
        });

        return NextResponse.json(
            {
                success: true,
                users: users
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
    }
}