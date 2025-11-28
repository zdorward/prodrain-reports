import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import type { BasicReportForm } from "@/lib/types";

export async function POST(request: Request) {
  const body = await request.json();

  const report = body as BasicReportForm & { id: string };

  const { data, error } = await supabase.from("reports").upsert(
    {
      id: report.id,
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
