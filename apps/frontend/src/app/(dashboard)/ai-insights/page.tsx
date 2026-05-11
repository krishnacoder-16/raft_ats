"use client";

import { AiFilters } from "@/components/ai-insights/ai-filters";
import { AiKpiCards } from "@/components/ai-insights/ai-kpi-cards";
import { PipelineRiskAnalysis } from "@/components/ai-insights/pipeline-risk-analysis";
import { SmartRecommendations } from "@/components/ai-insights/smart-recommendations";
import { CandidateMatchPanel } from "@/components/ai-insights/candidate-match-panel";
import { RecruiterAiInsights } from "@/components/ai-insights/recruiter-ai-insights";
import { HiringIntelligence } from "@/components/ai-insights/hiring-intelligence";

export default function AiInsightsPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          AI Insights
        </h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">Predictive recruitment intelligence and operational recommendations.</p>
      </div>

      <AiFilters />
      <AiKpiCards />
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <PipelineRiskAnalysis />
        <SmartRecommendations />
      </div>

      <CandidateMatchPanel />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HiringIntelligence />
        <RecruiterAiInsights />
      </div>
    </div>
  );
}
