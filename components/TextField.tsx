import type { ChangeEvent } from "react";
import type { BasicReportForm } from "@/lib/types";

const baseInputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm " +
  "text-slate-900 placeholder:text-slate-300 " +
  "focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800";

export type TextFieldProps = {
  name: keyof BasicReportForm;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

export function TextField({
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = true,
}: TextFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700 mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={baseInputClass}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
