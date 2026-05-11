"use client";

import { Users, FileCheck, CalendarCheck, Award } from "lucide-react";

const funnelData = [
  { stage: "Applied", count: 1240, percentage: 100, icon: Users, color: "bg-slate-100 text-slate-700" },
  { stage: "Screening", count: 850, percentage: 68, icon: FileCheck, color: "bg-slate-100 text-slate-700" },
  { stage: "Interview", count: 320, percentage: 26, icon: CalendarCheck, color: "bg-primary/10 text-primary" },
  { stage: "Hired", count: 45, percentage: 3.6, icon: Award, color: "bg-slate-900 text-white" },
];

export function HiringFunnel() {
  return (
    <div className="p-5 md:p-6 rounded-xl bg-card border shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">Hiring Funnel</h3>
        <p className="text-sm text-muted-foreground">Conversion rates across stages</p>
      </div>
      <div className="space-y-5 flex-1 flex flex-col justify-center">
        {funnelData.map((item) => (
          <div key={item.stage} className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm text-foreground">{item.stage}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold text-sm text-foreground">{item.count}</span>
                <span className="text-xs font-medium text-muted-foreground">{item.percentage}%</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
