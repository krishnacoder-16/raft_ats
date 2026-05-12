import { cn } from "@/lib/utils";

export function AIScoreBadge({ score }: { score: number }) {
  const isHigh = score >= 80;
  const isMedium = score >= 60 && score < 80;

  return (
    <div className="flex items-center gap-3 w-full max-w-[120px]">
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-border/50">
        <div 
          className={cn("h-full rounded-full transition-all", isHigh ? "bg-primary" : isMedium ? "bg-slate-400" : "bg-slate-300")}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-[10px] font-black text-muted-foreground w-8 shrink-0 tracking-tighter">{score}%</span>
    </div>
  );
}
