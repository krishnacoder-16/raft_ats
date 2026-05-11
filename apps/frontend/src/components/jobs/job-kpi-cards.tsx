import { Briefcase, CheckCircle2, AlertCircle, Users } from "lucide-react";

export function JobKpiCards() {
  const kpis = [
    { title: "Active Requisitions", value: "24", icon: Briefcase, color: "text-primary", bg: "bg-primary/10" },
    { title: "High Priority", value: "7", icon: AlertCircle, color: "text-red-600", bg: "bg-red-100/60 border border-red-200" },
    { title: "Hired This Month", value: "12", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100/60 border border-emerald-200" },
    { title: "Candidates in Pipe", value: "342", icon: Users, color: "text-blue-600", bg: "bg-blue-100/60 border border-blue-200" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, i) => (
        <div key={i} className="bg-card border rounded-xl p-5 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.color}`}>
            <kpi.icon className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground tracking-tight">{kpi.title}</p>
            <h3 className="text-3xl font-black text-foreground mt-0.5">{kpi.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
