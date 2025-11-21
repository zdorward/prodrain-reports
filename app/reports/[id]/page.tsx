// app/reports/[id]/page.tsx

/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function ReportPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [report, setReport] = useState<BasicReportForm | null | undefined>(
    undefined
  );

  // Load the report from localStorage on first render
  useEffect(() => {
    if (!id) {
      setReport(null);
      return;
    }

    if (typeof window === "undefined") {
      // Shouldn't happen in a client component, but just in case
      return;
    }

    const stored = localStorage.getItem(`report-${id}`);

    if (!stored) {
      setReport(null);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as BasicReportForm;
      setReport(parsed);
    } catch {
      setReport(null);
    }
  }, [id]);

  // Still loading from localStorage
  if (report === undefined) {
    return (
      <main className="p-6">
        <p className="text-slate-700">Loading report…</p>
      </main>
    );
  }

  // Nothing found in localStorage
  if (report === null) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold text-red-600">Report not found</h1>
        <p className="text-slate-700 mt-2">
          This report does not exist in this browser or was cleared.
        </p>
      </main>
    );
  }

  // Report loaded successfully
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-slate-800">
          Drain Inspection Report
        </h1>

        <section className="space-y-2 text-slate-700">
          <p>
            <strong>Client:</strong> {report.clientName}
          </p>
          <p>
            <strong>Property:</strong> {report.propertyAddress}
          </p>
          <p>
            <strong>Date:</strong> {report.inspectionDate}
          </p>
          <p>
            <strong>Inspector:</strong> {report.inspectorName}
          </p>

          <div className="mt-4">
            <strong>Notes:</strong>
            <p className="whitespace-pre-line mt-1">{report.notes}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Defects &amp; Observations
            </h2>
            {!(
              report.rootIntrusion ||
              report.cracks ||
              report.offsets ||
              report.sagging ||
              report.blockages ||
              report.corrosion ||
              report.greaseDebris
            ) ? (
              <p className="text-sm text-slate-600">
                No defects were recorded for this inspection.
              </p>
            ) : (
              <ul className="list-disc list-inside space-y-1 text-sm">
                {report.rootIntrusion && <li>Root intrusion observed</li>}
                {report.cracks && <li>Cracks observed</li>}
                {report.offsets && <li>Offsets / misalignment observed</li>}
                {report.sagging && <li>Sagging / belly observed</li>}
                {report.blockages && <li>Blockages / obstructions observed</li>}
                {report.corrosion && <li>Corrosion / scaling observed</li>}
                {report.greaseDebris && (
                  <li>Grease / debris accumulation observed</li>
                )}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
