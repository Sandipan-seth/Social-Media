"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    gender: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  async function handleSubmit(e: any) {
  e.preventDefault();

  const usernameFormatted = formData.username.split(" ").join("_");

  const validate = await axios.post("/api/signup/check", {
    username: usernameFormatted,
    email: formData.email,
  });

  if (!validate.data.success) {
    toast.error(validate.data.message);
    return;
  }

  let imageUrl = "";

  if (profilePic) {
    const form = new FormData();
    form.append("file", profilePic);

    try {
      const uploadRes = await axios.post("/api/upload", form);
      imageUrl = uploadRes.data.secure_url;
    } catch (error) {
      toast.error("Failed to upload profile picture");
      return;
    }
  }

  try {
    const response = await axios.post("/api/signup", {
      ...formData,
      username: usernameFormatted,
      profilePicture: imageUrl,
    });

    if (response.data.success) {
      toast.success("User registered successfully!");
      router.push("/");
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    console.log(err);
    toast.error("Signup failed");
  }
}


  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <main className="w-full max-w-md p-8 bg-zinc-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Picture
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="fullname" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              required
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium mb-1">
              Gender
            </label>
            <select
              id="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold"
          >
            Sign Up
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
