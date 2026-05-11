import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export function FeedbackStatus({ status }: { status: string }) {
  if (status === "Submitted") {
    return (
      <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
        <CheckCircle2 className="h-3.5 w-3.5" /> Submitted
      </div>
    );
  }
  if (status === "Action Required") {
    return (
      <div className="flex items-center gap-1.5 text-red-600 font-bold text-xs">
        <AlertCircle className="h-3.5 w-3.5" /> Action Req
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs">
      <Clock className="h-3.5 w-3.5" /> Pending
    </div>
  );
}
