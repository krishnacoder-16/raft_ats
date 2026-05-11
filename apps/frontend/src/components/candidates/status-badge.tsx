import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  "Applied": "bg-slate-100 text-slate-700",
  "Screening": "bg-slate-100 text-slate-700",
  "Interviewing": "bg-primary/10 text-primary",
  "Offer Sent": "bg-slate-900 text-white",
  "Hired": "bg-emerald-100 text-emerald-700",
  "Rejected": "bg-slate-100 text-slate-500",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn("px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap", statusStyles[status] || statusStyles["Applied"], className)}>
      {status}
    </span>
  );
}
