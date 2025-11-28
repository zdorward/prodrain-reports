"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { logout } from "@/app/(public)/login/actions";

type NavBarProps = {
  email: string | null;
};

export function NavBar({ email }: NavBarProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const base = "px-4 py-2 text-sm font-medium";
  const active = base + " text-slate-900 border-b-2 border-slate-800";
  const inactive = base + " text-slate-600 hover:text-slate-900";

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b border-slate-200">
      <div className="flex items-center px-6 h-14">
        {/* Brand + links */}
        <div className="w-full flex items-center gap-6">
          <span className="text-base font-semibold text-slate-800">
            DrainReport
          </span>
          <div className="flex gap-2">
            <Link href="/" className={pathname === "/" ? active : inactive}>
              New Report
            </Link>
            <Link
              href="/reports"
              className={pathname === "/reports" ? active : inactive}
            >
              Reports
            </Link>
          </div>
        </div>

        {/* User email + logout */}
        <div className="flex items-center gap-4">
          {email && <span className="text-xs text-slate-600">{email}</span>}
          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="cursor-pointer text-xs font-medium text-slate-700 hover:underline disabled:opacity-60"
          >
            {isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
}
