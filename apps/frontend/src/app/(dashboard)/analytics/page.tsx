"use client";

import { AnalyticsFilters } from "@/components/analytics/analytics-filters";
import { AnalyticsKpiCards } from "@/components/analytics/analytics-kpi-cards";
import { RecruiterPerformanceChart } from "@/components/analytics/recruiter-performance-chart";
import { HiringFunnelChart } from "@/components/analytics/hiring-funnel-chart";
import { CvSubmissionTrend } from "@/components/analytics/cv-submission-trend";
import { OfferAnalytics } from "@/components/analytics/offer-analytics";
import { SourceBreakdown } from "@/components/analytics/source-breakdown";
import { RecruiterLeaderboard } from "@/components/analytics/recruiter-leaderboard";
import { PipelineBottlenecks } from "@/components/analytics/pipeline-bottlenecks";
import { TimeToHire } from "@/components/analytics/time-to-hire";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Analytics & Reporting</h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">Enterprise hiring intelligence and team performance metrics.</p>
      </div>

      <AnalyticsFilters />
      <AnalyticsKpiCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HiringFunnelChart />
        <RecruiterPerformanceChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CvSubmissionTrend />
        <OfferAnalytics />
        <SourceBreakdown />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RecruiterLeaderboard />
        </div>
        <div className="lg:col-span-1">
          <PipelineBottlenecks />
        </div>
        <div className="lg:col-span-1">
          <TimeToHire />
        </div>
      </div>
    </div>
  );
}
