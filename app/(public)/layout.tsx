// app/layout.tsx
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "DrainReport",
  description: "Developed by Zack Dorward",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col overflow-y-scroll">
      {children}
    </main>
  );
}
