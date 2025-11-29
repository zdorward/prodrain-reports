import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

import type { BasicReportForm } from "@/lib/types";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const report = body as BasicReportForm & { id: string };

  const { data, error } = await supabase.from("reports").upsert(
    {
      id: report.id,
      user_id: user.id,
      clientName: report.clientName,
      propertyAddress: report.propertyAddress,
      inspectionDate: report.inspectionDate,
      inspectorName: report.inspectorName,
      notes: report.notes,
      rootIntrusion: report.rootIntrusion,
      cracks: report.cracks,
      offsets: report.offsets,
      sagging: report.sagging,
      blockages: report.blockages,
      corrosion: report.corrosion,
      greaseDebris: report.greaseDebris,
    },
    { onConflict: "id" }
  );

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function GET(request: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ data: null }, { status: 404 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
