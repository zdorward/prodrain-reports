// app/page.tsx
"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import { toDateInputValue } from "@/utils/date";

import type { BasicReportForm } from "@/lib/types";

import { TextField } from "@/components/TextField";

function buildFindingsSummary(form: BasicReportForm): string {
  const parts: string[] = [];

  const hasAnyDefect =
    form.rootIntrusion ||
    form.cracks ||
    form.offsets ||
    form.sagging ||
    form.blockages ||
    form.corrosion ||
    form.greaseDebris;

  if (!hasAnyDefect) {
    return "No issues were observed during this inspection.";
  }

  if (form.rootIntrusion) {
    parts.push(
      "Root intrusion was detected in sections of the drain line, indicating roots have penetrated joints or defects in the pipe."
    );
  }
  if (form.cracks) {
    parts.push(
      "Cracking was observed along portions of the line, which may allow infiltration and can worsen over time if not addressed."
    );
  }
  if (form.offsets) {
    parts.push(
      "Offsets or misaligned joints were identified, which can restrict flow and increase the likelihood of blockages."
    );
  }
  if (form.sagging) {
    parts.push(
      "Sagging (belly) was present in part of the line, causing standing water and increasing the risk of recurring backups."
    );
  }
  if (form.blockages) {
    parts.push(
      "Obstructions or blockages were noted, indicating impaired flow that may require clearing or further investigation."
    );
  }
  if (form.corrosion) {
    parts.push(
      "Corrosion or scaling was visible, suggesting deterioration that could lead to reduced pipe diameter or structural weakness."
    );
  }
  if (form.greaseDebris) {
    parts.push(
      "Grease or debris accumulation was found, which can restrict flow and contribute to future blockages if not cleaned."
    );
  }

  return parts.join("\n\n");
}

export default function HomePage() {
  const router = useRouter();

  const todayStr = toDateInputValue();

  const defectsConfig = [
    { key: "rootIntrusion", label: "Root intrusion" },
    { key: "cracks", label: "Cracks" },
    { key: "offsets", label: "Offsets / misalignment" },
    { key: "sagging", label: "Sagging / belly" },
    { key: "blockages", label: "Blockages / obstructions" },
    { key: "corrosion", label: "Corrosion / scaling" },
    { key: "greaseDebris", label: "Grease / debris accumulation" },
  ] as const;

  const [form, setForm] = useState<BasicReportForm>({
    clientName: "",
    propertyAddress: "",
    inspectionDate: todayStr,
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

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
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
            onChange={handleChange}
            placeholder="John Smith"
          />

          <TextField
            name="propertyAddress"
            label="Property Address"
            value={form.propertyAddress}
            onChange={handleChange}
            placeholder="123 Main St, Anytown"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              name="inspectionDate"
              label="Inspection Date"
              value={form.inspectionDate}
              onChange={handleChange}
              type="date"
            />

            <TextField
              name="inspectorName"
              label="Inspector Name"
              value={form.inspectorName}
              onChange={handleChange}
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
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="cursor-pointer inline-flex items-center justify-center rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
          >
            View Draft
          </button>
        </form>
      </div>
    </main>
  );
}
