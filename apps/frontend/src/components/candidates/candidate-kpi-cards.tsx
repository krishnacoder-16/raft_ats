"use client";

import { Users, UserPlus, UserCheck, Clock } from "lucide-react";
import { useCandidateStore } from "@/features/candidates/store/candidate-store";

export function CandidateKpiCards() {
  const { candidates } = useCandidateStore();

  const kpis = [
    {
      label: "Total Pipeline",
      value: candidates.length,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Shortlisted",
      value: candidates.filter(c => c.stage === "Shortlisted").length,
      icon: UserPlus,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Interviewing",
      value: candidates.filter(c => (c.stage ?? "").includes("Round")).length,
      icon: Clock,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Hired Status",
      value: candidates.filter(c => c.status === "Hired").length,
      icon: UserCheck,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-card p-5 rounded-xl border shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className={`p-3 rounded-xl ${kpi.bg}`}>
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
