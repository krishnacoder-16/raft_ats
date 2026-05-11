import { AlertTriangle, CheckCircle2, Info, Lightbulb } from "lucide-react";

type InsightLevel = "critical" | "warning" | "success" | "info";

interface AiInsightCardProps {
  title: string;
  description: string;
  level: InsightLevel;
  confidence: number;
  actionText?: string;
}

export function AiInsightCard({ title, description, level, confidence, actionText }: AiInsightCardProps) {
  const getLevelStyles = () => {
    switch (level) {
      case "critical": return { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100/60 border border-red-200" };
      case "warning": return { icon: Lightbulb, color: "text-amber-600", bg: "bg-amber-100/60 border border-amber-200" };
      case "success": return { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100/60 border border-emerald-200" };
      case "info": return { icon: Info, color: "text-blue-600", bg: "bg-blue-100/60 border border-blue-200" };
    }
  };

  const style = getLevelStyles();
  const Icon = style.icon;

  return (
    <div className="p-5 rounded-xl border bg-card hover:bg-muted/30 transition-colors group">
      <div className="flex gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style.bg} ${style.color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1.5">
            <h4 className="text-sm font-extrabold text-foreground">{title}</h4>
            <span className="text-[10px] font-bold text-muted-foreground bg-muted border px-2 py-0.5 rounded-md">
              {confidence}% Confidence
            </span>
          </div>
          <p className="text-xs font-medium text-muted-foreground leading-relaxed mb-3">{description}</p>
          {actionText && (
            <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
              {actionText} &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
