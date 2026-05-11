"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { stage: "Applied", count: 1200 },
  { stage: "Screening", count: 850 },
  { stage: "Interview", count: 420 },
  { stage: "Offer", count: 95 },
  { stage: "Hired", count: 82 },
];

export function HiringFunnelChart() {
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-foreground">Hiring Funnel</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">Conversion rates across stages</p>
      </div>
      <div className="flex-1 min-h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
            <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: '#0f172a' }} />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }} 
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold' }} 
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={36}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#10b981' : '#f97316'} fillOpacity={1 - (index * 0.12)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
