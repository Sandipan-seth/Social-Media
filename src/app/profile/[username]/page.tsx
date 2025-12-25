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

  const [user, setUser] = React.useState<any>(null);
  const [profileImage, setProfileImage] = React.useState<string>("");


  React.useEffect(() => {
    if (!username) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.post("/api/user/profileDetails", {
          username,
        });

        if (response.data.success) {
          setUser(response.data.user);
          console.log("Fetched user profile:", response.data.user);
          setProfileImage(response.data.user.profilePicture);
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
  }, [username]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-zinc-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">

        <div className="w-full md:w-1/4">
          <SideNav />
        </div>

        <div className="w-full md:w-3/4 flex flex-col gap-6">

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-zinc-700 flex-shrink-0">
                <Image 
                  src={profileImage || maleDp}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>

              {/* NAME & DETAILS */}
              <div className="text-center sm:text-left w-full">
                <h1 className="text-2xl font-bold flex items-center justify-center sm:justify-start gap-2">
                  {user.fullname}
                  <button className="p-2 rounded-lg hover:bg-zinc-800 transition">
                    <PencilLine className="w-5 h-5 text-zinc-400" />
                  </button>
                </h1>

                <p className="text-zinc-400">@{user.username}</p>

                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 mt-3 text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {user.gender}
                  </div>
                </div>

                <p className="mt-4 text-zinc-300 text-center sm:text-left">
                  {user.bio || "No bio added yet."}
                </p>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex justify-around sm:justify-between text-center">
            <div>
              <p className="text-2xl font-bold">{user.posts?.length || 0}</p>
              <p className="text-zinc-400 text-sm">Posts</p>
            </div>

            <div>
              <p className="text-2xl font-bold">{user.friends?.length || 0}</p>
              <p className="text-zinc-400 text-sm">Friends</p>
            </div>
          </div>

          {/* FRIENDS */}
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-semibold text-indigo-400 mb-4">
              Friends ({user.friends?.length || 0})
            </h2>

            {user.friends?.length === 0 ? (
              <p className="text-zinc-400">No friends yet.</p>
            ) : (
              <div className="
                grid 
                grid-cols-2 
                sm:grid-cols-3 
                lg:grid-cols-4 
                gap-4
              ">
                {user.friends.map((friend: any) => (
                  <div
                    key={friend._id}
                    className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg text-center"
                  >
                    <Image
                      src={friend.profilePicture}
                      alt={friend.fullname}
                      width={70}
                      height={70}
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
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-semibold text-indigo-400 mb-4">
              Posts
            </h2>

            {user.posts?.length === 0 ? (
              <p className="text-zinc-400">No posts yet.</p>
            ) : (
              <div className="
                grid 
                grid-cols-2 
                sm:grid-cols-3 
                lg:grid-cols-4 
                gap-4
              ">
                {user.posts.map((post: any) => (
                  <div
                    key={post._id}
                    className="relative w-full h-36 sm:h-40 bg-zinc-800 rounded-xl overflow-hidden"
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