import { supabase } from "@/lib/supabase/client";
import type { BasicReportForm } from "@/lib/types";

export async function saveReportToSupabase(id: string, form: BasicReportForm) {
  const { data, error } = await supabase.from("reports").upsert(
    [
      {
        id, // use your route id as the PK
        clientName: form.clientName,
        propertyAddress: form.propertyAddress,
        inspectionDate: form.inspectionDate,
        inspectorName: form.inspectorName,
        notes: form.notes,
        rootIntrusion: form.rootIntrusion,
        cracks: form.cracks,
        offsets: form.offsets,
        sagging: form.sagging,
        blockages: form.blockages,
        corrosion: form.corrosion,
        greaseDebris: form.greaseDebris,
      },
    ],
    { onConflict: "id" }
  );

  if (error) {
    console.error("Error saving report to Supabase:", error);
    throw error;
  }

  return data;
}
