"use client";

import React, { useEffect, useState, useContext } from "react";
import { Search, Bell, User, Home as HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { userContext } from "@/context/userContext";

export default function Nav() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    profilePic,
    setProfilePic,
  } = useContext<any>(userContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          withCredentials: true,
        });

        if (res.data.loggedIn) {
          setIsLoggedIn(true);
          setUser(res.data.user);
          setProfilePic(res.data.user.profilePicture);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const searchFunction = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/search/${encodeURIComponent(search)}`);
    }
    if (e.key === "Escape") {
      setSearch("");
    }
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setIsLoggedIn(false);
    setUser(null);
    toast.success("Logged out");
    router.push("/");
  };

  return (
    <div className="sticky top-0 w-full z-50 flex flex-col bg-zinc-900/95 backdrop-blur-lg shadow-md">
      <nav className="w-full border-b border-zinc-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <HomeIcon className="w-6 h-6 text-indigo-500" />
            <h1 className="text-xl font-extrabold text-white">SocialFeed</h1>
          </div>

          <div className="hidden md:flex relative items-center w-1/2 max-w-sm">
            <Search className="absolute left-3 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={searchFunction}
              placeholder="Search posts, users, topics..."
              className="w-full py-2 pl-10 pr-4 rounded-full bg-zinc-800 text-sm text-white placeholder-zinc-500 border border-zinc-700 focus:border-indigo-500 focus:outline-none transition"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-zinc-800 transition">
              <Bell className="w-6 h-6 text-zinc-400" />
            </button>

            {isLoggedIn ? (
              <div className="relative group cursor-pointer">
                {profilePic && (
                  <img
                    src={profilePic}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                  />
                )}

                <div
                  className="
                    absolute right-0 mt-3 w-24 md:w-44 bg-zinc-900 border border-zinc-800 rounded-xl 
                    shadow-xl opacity-0 scale-95 
                    group-hover:opacity-100 group-hover:scale-100 
                    transition-all duration-200
                    z-50
                  "
                >
                  <button
                    onClick={() => router.push(`/profile/${user.username}`)}
                    className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-zinc-300"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-red-600/30 text-red-400 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white text-sm font-semibold transition"
              >
                <User className="w-5 h-5" />
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="flex md:hidden relative items-center w-[95%] mx-auto my-3">
        <Search className="absolute left-3 w-5 h-5 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={searchFunction}
          placeholder="Search posts, users, topics..."
          className="w-full py-2 pl-10 pr-4 rounded-full bg-zinc-800 text-sm text-white placeholder-zinc-500 border border-zinc-700 focus:border-indigo-500 focus:outline-none transition"
        />
      </div>
    </div>
  );
}
