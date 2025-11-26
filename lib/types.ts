export type BasicReportForm = {
  clientName: string;
  propertyAddress: string;
  inspectionDate: string;
  inspectorName: string;
  notes: string;

  //defects
  rootIntrusion: boolean;
  cracks: boolean;
  offsets: boolean;
  sagging: boolean;
  blockages: boolean;
  corrosion: boolean;
  greaseDebris: boolean;
};

export type ReportRecord = BasicReportForm & {
  id: string;
  notes: string;
  created_at: string;
};
