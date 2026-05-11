"use client";

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { day: "Mon", cvs: 45 },
  { day: "Tue", cvs: 52 },
  { day: "Wed", cvs: 38 },
  { day: "Thu", cvs: 65 },
  { day: "Fri", cvs: 48 },
  { day: "Sat", cvs: 12 },
  { day: "Sun", cvs: 18 },
];

export function CvSubmissionTrend() {
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-foreground">CV Submissions</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">7-day submission velocity</p>
      </div>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCvs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold' }} 
            />
            <Area type="monotone" dataKey="cvs" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorCvs)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
