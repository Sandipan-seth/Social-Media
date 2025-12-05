"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Email:", email);
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      console.log("Response:", response.data);
      if (response.data.success) {
        route.push("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <main className="w-full max-w-md p-8 bg-zinc-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition duration-300"
          >
            Login
          </button>
          <h1>
            Don't have an account?{" "}
            <Link href="/signup" className="text-indigo-500 hover:underline">
              Sign Up
            </Link>
          </h1>
        </form>
      </main>
    </div>
  );
}
