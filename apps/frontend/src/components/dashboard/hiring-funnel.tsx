"use client";

import { Users, FileCheck, CalendarCheck, Award, TrendingUp } from "lucide-react";

const funnelData = [
  { stage: "Applied", count: 1240, percentage: 100, icon: Users, color: "bg-slate-100 text-slate-700" },
  { stage: "Screening", count: 850, percentage: 68, icon: FileCheck, color: "bg-slate-100 text-slate-700" },
  { stage: "Interview", count: 320, percentage: 26, icon: CalendarCheck, color: "bg-primary/10 text-primary" },
  { stage: "Hired", count: 45, percentage: 3.6, icon: Award, color: "bg-slate-900 text-white" },
];

export function HiringFunnel() {
  return (
    <div className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-sm flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black tracking-tight text-foreground uppercase">Hiring Funnel</h3>
          <p className="text-sm font-medium text-muted-foreground mt-1">Conversion velocity and candidate throughput</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
          <TrendingUp className="h-3 w-3" />
          <span>+4.2% Efficiency</span>
        </div>
      </div>
      
      <div className="space-y-8">
        {funnelData.map((item) => (
          <div key={item.stage} className="relative group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-extrabold text-sm text-foreground uppercase tracking-wider">{item.stage}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-muted-foreground">{item.count} Candidates</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-black text-lg text-foreground">{item.percentage}%</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase">Conversion</span>
              </div>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
