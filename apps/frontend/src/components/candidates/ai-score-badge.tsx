import { cn } from "@/lib/utils";

export function AIScoreBadge({ score }: { score: number }) {
  const isHigh = score >= 80;
  const isMedium = score >= 60 && score < 80;

  return (
    <div className="flex items-center gap-3 w-full max-w-[120px]">
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all", isHigh ? "bg-primary" : isMedium ? "bg-slate-400" : "bg-slate-200")}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-muted-foreground w-8 shrink-0">{score}%</span>
    </div>
  );
}
