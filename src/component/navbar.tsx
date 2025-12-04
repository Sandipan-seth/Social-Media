"use client";

import React from "react";
import { useState } from "react";
import { Search, Bell, User, Settings, Home as HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Nav() {

    const [search, setSearch] = useState("");
    const router = useRouter();
    const searchFunction = (e:any) => {
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
    <nav className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HomeIcon className="w-6 h-6 text-indigo-500" />
          <h1 className="text-xl font-extrabold tracking-wide text-white">
            SocialFeed
          </h1>
        </div>

        <div className="relative flex items-center w-1/2 max-w-sm sm:flex">
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

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-zinc-800 transition">
            <Bell className="w-6 h-6 text-zinc-400" />
          </button>

          <div className="relative">
            <img
              src={defaultAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 cursor-pointer hover:opacity-90 transition"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></span>
          </div>
        </div>
      </div>
    </nav>
  );
}
