"use client";

import { DashboardHeader } from "./dashboard-header";
import { KPICard } from "./kpi-card";
import { HiringFunnel } from "./hiring-funnel";
import { RecentActivity } from "./recent-activity";
import { Users, Briefcase, CheckSquare, Award, Send, CheckCircle2 } from "lucide-react";

const kpiData = [
  { title: "Total Applicants", value: "2,450", icon: Users, trend: { value: 12, label: "vs last month", positive: true } },
  { title: "Active Jobs", value: "45", icon: Briefcase, trend: { value: 5, label: "vs last month", positive: true } },
  { title: "Closed Jobs", value: "12", icon: CheckSquare },
  { title: "Offer Released", value: "18", icon: Award, trend: { value: 15, label: "vs last month", positive: true } },
  { title: "CV Sent Today", value: "86", icon: Send, trend: { value: 24, label: "vs yesterday", positive: true } },
  { title: "Hired Candidates", value: "14", icon: CheckCircle2, trend: { value: 8, label: "vs last month", positive: false } },
];

export function DashboardGrid() {
  return (
    <div className="flex flex-col gap-8 w-full pb-12">
      <DashboardHeader />
      
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Main Operational Sections */}
      <div className="flex flex-col gap-8">
        <div className="w-full">
          <HiringFunnel />
        </div>
        <div className="w-full">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
