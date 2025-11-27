import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProDrainTech Reports",
  description: "Developed by Zack Dorward",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col overflow-y-scroll">
        <NavBar />
        <main className="flex-1 bg-slate-100 flex items-center justify-center p-4 overflow-hidden">
          {children}
        </main>{" "}
      </body>
    </html>
  );
}
