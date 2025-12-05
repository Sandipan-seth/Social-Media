"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home as HomeIcon, Settings, User } from "lucide-react";
import React from "react";

export default function SideNav() {
  const path = usePathname();
  const router = useRouter();
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, [token]);

  return (
    <div className="hidden md:block md:w-1/4 sticky top-24 h-fit p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
      <h3 className="font-semibold text-lg mb-4 text-indigo-400">Navigation</h3>

      <ul className="space-y-3 text-zinc-300">
        <li
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer 
          ${
            path === "/"
              ? "bg-indigo-900/30 text-indigo-400 font-medium"
              : "hover:bg-zinc-800"
          }`}
          onClick={() => router.push("/")}
        >
          <HomeIcon className="w-5 h-5" /> Feed
        </li>

        <li
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer 
          ${
            path === "/settings"
              ? "bg-indigo-900/30 text-indigo-400 font-medium"
              : "hover:bg-zinc-800"
          }`}
          onClick={() => router.push("/settings")}
        >
          <Settings className="w-5 h-5" /> Settings
        </li>

        <li
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer 
          ${
            path?.startsWith("/profile/")
              ? "bg-indigo-900/30 text-indigo-400 font-medium"
              : "hover:bg-zinc-800"
          }`}
          onClick={() =>
            token ? router.push("/profile/Sandipan") : router.push("/login")
          }
        >
          <User className="w-5 h-5" /> Profile
        </li>
      </ul>
    </div>
  );
}
