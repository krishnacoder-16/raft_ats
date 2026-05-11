import { AiInsightCard } from "./ai-insight-card";

export function SmartRecommendations() {
  const recommendations = [
    {
      title: "Optimal Interview Scheduling",
      description: "Jane Doe has 3 technical interviews back-to-back on Thursday. Candidate performance drops by 22% in 3rd consecutive interviews. Recommend rescheduling one to Friday.",
      level: "info" as const,
      confidence: 85,
      actionText: "Reschedule Interview"
    },
    {
      title: "Job Description Optimization",
      description: "The 'UX Designer' requisition is receiving 40% fewer female applicants than industry average. Recommended removing hyper-competitive language to improve diversity.",
      level: "success" as const,
      confidence: 91,
      actionText: "Apply Inclusive Language"
    },
    {
      title: "Untapped Talent Pool",
      description: "Your database has 14 'Silver Medalist' candidates from past Senior Engineering roles who match the new 'Tech Lead' requisition perfectly.",
      level: "success" as const,
      confidence: 96,
      actionText: "View 14 Candidates"
    }
  ];

  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-foreground">Smart Recommendations</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">Operational suggestions to improve hiring</p>
      </div>
      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <AiInsightCard key={i} {...rec} />
        ))}
      </div>
    </div>
  );
}
