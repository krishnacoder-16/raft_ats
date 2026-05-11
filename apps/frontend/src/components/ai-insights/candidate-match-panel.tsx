import { AiScoreCard } from "./ai-score-card";

export function CandidateMatchPanel() {
  const matches = [
    {
      candidateName: "Sarah Connor",
      role: "Senior Frontend Engineer",
      score: 94,
      factors: [
        { name: "Exceeds 5+ years React experience", impact: "positive" as const },
        { name: "Strong system design background", impact: "positive" as const },
        { name: "Salary expectations slightly high", impact: "negative" as const },
      ]
    },
    {
      candidateName: "Mike Johnson",
      role: "Product Manager",
      score: 88,
      factors: [
        { name: "Perfect domain expertise match", impact: "positive" as const },
        { name: "Lacks B2B SaaS experience", impact: "negative" as const },
        { name: "Local to target office", impact: "positive" as const },
      ]
    },
    {
      candidateName: "Emily Chen",
      role: "UX Designer",
      score: 91,
      factors: [
        { name: "Portfolio style matches brand", impact: "positive" as const },
        { name: "Available immediately", impact: "positive" as const },
        { name: "Standard design tool proficiency", impact: "neutral" as const },
      ]
    }
  ];

  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-foreground">Top Candidate Matches</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">AI-scored profiles against open JDs</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {matches.map((match, i) => (
          <AiScoreCard key={i} {...match} />
        ))}
      </div>
    </div>
  );
}
