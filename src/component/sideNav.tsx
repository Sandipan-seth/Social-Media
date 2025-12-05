import { Search, Bell, User, Settings, Home as HomeIcon } from "lucide-react";

export default function SideNav() {
  return (
    <div className="hidden md:block md:w-1/4 sticky top-24 h-fit p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
      <h3 className="font-semibold text-lg mb-4 text-indigo-400">Navigation</h3>
      <ul className="space-y-3 text-zinc-300">
        <li className="flex items-center gap-2 p-2 rounded-lg bg-indigo-900/30 text-indigo-400 font-medium cursor-pointer">
          <HomeIcon className="w-5 h-5" /> Feed
        </li>
        <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800 cursor-pointer">
          <Settings className="w-5 h-5" /> Settings
        </li>
        <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800 cursor-pointer">
          <User className="w-5 h-5" /> Profile
        </li>
      </ul>
    </div>
  );
}
