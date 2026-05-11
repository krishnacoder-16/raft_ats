"use client";

import { DashboardHeader } from "./dashboard-header";
import { KPICard } from "./kpi-card";
import { RecruiterPerformance } from "./recruiter-performance";
import { CVSubmissionChart } from "./cv-submission-chart";
import { HiringFunnel } from "./hiring-funnel";
import { RecentActivity } from "./recent-activity";
import { RecentCandidates } from "./recent-candidates";
import { Users, Briefcase, CheckSquare, Calendar, Award, Send, CheckCircle2, TrendingUp } from "lucide-react";

const kpiData = [
  { title: "Total Applications", value: "2,450", icon: Users, trend: { value: 12, label: "vs last month", positive: true } },
  { title: "Active Jobs", value: "45", icon: Briefcase, trend: { value: 5, label: "vs last month", positive: true } },
  { title: "Closed Jobs", value: "12", icon: CheckSquare },
  { title: "Daily Interviews", value: "28", icon: Calendar, trend: { value: 2, label: "vs yesterday", positive: true } },
  { title: "Offers Released", value: "18", icon: Award, trend: { value: 15, label: "vs last month", positive: true } },
  { title: "CVs Sent Today", value: "86", icon: Send, trend: { value: 24, label: "vs yesterday", positive: true } },
  { title: "Hired Candidates", value: "14", icon: CheckCircle2, trend: { value: 8, label: "vs last month", positive: false } },
  { title: "Offer Acceptance Rate", value: "92%", icon: TrendingUp, trend: { value: 4, label: "vs last quarter", positive: true } },
];

export function DashboardGrid() {
  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      <DashboardHeader />
      
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <CVSubmissionChart />
        </div>
        <div>
          <HiringFunnel />
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecruiterPerformance />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Table Row */}
      <div className="grid grid-cols-1 gap-6">
        <RecentCandidates />
      </div>
    </div>
  );
}
