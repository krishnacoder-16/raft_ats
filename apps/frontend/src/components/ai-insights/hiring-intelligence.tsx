"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", predictive: 12, actual: 10 },
  { month: "Feb", predictive: 15, actual: 14 },
  { month: "Mar", predictive: 22, actual: 20 },
  { month: "Apr", predictive: 18, actual: 15 },
  { month: "May", predictive: 25, actual: 28 },
  { month: "Jun", predictive: 30, actual: 32 },
];

export function HiringIntelligence() {
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-foreground">Predictive Hiring Model</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">AI forecast vs actual successful hires</p>
      </div>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold' }} />
            <Line type="monotone" dataKey="predictive" name="AI Forecast" stroke="#94a3b8" strokeWidth={3} strokeDasharray="5 5" dot={false} />
            <Line type="monotone" dataKey="actual" name="Actual Hires" stroke="#0f172a" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
