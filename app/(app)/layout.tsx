// app/(app)/layout.tsx
import { redirect } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect all routes in (app)
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="print:hidden">
        <NavBar email={session.user?.email ?? null} />
      </div>

      <main className="flex-1 bg-slate-100 flex items-center justify-center p-4 overflow-hidden">
        {children}
      </main>
    </>
  );
}
