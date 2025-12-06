"use client";

import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function SearchPage() {
  const params = useParams();
  const search = (params.search as string) || "";
  const displaySearchTerm = decodeURIComponent(search); 

  const sameNameData = [
    {
      id: 1,
      name: displaySearchTerm,
      username: displaySearchTerm.toLowerCase().replace(/\s/g, "") || "user",
      bio: "✨ Official profile for the main account. Posting updates daily. Verified.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      followers: "1.2M", // New
      isVerified: true, // New
    },
    {
      id: 2,
      name: displaySearchTerm,
      username:
        (displaySearchTerm.toLowerCase().replace(/\s/g, "") || "user") +
        "_fans",
      bio: "💖 The best fan content and community discussions. Follow for more! Fan Page.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      followers: "98.5K", // New
      isVerified: false, // New
    },
    {
      id: 3,
      name: "The " + displaySearchTerm + " Archive",
      username:
        (displaySearchTerm.toLowerCase().replace(/\s/g, "") || "user") +
        "_archive",
      bio: "🏛️ Archival content, historical data, and deep dives into the past. Unofficial.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
      followers: "5.1K", // New
      isVerified: false, // New
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <main className="w-full max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pt-4">
          <div className="flex items-center text-zinc-400 mb-2">
            <Search className="w-5 h-5 mr-3 text-indigo-500" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Search Results
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-white">
            <span className="text-indigo-400 font-extrabold">
              &quot;{displaySearchTerm}&quot;
            </span>
          </h1>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-zinc-300 border-b border-zinc-800 pb-2">
            Profiles ({sameNameData.length})
          </h2>

          {sameNameData.map((item) => (
            <Link
              key={item.id}
              href={`/profile/${item.username}`}
              className="block group rounded-xl transition duration-300 outline-none focus:ring-4 focus:ring-indigo-500/50"
            >
              <div className="bg-zinc-900 p-4 rounded-xl shadow-2xl flex items-start space-x-4 border border-zinc-800 transition duration-300 ease-in-out hover:bg-zinc-850 hover:border-indigo-600/50">
                <Image
                  src={item.image as string}
                  alt={item.name}
                  width={72}
                  height={72}
                  className="rounded-full object-cover border-4 border-zinc-700 group-hover:border-indigo-500 transition shadow-lg flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-0.5">
                    <h2 className="text-xl font-bold text-white truncate group-hover:text-indigo-400 transition">
                      {item.name}
                    </h2>
                    {item.isVerified && (
                      <span
                        className="text-indigo-400 bg-indigo-900/50 p-0.5 rounded-full"
                        title="Verified Account"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 text-sm mb-2">
                    <p className="font-mono text-zinc-400">@{item.username}</p>
                    <span className="text-zinc-600">•</span>
                    <p className="text-zinc-500 font-medium">
                      {item.followers} Followers
                    </p>
                  </div>

                  <p className="text-sm text-zinc-400 line-clamp-2 leading-snug">
                    {item.bio}
                  </p>
                </div>

                <ChevronRight className="w-6 h-6 text-zinc-600 group-hover:text-indigo-400 transition self-center shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
