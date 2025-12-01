// app/page.tsx
"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { toDateInputValue } from "@/utils/date";

import type { BasicReportForm, DefectKey } from "@/lib/types";
import { defectNotes } from "@/lib/defectNotes";
import { TextField } from "@/components/TextField";

const defectsConfig: { key: DefectKey; label: string }[] = [
  { key: "rootIntrusion", label: "Root intrusion" },
  { key: "cracks", label: "Cracks" },
  { key: "offsets", label: "Offsets / misalignment" },
  { key: "sagging", label: "Sagging / belly" },
  { key: "blockages", label: "Blockages / obstructions" },
  { key: "corrosion", label: "Corrosion / scaling" },
  { key: "greaseDebris", label: "Grease / debris accumulation" },
];

function buildFindingsSummary(form: BasicReportForm): string {
  const activeNotes = defectsConfig
    .filter(({ key }) => form[key])
    .map(({ key }) => defectNotes[key]);

  if (activeNotes.length === 0) {
    return "No issues were observed during this inspection.";
  }

  return activeNotes.join("\n\n");
}

export default function HomePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<BasicReportForm>({
    clientName: "",
    propertyAddress: "",
    inspectionDate: toDateInputValue(),
    inspectorName: "",
    rootIntrusion: false,
    cracks: false,
    offsets: false,
    sagging: false,
    blockages: false,
    corrosion: false,
    greaseDebris: false,
    notes: "",
  });

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const target = e.target;
    const key = target.name as keyof BasicReportForm;

    setForm((prev) => ({
      ...prev,
      [key]:
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target.value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const id = crypto.randomUUID();

      const res = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          clientName: form.clientName,
          propertyAddress: form.propertyAddress,
          inspectionDate: form.inspectionDate,
          inspectorName: form.inspectorName,
          rootIntrusion: form.rootIntrusion,
          cracks: form.cracks,
          offsets: form.offsets,
          sagging: form.sagging,
          blockages: form.blockages,
          corrosion: form.corrosion,
          greaseDebris: form.greaseDebris,
          notes: buildFindingsSummary(form),
        }),
      });

      if (!res.ok) {
        console.error("Failed to save report");
        // TODO: surface this in the UI if you want
        return;
      }

      router.push(`/reports/${id}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-slate-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-2 text-slate-800">
          New Drain Inspection Report
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Enter the basic details for this inspection. Later, we&apos;ll add
          photos and PDF generation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            name="clientName"
            label="Client Name"
            value={form.clientName}
            onChange={handleInputChange}
            placeholder="John Smith"
          />

          <TextField
            name="propertyAddress"
            label="Property Address"
            value={form.propertyAddress}
            onChange={handleInputChange}
            placeholder="123 Main St, Anytown"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              name="inspectionDate"
              label="Inspection Date"
              value={form.inspectionDate}
              onChange={handleInputChange}
              type="date"
            />

            <TextField
              name="inspectorName"
              label="Inspector Name"
              value={form.inspectorName}
              onChange={handleInputChange}
              placeholder="Danny"
            />
          </div>

          <fieldset className="border border-slate-200 rounded-md p-4">
            <legend className="text-sm font-medium text-slate-700 px-1">
              Defects &amp; Observations
            </legend>
            <p className="text-xs text-slate-500 mb-3">
              Check all defects observed during the drain inspection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {defectsConfig.map(({ key, label }) => (
                <label
                  key={key}
                  className="inline-flex items-center gap-2 text-slate-700"
                >
                  <input
                    type="checkbox"
                    name={key}
                    checked={form[key]}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Generating..." : "Generate Report"}
          </Button>
        </form>
      </div>
    </main>
  );
}
