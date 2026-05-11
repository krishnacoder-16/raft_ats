import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  "Scheduled": "bg-blue-100 text-blue-700 border-blue-200",
  "Completed": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Cancelled": "bg-red-100 text-red-700 border-red-200",
  "Pending Feedback": "bg-amber-100 text-amber-700 border-amber-200",
  "Rescheduled": "bg-purple-100 text-purple-700 border-purple-200",
};

export function InterviewStatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn("px-2.5 py-1 text-[11px] font-bold rounded-md border whitespace-nowrap uppercase tracking-wider", statusStyles[status] || "bg-slate-100 text-slate-700", className)}>
      {status}
    </span>
  );
}
