export const defectKeys = [
  "rootIntrusion",
  "cracks",
  "offsets",
  "sagging",
  "blockages",
  "corrosion",
  "greaseDebris",
] as const;

export type BasicReportForm = {
  clientName: string;
  propertyAddress: string;
  inspectionDate: string;
  inspectorName: string;
  notes: string;
} & Record<DefectKey, boolean>;

export type DefectKey = (typeof defectKeys)[number];

export type ReportDraft = BasicReportForm & { id: string };

export type ReportRecord = BasicReportForm & {
  id: string;
  created_at: string;
};
