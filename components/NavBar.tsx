"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const path = usePathname();

  const base = "px-4 py-2 text-sm font-medium";
  const active = base + " text-slate-900 border-b-2 border-slate-800";
  const inactive = base + " text-slate-600 hover:text-slate-900";

  return (
    <nav className="w-full bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-3xl mx-auto flex items-center gap-6 px-6 h-14">
        {/* optional brand */}
        <span className="text-base font-semibold text-slate-800">
          DrainReport
        </span>

        <div className="flex gap-2">
          <Link href="/" className={path === "/" ? active : inactive}>
            New Report
          </Link>
          <Link
            href="/reports"
            className={path === "/reports" ? active : inactive}
          >
            Reports
          </Link>
        </div>
      </div>
    </nav>
  );
}
