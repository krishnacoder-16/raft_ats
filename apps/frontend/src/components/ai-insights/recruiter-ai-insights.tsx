"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { subject: 'Sourcing Velocity', A: 85, fullMark: 100 },
  { subject: 'Offer Acceptance', A: 92, fullMark: 100 },
  { subject: 'Diversity Hiring', A: 78, fullMark: 100 },
  { subject: 'Time to Fill', A: 88, fullMark: 100 },
  { subject: 'Pipeline Health', A: 95, fullMark: 100 },
  { subject: 'Candidate Exp', A: 90, fullMark: 100 },
];

export function RecruiterAiInsights() {
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-foreground">Team Performance Matrix</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">AI evaluation of recruitment efficiency</p>
      </div>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="Performance" dataKey="A" stroke="#f97316" fill="#f97316" fillOpacity={0.3} strokeWidth={2} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
