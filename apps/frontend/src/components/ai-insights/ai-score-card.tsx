import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AiScoreCardProps {
  score: number;
  candidateName: string;
  role: string;
  factors: { name: string; impact: "positive" | "negative" | "neutral" }[];
}

export function AiScoreCard({ score, candidateName, role, factors }: AiScoreCardProps) {
  return (
    <div className="p-5 rounded-xl border bg-muted/20 hover:bg-muted/40 transition-colors shadow-sm">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h4 className="text-sm font-extrabold text-foreground">{candidateName}</h4>
          <p className="text-xs font-bold text-muted-foreground mt-0.5">{role}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md text-primary font-bold text-xs">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{score}% Match</span>
        </div>
      </div>
      
      <div className="space-y-2.5">
        <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-3">Key Factors</p>
        {factors.map((factor, i) => (
          <div key={i} className="flex items-start gap-2.5 text-xs font-bold">
            <span className={cn(
              "w-2 h-2 rounded-full shrink-0 mt-1",
              factor.impact === "positive" ? "bg-emerald-500" : 
              factor.impact === "negative" ? "bg-red-500" : "bg-slate-400"
            )} />
            <span className="text-slate-600 leading-tight">{factor.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
