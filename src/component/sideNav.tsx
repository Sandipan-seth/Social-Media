"use client";

import { usePathname, useRouter } from "next/navigation";
import { Edit, Home as HomeIcon, Settings, User } from "lucide-react";
import React from "react";

export default function SideNav() {
  const path = usePathname();
  const router = useRouter();

  const [token, setToken] = React.useState("");
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    setToken(localStorage.getItem("token") || "");
    setUsername(localStorage.getItem("username") || "");
  }, []);

  return (
    <div
      className="
        hidden md:flex flex-col 
        w-48                               /* Slim professional width */
        sticky top-24 
        h-fit 
        p-4                                /* reduced padding */
        rounded-xl 
        bg-zinc-900/80                     /* lighter subtle background */
        border border-zinc-800 
        shadow-sm
      "
    >
      <h3 className="font-semibold text-base mb-3 text-indigo-400">
        Navigation
      </h3>

      <ul className="space-y-1.5 text-zinc-300 text-sm">

        {/* FEED */}
        <li
          className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition
            ${
              path === "/"
                ? "bg-indigo-900/30 text-indigo-400 font-medium"
                : "hover:bg-zinc-800/50"
            }
          `}
          onClick={() => router.push("/")}
        >
          <HomeIcon className="w-4 h-4" />
          Feed
        </li>

        {/* SETTINGS */}
        <li
          className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition
            ${
              path === "/settings"
                ? "bg-indigo-900/30 text-indigo-400 font-medium"
                : "hover:bg-zinc-800/50"
            }
          `}
          onClick={() => router.push("/profile/edit")}
        >
          <Edit className="w-4 h-4" />
          Edit
        </li>

        {/* PROFILE */}
        <li
          className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition
            ${
              path?.startsWith("/profile/")
                ? "bg-indigo-900/30 text-indigo-400 font-medium"
                : "hover:bg-zinc-800/50"
            }
          `}
          onClick={() =>
            token ? router.push(`/profile/${username}`) : router.push("/login")
          }
        >
          <User className="w-4 h-4" />
          Profile
        </li>
      </ul>
    </div>
  );
}
