import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

import type { ReportRecord } from "@/lib/types";

export default async function ReportsListPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return (
      <p className="text-sm text-slate-600">
        You need to be logged in to view reports.
      </p>
    );
  }

  const { data, error } = await supabase
    .from("reports")
    .select("id, clientName, propertyAddress, inspectionDate, created_at")
    .order("inspectionDate", { ascending: false });

  if (error) {
    console.error("Error fetching reports:", error);
    return (
      <p className="text-sm text-slate-600">
        There was an error loading your reports.
      </p>
    );
  }

  const reports = (data ?? []) as ReportRecord[];

  return (
    <div className="w-full max-w-3xl min-h-screen bg-slate-100 p-4">
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
