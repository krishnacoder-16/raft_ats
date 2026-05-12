"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "John S.", candidates: 140, offers: 12 },
  { name: "Jane D.", candidates: 210, offers: 18 },
  { name: "Alex A.", candidates: 95, offers: 8 },
  { name: "Sarah C.", candidates: 180, offers: 15 },
];

export function RecruiterPerformanceChart() {
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-foreground">Recruiter Performance</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">Pipeline activity by recruiter</p>
      </div>
      <div className="flex-1 min-h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }} 
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} 
            />
            <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold', fontSize: '12px' }} iconType="circle" />
            <Bar dataKey="candidates" name="Candidates" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="offers" name="Offers" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
