// app/reports/[id]/page.tsx

/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { ReportDraft } from "@/lib/types";

export default function ReportPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [report, setReport] = useState<ReportDraft | null | undefined>(
    undefined
  );

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  useEffect(() => {
    if (!id) {
      setReport(null);
      return;
    }

    const fetchReport = async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error loading report from Supabase:", error);
        setReport(null);
        return;
      }

      if (!data) {
        setReport(null);
        return;
      }

      setReport(data as ReportDraft);
    };

    fetchReport();
  }, [id]);

  if (report === undefined) {
    return (
      <main className="p-6">
        <p className="text-slate-700">Loading report…</p>
      </main>
    );
  }

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

  return (
    <main className="bg-slate-50 print:bg-white p-6 print:p-0 flex flex-col gap-6">
      <div className="print-area mx-auto max-w-3xl bg-white p-8 border border-slate-300 shadow-sm print:border-0 print:shadow-none print:max-w-none">
        <div className="print-content">
          <header className="mb-8 border-b border-slate-300 pb-4 print:break-inside-avoid">
            <h1 className="text-3xl font-semibold text-slate-900">
              Drain Inspection Report
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Pro Drain Techs – Formal Inspection Document
            </p>
          </header>

          <section className="mb-8 print:break-inside-avoid">
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

          <section className="mb-8 border-t border-slate-200 pt-6 print:break-inside-avoid">
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

          <section className="mb-6 border-t border-slate-200 pt-6 print:break-inside-avoid">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              3. Findings Summary
            </h2>
            <div className="space-y-2 text-slate-700 whitespace-pre-line">
              {report.notes && report.notes.trim().length > 0 ? (
                <p>{report.notes}</p>
              ) : !(
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
                <p>
                  Findings summary is unavailable for this report, but defects
                  are listed above.
                </p>
              )}
            </div>
          </section>
        </div>

        <footer className="border-t border-slate-300 pt-4 text-center text-xs text-slate-500 print:break-inside-avoid">
          <p>Pro Drain Techs – Confidential Inspection Report</p>
          <p>Generated on {report.inspectionDate}</p>
        </footer>
      </div>

      <div className="flex justify-center print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="cursor-pointer inline-flex items-center justify-center rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
        >
          Print Report
        </button>
      </div>
    </main>
  );
}
