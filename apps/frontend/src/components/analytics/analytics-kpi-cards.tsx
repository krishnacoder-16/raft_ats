import { TrendingUp, Users, CheckCircle2, Clock } from "lucide-react";

export function AnalyticsKpiCards() {
  const kpis = [
    { title: "Total Hires", value: "124", trend: "+12.5%", isUp: true, icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10" },
    { title: "Time to Hire", value: "18 Days", trend: "-2.4%", isUp: true, icon: Clock, color: "text-emerald-600", bg: "bg-emerald-100/60 border border-emerald-200" },
    { title: "Offer Acceptance", value: "92%", trend: "+4.1%", isUp: true, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-100/60 border border-blue-200" },
    { title: "Total Candidates", value: "3,492", trend: "+18.2%", isUp: true, icon: Users, color: "text-purple-600", bg: "bg-purple-100/60 border border-purple-200" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, i) => (
        <div key={i} className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.color}`}>
              <kpi.icon className="h-6 w-6" />
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-md ${kpi.isUp ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {kpi.trend}
            </span>
          </div>
          <p className="text-xs font-black text-muted-foreground uppercase tracking-wider">{kpi.title}</p>
          <h3 className="text-3xl font-black text-foreground mt-1">{kpi.value}</h3>
        </div>
      ))}
    </div>
  );
}
