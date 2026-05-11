import { AiInsightCard } from "./ai-insight-card";

export function PipelineRiskAnalysis() {
  const risks = [
    {
      title: "Senior Backend Role At Risk",
      description: "Candidate volume dropped 45% this week. Current pipeline will likely not meet the target hire date of Nov 15. Consider expanding sourcing to remote candidates.",
      level: "critical" as const,
      confidence: 94,
      actionText: "Review Sourcing Strategy"
    },
    {
      title: "High Offer Rejection Probability",
      description: "Candidate 'David Kim' has a 78% probability of rejecting the current compensation band based on historical market data for 5+ years experience in NY.",
      level: "warning" as const,
      confidence: 78,
      actionText: "Adjust Compensation Band"
    },
    {
      title: "Interview Process Bottleneck",
      description: "The 'Take Home Task' stage is currently averaging 8 days, causing top 10% candidates to drop out. Recommend shortening the task or moving to live technical screening.",
      level: "warning" as const,
      confidence: 88,
      actionText: "View Stage Analytics"
    }
  ];

  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-foreground">Pipeline Risk Detection</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">AI-identified threats to hiring velocity</p>
      </div>
      <div className="space-y-4">
        {risks.map((risk, i) => (
          <AiInsightCard key={i} {...risk} />
        ))}
      </div>
    </div>
  );
}
