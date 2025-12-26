"use client";
import Image from "next/image";
import Post from "../component/post";
import Nav from "../component/navbar";
import SideNav from "@/component/sideNav";
import { useContext, useEffect, useState } from "react";
import { userContext } from "@/context/userContext";
import PostUpload from "@/component/PostUpload";

export default function Home() {

  const {isLoggedIn, setIsLoggedIn} = useContext(userContext);

  


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
      <main className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        <SideNav />

        <div className="w-full md:w-3/4 flex flex-col gap-6">
          {isLoggedIn ? (
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700 shadow-md">
              <PostUpload />
            </div>
          ) : (
            <div className="bg-indigo-600 text-white p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Welcome to SocialFeed!</h2>
                <p className="text-sm">
                  Join our community and start sharing your moments.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => (window.location.href = "/signup")}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {posts.map((post, index) => (
            <Post
              key={index}
              user={post.user}
              time={post.time}
              content={post.content}
              image={post.image}
            />
          ))}
        </div>
      </main>
    </div>
  );
}