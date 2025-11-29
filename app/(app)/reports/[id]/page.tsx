import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ReportDraft } from "@/lib/types";
import { ReportViewClient } from "./ReportViewClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReportPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    // could redirect to login if you want
    notFound();
  }

  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    notFound();
  }

  if (!data) {
    notFound();
  }

  return <ReportViewClient report={data as ReportDraft} />;
}
