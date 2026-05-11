import { cn } from "@/lib/utils";

export function HiringProgress({ candidates, offers, openings }: { candidates: number, offers: number, openings: number }) {
  const percent = Math.min(100, Math.round((offers / openings) * 100));
  return (
    <div className="flex flex-col gap-1.5 w-full min-w-[140px]">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">{candidates} in pipe</span>
        <span className="font-bold text-foreground">{offers}/{openings} Hired</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all", percent === 100 ? "bg-emerald-500" : "bg-primary")}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
