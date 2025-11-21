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
      <div className="max-w-3xl mx-auto bg-white p-8 border border-slate-300 shadow-sm">
        <header className="mb-8 border-b border-slate-300 pb-4">
          <h1 className="text-3xl font-semibold text-slate-900">
            Drain Inspection Report
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Pro Drain Techs — Formal Inspection Document
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">
            1. Property & Client Information
          </h2>
          <div className="space-y-1 text-slate-700">
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
          </div>
        </section>

        <section className="mb-8 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">
            2. Defects &amp; Observations
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
            <p className="text-slate-700">
              No defects were recorded during this inspection.
            </p>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-slate-700">
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
        </section>

        <section className="mb-8 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">
            3. Findings Summary
          </h2>
          <div className="space-y-2 text-slate-700">
            {!(
              report.rootIntrusion ||
              report.cracks ||
              report.offsets ||
              report.sagging ||
              report.blockages ||
              report.corrosion ||
              report.greaseDebris
            ) ? (
              <p>No issues were observed during this inspection.</p>
            ) : (
              <>
                {report.rootIntrusion && (
                  <p>
                    Root intrusion was detected in sections of the drain line,
                    indicating roots have penetrated joints or defects in the
                    pipe.
                  </p>
                )}
                {report.cracks && (
                  <p>
                    Cracking was observed along portions of the line, which may
                    allow infiltration and can worsen over time if not
                    addressed.
                  </p>
                )}
                {report.offsets && (
                  <p>
                    Offsets or misaligned joints were identified, which can
                    restrict flow and increase the likelihood of blockages.
                  </p>
                )}
                {report.sagging && (
                  <p>
                    Sagging (belly) was present in part of the line, causing
                    standing water and increasing the risk of recurring backups.
                  </p>
                )}
                {report.blockages && (
                  <p>
                    Obstructions or blockages were noted, indicating impaired
                    flow that may require clearing or further investigation.
                  </p>
                )}
                {report.corrosion && (
                  <p>
                    Corrosion or scaling was visible, suggesting deterioration
                    that could lead to reduced pipe diameter or structural
                    weakness.
                  </p>
                )}
                {report.greaseDebris && (
                  <p>
                    Grease or debris accumulation was found, which can restrict
                    flow and contribute to future blockages if not cleaned.
                  </p>
                )}
              </>
            )}
          </div>
        </section>

        {/* <section className="mb-8 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">
            4. General Notes
          </h2>
          <p className="whitespace-pre-line text-slate-700">{report.notes}</p>
        </section> */}

        <footer className="mt-10 border-t border-slate-300 pt-4 text-center text-xs text-slate-500">
          <p>Pro Drain Techs — Confidential Inspection Report</p>
          <p>Generated on {report.inspectionDate}</p>
        </footer>
      </div>
    </main>
  );
}
