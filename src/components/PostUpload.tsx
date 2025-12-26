"use client";

import { userContext } from "@/context/userContext";
import axios from "axios";
import { ImagePlus, Globe, Users } from "lucide-react";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [privacy, setPrivacy] = useState<"public" | "friends">("public");
  const { user } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!user) {
      toast.error("You must be logged in to create a post");
      setLoading(false);
      return;
    }
    try {
      let postUrl = "";
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          const uploadRes = await axios.post("/api/upload", formData);
          postUrl = uploadRes.data.secure_url;
        } catch (error) {
          toast.error("Failed to upload profile picture");
          return;
        }
      }

      try {
        const res = await axios.post("/api/post", {
          content,
          author: user._id,
          picture: postUrl,
          isOnlyFriends: privacy === "friends" ? true : false,
        });

        toast.success("Post created successfully");
        console.log("Post created:", res.data);
      } catch (error) {
        toast.error("Failed to create post");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create post");
    } finally {
      setContent("");
      setFile(null);
      setPrivacy("public");
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 shadow-lg max-w-xl mx-auto"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`What's on your mind , ${user.username}?`}
        rows={2}
        className="w-full bg-transparent text-white placeholder-zinc-400
                   resize-none focus:outline-none border-b border-zinc-800 pb-3
                   focus:border-indigo-500 transition"
      />

      {file && (
        <div className="mt-3 relative">
          {file.type.startsWith("image") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="rounded-xl max-h-60 object-cover"
            />
          ) : (
            <video
              src={URL.createObjectURL(file)}
              controls
              className="rounded-xl max-h-60"
            />
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-center flex-col md:flex-row justify-between pt-4 gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-sm text-indigo-400
                     hover:text-indigo-300 transition"
        >
          <ImagePlus size={18} />
          Add Image / Video
        </button>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value as "public" | "friends")}
            className="bg-zinc-800 text-sm text-white px-3 py-2
                       rounded-full border border-zinc-700
                       focus:outline-none focus:border-indigo-500"
          >
            <option value="public">🌍 Public</option>
            <option value="friends">👥 Friends</option>
          </select>

          <button
            type="submit"
            disabled={!content.trim()}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition w-2/3 md:w-auto 
              ${
                content.trim()
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              }`}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
}
