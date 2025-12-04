"use client";
import connect from "@/dbConnect/dbConnect";
connect();
export async function GET() {
  return new Response("API is running");
}