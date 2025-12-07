"use client";

import React, { useEffect, useState } from "react";
import { Search, Bell, User, Home as HomeIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Nav() {
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState("");

  React.useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
  }, [token]);

  useEffect(() => {
    const t = localStorage.getItem("token") || "";
    setToken(t);
    setIsLoggedIn(!!t);
  }, []);

  const searchFunction = (e: any) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/search/${encodeURIComponent(search)}`);
    }
    if (e.key === "Escape") {
      setSearch("");
    }
  };

  const defaultAvatar =
    "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png";

  return (
    <div className="sticky top-0 w-full z-50 flex flex-col bg-zinc-900/95 backdrop-blur-lg shadow-md">
      {/* DESKTOP NAV */}
      <nav className="w-full border-b border-zinc-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2"
            onClick={() => router.push("/")}
          >
            <HomeIcon className="w-6 h-6 text-indigo-500" />
            <h1 className="text-xl font-extrabold tracking-wide text-white">
              SocialFeed
            </h1>
          </div>

          {/* Search bar - Desktop only */}
          <div className="hidden md:flex relative items-center w-1/2 max-w-sm">
            <Search className="absolute left-3 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={searchFunction}
              placeholder="Search posts, users, and topics..."
              className="w-full py-2 pl-10 pr-4 rounded-full bg-zinc-800 text-sm text-white placeholder-zinc-500 border border-zinc-700 focus:border-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Notification icon */}
            <button className="p-2 rounded-full hover:bg-zinc-800 transition">
              <Bell className="w-6 h-6 text-zinc-400" />
            </button>

            {/* Avatar dropdown */}
            <div className="relative">
              {isLoggedIn ? (
                <div className="relative group cursor-pointer select-none">
                  {/* Avatar */}
                  <img
                    src={defaultAvatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 hover:opacity-90 transition"
                  />

                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></span>

                  {/* Dropdown */}
                  <div
                    className="
                      absolute right-0 mt-3 w-44 bg-zinc-900 border border-zinc-800 rounded-xl 
                      shadow-xl opacity-0 scale-95 
                      group-hover:opacity-100 group-hover:scale-100 
                      overflow-hidden
                      transition-all duration-200 ease-out
                      z-50
                    "
                  >
                    {/* Mobile-only buttons */}
                    <button
                      onClick={() => {
                        router.push("/");
                      }}
                      className="md:hidden w-full text-left px-4 py-2 hover:bg-zinc-800 text-zinc-300"
                    >
                      Feed
                    </button>
                    <button className="md:hidden w-full text-left px-4 py-2 hover:bg-zinc-800 text-zinc-300">
                      Edit Profile
                    </button>
                    <button
                      onClick={() =>
                        token
                          ? router.push(`/profile/${username}`)
                          : router.push("/login")
                      }
                      className="md:hidden w-full text-left px-4 py-2 hover:bg-zinc-800 text-zinc-300"
                    >
                      My Profile
                    </button>

                    {/* Logout */}
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        setIsLoggedIn(false);
                        toast.success("Logged out");
                        router.push("/");
                      }}
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
        </div>
      </nav>

      {/* MOBILE SEARCH BAR */}
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
