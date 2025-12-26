"use client";

import NavWrapper from "@/components/NavWrapper";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavWrapper />
      {children}
      <Toaster position="top-right" />
    </>
  );
}
