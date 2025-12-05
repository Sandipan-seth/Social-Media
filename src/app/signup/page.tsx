"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  
  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
    if (token) {
      router.push("/");
    }
  }, [token]);

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

    try {
      const response = await axios.post("/api/signup", formData);
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        router.push("/");

        toast.success("User registered successfully");
      } else {
        alert(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setFormData({
        username: "",
        fullname: "",
        email: "",
        gender: "",
        password: "",
      });
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <main className="w-full max-w-md p-8 bg-zinc-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
              <span className="text-gray-400 my-0.5 ml-1 text-xs font-normal">
                (must be unique for each user)
              </span>
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Choose a username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
              required
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium mb-1">
              Gender
            </label>
            <select
              id="gender"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Create a password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition duration-300"
          >
            Sign Up
          </button>
          <h1>
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </h1>
        </form>
      </main>
    </div>
  );
}
