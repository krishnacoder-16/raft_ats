import { Sparkles, BrainCircuit, ShieldAlert, Target } from "lucide-react";

export function AiKpiCards() {
  const kpis = [
    { title: "Avg AI Match Score", value: "84%", trend: "+2.1%", icon: Target, color: "text-primary", bg: "bg-primary/10" },
    { title: "Time Saved by AI", value: "14 hrs", trend: "+4.5%", icon: BrainCircuit, color: "text-emerald-600", bg: "bg-emerald-100/60 border border-emerald-200" },
    { title: "Risk Detections", value: "3", trend: "-1", icon: ShieldAlert, color: "text-red-600", bg: "bg-red-100/60 border border-red-200" },
    { title: "Auto-Screened", value: "1,240", trend: "+12.4%", icon: Sparkles, color: "text-blue-600", bg: "bg-blue-100/60 border border-blue-200" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, i) => (
        <div key={i} className="bg-card border rounded-xl p-5 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.color}`}>
            <kpi.icon className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-xs font-black text-muted-foreground uppercase tracking-wider">{kpi.title}</p>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-foreground">{kpi.value}</h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-md border border-emerald-200">{kpi.trend}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
