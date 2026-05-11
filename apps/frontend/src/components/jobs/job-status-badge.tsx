import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  "Active": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Draft": "bg-slate-100 text-slate-700 border-slate-200",
  "On Hold": "bg-amber-100 text-amber-800 border-amber-200",
  "Closed": "bg-red-100 text-red-800 border-red-200",
};

export function JobStatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn("px-2.5 py-1 text-xs font-bold rounded-md border whitespace-nowrap", statusStyles[status] || statusStyles["Draft"], className)}>
      {status}
    </span>
  );
}
