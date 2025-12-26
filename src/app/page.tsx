"use client";

import { useContext, useEffect, useRef, useState } from "react";
import SideNav from "@/component/SideNav";
import Post from "../component/Post";
import PostUpload from "@/component/PostUpload";
import { userContext } from "@/context/userContext";

export default function Home() {
  const { isLoggedIn } = useContext(userContext);

  const [posts, setPosts] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);

  const loadPosts = async () => {
    if (loading) return;
    setLoading(true);

    const res = await fetch(`/api/posts?cursor=${cursor || ""}`);
    const data = await res.json();

    if (data.success) {
      setPosts((prev) => [...prev, ...data.posts]);
      setCursor(data.nextCursor);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (!observerRef.current || !cursor) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadPosts();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [cursor]);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="w-full max-w-4xl mx-auto py-8 px-4 flex gap-8">
        <SideNav />

        <div className="w-full md:w-3/4 flex flex-col gap-6">
          {isLoggedIn ? (
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700 shadow-md">
              <PostUpload />
            </div>
          ) : (
            <div className="bg-indigo-600 text-white p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div>
                
                <h2 className="text-lg font-bold">
                  Welcome to SocialFeed!
                </h2>
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

          {posts.map((post) => (
            <Post
              key={post._id}
              user={{
                name: post.author.username,
                avatar: post.author.profilePicture || "/defaultDp.png",
              }}
              time={post.createdAt}
              content={post.content}
              image={post.picture}
            />
          ))}

          <div ref={observerRef} className="h-10" />

          {loading && <p className="text-center text-zinc-400">Loading...</p>}
        </div>
      </main>
    </div>
  );
}
