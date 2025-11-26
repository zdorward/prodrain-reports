import type { DefectKey } from "@/lib/types";

export const defectNotes: Record<DefectKey, string> = {
  rootIntrusion:
    "Root intrusion was detected in sections of the drain line, indicating roots have penetrated joints or defects in the pipe.",
  cracks:
    "Cracking was observed along portions of the line, which may allow infiltration and can worsen over time if not addressed.",
  offsets:
    "Offsets or misaligned joints were identified, which can restrict flow and increase the likelihood of blockages.",
  sagging:
    "Sagging (belly) was present in part of the line, causing standing water and increasing the risk of recurring backups.",
  blockages:
    "Obstructions or blockages were noted, indicating impaired flow that may require clearing or further investigation.",
  corrosion:
    "Corrosion or scaling was visible, suggesting deterioration that could lead to reduced pipe diameter or structural weakness.",
  greaseDebris:
    "Grease or debris accumulation was found, which can restrict flow and contribute to future blockages if not cleaned.",
};
