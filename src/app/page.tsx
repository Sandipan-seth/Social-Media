import Image from "next/image";
import Post from "../component/post";
import Nav from "../component/navbar";
import { Search, Bell, User, Settings, Home as HomeIcon } from "lucide-react";

export default function Home() {
  const posts = [
    {
      user: { name: "John Doe", avatar: "/defaultDp.png" },
      time: "2h ago",
      content: "Just started building my new Next.js social media app! 🚀🔥 This dark theme setup with Tailwind CSS is looking sharp and modern.",
      image: "/defaultPost.jpg",
    },
    {
      user: { name: "Sara Smith", avatar: "/defaultDp.png" },
      time: "5h ago",
      content: "Dark theme is love. Working late night hits different ✨ Finding the perfect balance between 'too bright' and 'too dull' is key for a great user experience.",
    },
    {
      user: { name: "DevHub", avatar: "/defaultDp.png" },
      time: "1 day ago",
      content: "Here's a clean UI for feed pages using Tailwind + Next.js! Check out the subtle hover effects and component reuse for maximum performance.",
      image: "/defaultPost.jpg",
    },
  ];
  
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      
      <main className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
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
        
      
        <div className="w-full md:w-3/4 flex flex-col gap-6">
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700 shadow-md">
            <textarea
              placeholder="What's on your mind, John?"
              className="w-full bg-transparent text-white p-2 border-b border-zinc-700 focus:outline-none resize-none"
              rows={2}
            />
            <div className="flex justify-between items-center pt-3">
              <span className="text-sm text-indigo-400 cursor-pointer hover:text-indigo-300">Add Image/Video</span>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-150">
                Post
              </button>
            </div>
          </div>


          {
            posts.map((post, index) => (
              <Post
                key={index}
                user={post.user}
                time={post.time}
                content={post.content}
                image={post.image} 
              />
            ))
          }
        </div>
      </main>
    </div>
  );
}