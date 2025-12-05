"use client";

import React from "react";
import SideNav from "@/component/sideNav";
import Image from "next/image";
import { Mail, User, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage({ params }) {
  // ✅ unwrap the params Promise (required in client components)
  const resolvedParams = React.use(params);
  const username = resolvedParams.username;

  const router = useRouter();
  const [token, setToken] = React.useState("");

  // 🔐 Auth check on mount
  React.useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
      return;
    }
    setToken(storedToken);
  }, []);

  // Static dummy user (replace with API later)
  const user = {
    username: username,
    fullname: "Sandipan Seth",
    email: "sandipan@example.com",
    gender: "Male",
    profilePicture: "/default-avatar.png",
    bio: "Software Developer & Coffee Lover ☕",

    posts: [
      { _id: "1", imageUrl: "/post1.jpg" },
      { _id: "2", imageUrl: "/post2.jpg" },
      { _id: "3", imageUrl: "/post3.jpg" },
    ],

    friends: [
      {
        _id: "1",
        username: "john123",
        fullname: "John Sharma",
        profilePicture: "/default-avatar.png",
      },
      {
        _id: "2",
        username: "riya10",
        fullname: "Riya Verma",
        profilePicture: "/default-avatar.png",
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-6 flex gap-6">
      {/* Sidebar */}
      <SideNav />

      {/* Profile Content */}
      <div className="w-full">
        {/* Profile Header */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-6">
            {/* Profile Picture */}
            <div className="relative w-28 h-28 rounded-full overflow-hidden border border-zinc-700">
              <Image
                src={user.profilePicture}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>

            {/* Basic Info */}
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                {user.fullname}
                <button className="p-2 rounded-lg hover:bg-zinc-800">
                  <PencilLine className="w-5 h-5 text-zinc-400" />
                </button>
              </h1>

              <p className="text-zinc-400">@{user.username}</p>

              <div className="flex items-center gap-4 mt-2 text-zinc-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {user.gender}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-zinc-300">{user.bio}</p>
        </div>

        {/* Stats */}
        <div className="flex justify-between bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mt-6 text-center">
          <div>
            <p className="text-2xl font-bold text-white">{user.posts.length}</p>
            <p className="text-zinc-400 text-sm">Posts</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-white">
              {user.friends.length}
            </p>
            <p className="text-zinc-400 text-sm">Friends</p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mt-6">
          <h2 className="text-xl font-semibold text-indigo-400 mb-4">Posts</h2>

          <div className="grid grid-cols-3 gap-4">
            {user.posts.map((post) => (
              <div
                key={post._id}
                className="relative w-full h-36 bg-zinc-800 rounded-xl overflow-hidden"
              >
                <Image
                  src={post.imageUrl}
                  alt="Post"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Friends Grid */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mt-6">
          <h2 className="text-xl font-semibold text-indigo-400 mb-4">
            Friends ({user.friends.length})
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {user.friends.map((friend) => (
              <div
                key={friend._id}
                className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg"
              >
                <Image
                  src={friend.profilePicture}
                  alt="Friend"
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />

                <p className="text-white mt-2 text-sm font-medium">
                  {friend.fullname}
                </p>

                <p className="text-zinc-400 text-xs">@{friend.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
