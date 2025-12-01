"use client";

import { useCallback } from "react";
import { Printer } from "lucide-react";
import type { ReportDraft } from "@/lib/types";
import { Button } from "@/components/ui/button";

type Props = {
  report: ReportDraft;
};

export function ReportViewClient({ report }: Props) {
  const handlePrint = useCallback(() => {
    if (typeof window !== "undefined") {
      window.print();
    }
  }, []);

  const hasDefects =
    report.rootIntrusion ||
    report.cracks ||
    report.offsets ||
    report.sagging ||
    report.blockages ||
    report.corrosion ||
    report.greaseDebris;

  return (
    <main className="flex flex-col items-center gap-6 py-8 px-4 bg-slate-100 min-h-screen print:bg-white print:p-0">
      {/* Paper Document */}
      <div className="w-full max-w-[8.5in] bg-white shadow-xl print:shadow-none">
        {/* Header Band */}
        <div className="bg-slate-800 text-white px-10 py-6 print:bg-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Pro Drain Techs
              </h1>
              <p className="text-slate-300 text-sm mt-0.5">
                Professional Drainage Solutions
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Official Document
              </p>
              <p className="text-lg font-semibold">Inspection Report</p>
            </div>
          </div>
        </div>

        {/* Document Body */}
        <div className="px-10 py-8">
          {/* Report Title */}
          <div className="border-b-2 border-slate-200 pb-4 mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Drain Inspection Report
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Formal inspection document • Reference #
              {report.inspectionDate?.replace(/-/g, "")}
            </p>
          </div>

          {/* Section 1: Property & Client Information */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                Property & Client Information
              </h3>
            </div>
            <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Client Name
                  </p>
                  <p className="font-medium text-slate-800">
                    {report.clientName || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Inspector
                  </p>
                  <p className="font-medium text-slate-800">
                    {report.inspectorName || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Property Address
                  </p>
                  <p className="font-medium text-slate-800">
                    {report.propertyAddress || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Inspection Date
                  </p>
                  <p className="font-medium text-slate-800">
                    {report.inspectionDate || "—"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Defects & Observations */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                Defects & Observations
              </h3>
            </div>
            {!hasDefects ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-emerald-800 font-medium">
                    No defects were recorded during this inspection.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                <div className="grid grid-cols-2 gap-3">
                  {report.rootIntrusion && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-slate-700">Root intrusion</span>
                    </div>
                  )}
                  {report.cracks && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-slate-700">Cracks observed</span>
                    </div>
                  )}
                  {report.offsets && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-slate-700">
                        Offsets / misalignment
                      </span>
                    </div>
                  )}
                  {report.sagging && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-slate-700">Sagging / belly</span>
                    </div>
                  )}
                  {report.blockages && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-slate-700">
                        Blockages / obstructions
                      </span>
                    </div>
                  )}
                  {report.corrosion && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-slate-700">
                        Corrosion / scaling
                      </span>
                    </div>
                  )}
                  {report.greaseDebris && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-slate-700">
                        Grease / debris accumulation
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Section 3: Findings Summary */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                Findings Summary
              </h3>
            </div>
            <div className="border border-slate-200 rounded-lg p-5">
              <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                {report.notes && report.notes.trim().length > 0 ? (
                  <p>{report.notes}</p>
                ) : !hasDefects ? (
                  <p className="text-slate-500 italic">
                    No issues were observed during this inspection. The drainage
                    system appears to be in good working condition.
                  </p>
                ) : (
                  <p className="text-slate-500 italic">
                    Findings summary is unavailable for this report. Please
                    refer to the defects listed above for details.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-10 py-5 bg-slate-50">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <div>
              <p className="font-medium text-slate-700">Pro Drain Techs</p>
              <p>Confidential Inspection Report</p>
            </div>
            <div className="text-right">
              <p>Generated on {report.inspectionDate}</p>
              <p className="text-xs text-slate-400 mt-1">Page 1 of 1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="print:hidden">
        <Button onClick={handlePrint} size="lg" className="gap-2">
          <Printer className="w-4 h-4" />
          Print Report
        </Button>
      </div>
    </main>
  );
}
