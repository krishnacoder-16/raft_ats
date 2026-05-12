import { Briefcase, Users, Flame, UserCheck } from "lucide-react";

export function JobKpiCards() {
  const kpis = [
    { label: "Job Requisitions", value: "24", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Candidates in Pipe", value: "1,284", icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Priority Breakdown", value: "12 High", icon: Flame, color: "text-red-600", bg: "bg-red-50" },
    { label: "Hired This Month", value: "8", icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-card p-5 rounded-xl border shadow-sm flex items-center gap-4 transition-all hover:shadow-md group cursor-default">
          <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${kpi.bg}`}>
            <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
          </div>
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">{kpi.label}</p>
            <p className="text-2xl font-black text-foreground mt-2 tracking-tight">{kpi.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
