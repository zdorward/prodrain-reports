"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client"; // ⬅️ updated import

import type { ReportRecord } from "@/lib/types";

export default function ReportsListPage() {
  const [reports, setReports] = useState<ReportRecord[] | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("id, clientName, propertyAddress, inspectionDate, created_at")
        .order("inspectionDate", { ascending: false });

      if (error) {
        console.error("Error fetching reports:", error);
        setReports([]);
        return;
      }

      setReports(data as ReportRecord[]);
    };

    fetchReports();
  }, []);

  if (reports === null) {
    return <p className="text-sm text-slate-600">Loading reports...</p>;
  }

  return (
    <div className=" w-full max-w-3xl min-h-screen bg-slate-100 p-4">
      <div className="mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-slate-800">
          Generated Reports
        </h1>

        {reports.length === 0 ? (
          <p className="text-sm text-slate-600">No reports found.</p>
        ) : (
          <ul className="space-y-3">
            {reports.map((report) => (
              <li
                key={report.id}
                className="border border-slate-200 bg-white shadow-sm rounded-md p-4"
              >
                <div className="text-base font-semibold text-slate-800">
                  {report.clientName}
                </div>
                <div className="text-sm text-slate-600">
                  {report.propertyAddress}
                </div>
                <div className="text-xs text-slate-500">
                  Created:{" "}
                  {new Date(report.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                <div className="mt-2">
                  <Link
                    href={`/reports/${report.id}`}
                    className="text-sm text-slate-800 underline hover:text-slate-900"
                  >
                    View Report
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
