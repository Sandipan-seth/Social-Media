"use client";

import React from "react";
import SideNav from "@/component/sideNav";
import Image from "next/image";
import axios from "axios";
import { Mail, User, PencilLine } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import maleDp from "@/assets/maleDefault.png";

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;

  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
      return;
    }
    setToken(storedToken);
  }, []);

  React.useEffect(() => {
    if (!token || !username) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.post("/api/user/profileDetails", {
          username,
        });

        if (response.data.success) {
          const userData = response.data.user;

          setUser(userData);
        } else {
          router.push("/404");
          toast.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, [token, username]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-zinc-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        <SideNav />

        <div className="w-full md:w-3/4 flex flex-col gap-2">


          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border border-zinc-700">
                <Image
                  // src={user.profilePicture}
                  src={maleDp}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>

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
                    <Mail className="w-4 h-4" /> {user.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" /> {user.gender}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-zinc-300">
              {user.bio || "No bio added yet."}
            </p>
          </div>

          {/* STATS */}
          <div className="flex justify-between bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mt-6 text-center">
            <div>
              <p className="text-2xl font-bold text-white">
                {user.posts?.length || 0}
              </p>
              <p className="text-zinc-400 text-sm">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {user.friends?.length || 0}
              </p>
              <p className="text-zinc-400 text-sm">Friends</p>
            </div>
          </div>

          {/* FRIENDS */}
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mt-6">
            <h2 className="text-xl font-semibold text-indigo-400 mb-4">
              Friends ({user.friends?.length || 0})
            </h2>

            {user.friends?.length === 0 ? (
              <p className="text-zinc-400">No friends yet.</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {user.friends.map((friend: any) => (
                  <div
                    key={friend._id}
                    className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg"
                  >
                    <Image
                      src={friend.profilePicture}
                      alt={friend.fullname}
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
            )}
          </div>

          {/* POSTS */}
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mt-6">
            <h2 className="text-xl font-semibold text-indigo-400 mb-4">
              Posts
            </h2>

            {user.posts?.length === 0 ? (
              <p className="text-zinc-400">No posts yet.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {user.posts.map((post: any) => (
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
