// app/page.tsx
"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

type BasicReportForm = {
  clientName: string;
  propertyAddress: string;
  inspectionDate: string;
  inspectorName: string;
  notes: string;
  rootIntrusion: boolean;
  cracks: boolean;
  offsets: boolean;
  sagging: boolean;
  blockages: boolean;
  corrosion: boolean;
  greaseDebris: boolean;
};

const baseInputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm " +
  "text-slate-900 placeholder:text-slate-300 " +
  "focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800";

export default function HomePage() {
  const router = useRouter();

  const [form, setForm] = useState<BasicReportForm>({
    clientName: "",
    propertyAddress: "",
    inspectionDate: "",
    inspectorName: "",
    notes: "",
    rootIntrusion: false,
    cracks: false,
    offsets: false,
    sagging: false,
    blockages: false,
    corrosion: false,
    greaseDebris: false,
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 1. Generate a unique ID for this report
    const id = crypto.randomUUID();

    // 2. Save the report data into localStorage in the browser
    if (typeof window !== "undefined") {
      localStorage.setItem(`report-${id}`, JSON.stringify(form));
    }

    // 3. Redirect to the report preview page
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
          checklists, defect severity, photos, and PDF generation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="clientName"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Client Name
            </label>
            <input
              id="clientName"
              name="clientName"
              type="text"
              value={form.clientName}
              onChange={handleChange}
              className={baseInputClass}
              placeholder="John Smith"
              required
            />
          </div>

          <div>
            <label
              htmlFor="propertyAddress"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Property Address
            </label>
            <input
              id="propertyAddress"
              name="propertyAddress"
              type="text"
              value={form.propertyAddress}
              onChange={handleChange}
              className={baseInputClass}
              placeholder="123 Main St, Anytown"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="inspectionDate"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Inspection Date
              </label>
              <input
                id="inspectionDate"
                name="inspectionDate"
                type="date"
                value={form.inspectionDate}
                onChange={handleChange}
                className={baseInputClass}
                required
              />
            </div>

            <div>
              <label
                htmlFor="inspectorName"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Inspector Name
              </label>
              <input
                id="inspectorName"
                name="inspectorName"
                type="text"
                value={form.inspectorName}
                onChange={handleChange}
                className={baseInputClass}
                placeholder="Danny"
                required
              />
            </div>
          </div>

          <fieldset className="border border-slate-200 rounded-md p-4">
            <legend className="text-sm font-medium text-slate-700 px-1">
              Defects &amp; Observations
            </legend>
            <p className="text-xs text-slate-500 mb-3">
              Check all defects observed during the drain inspection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <label className="inline-flex items-center gap-2 text-slate-700">
                <input
                  type="checkbox"
                  name="rootIntrusion"
                  checked={form.rootIntrusion}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>Root intrusion</span>
              </label>

              <label className="inline-flex items-center gap-2 text-slate-700">
                <input
                  type="checkbox"
                  name="cracks"
                  checked={form.cracks}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>Cracks</span>
              </label>

              <label className="inline-flex items-center gap-2 text-slate-700">
                <input
                  type="checkbox"
                  name="offsets"
                  checked={form.offsets}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>Offsets / misalignment</span>
              </label>

              <label className="inline-flex items-center gap-2 text-slate-700">
                <input
                  type="checkbox"
                  name="sagging"
                  checked={form.sagging}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>Sagging / belly</span>
              </label>

              <label className="inline-flex items-center gap-2 text-slate-700">
                <input
                  type="checkbox"
                  name="blockages"
                  checked={form.blockages}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>Blockages / obstructions</span>
              </label>

              <label className="inline-flex items-center gap-2 text-slate-700">
                <input
                  type="checkbox"
                  name="corrosion"
                  checked={form.corrosion}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>Corrosion / scaling</span>
              </label>

              <label className="inline-flex items-center gap-2 text-slate-700">
                <input
                  type="checkbox"
                  name="greaseDebris"
                  checked={form.greaseDebris}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>Grease / debris accumulation</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              General Notes (temporary)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              className={baseInputClass}
              placeholder="High-level summary of the drain inspection. Later, this will be generated automatically."
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
          >
            Save Draft (no PDF yet)
          </button>
        </form>
      </div>
    </main>
  );
}
