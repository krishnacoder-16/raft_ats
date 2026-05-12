"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { stage: "Screening", days: 2 },
  { stage: "Interview", days: 9 },
  { stage: "Take Home Task", days: 8 },
  { stage: "Offer Review", days: 3 },
];

export function PipelineBottlenecks() {
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-foreground">Pipeline Bottlenecks</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">Average days spent per stage</p>
      </div>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
            <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: '#0f172a' }} />
            <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold' }} />
            <Bar dataKey="days" name="Avg Days" fill="#f87171" radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
