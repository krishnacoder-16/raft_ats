"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", submissions: 12 },
  { name: "Tue", submissions: 19 },
  { name: "Wed", submissions: 15 },
  { name: "Thu", submissions: 25 },
  { name: "Fri", submissions: 22 },
  { name: "Sat", submissions: 8 },
  { name: "Sun", submissions: 5 },
];

export function CVSubmissionChart() {
  return (
    <div className="p-5 md:p-6 rounded-xl bg-card border shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">CV Submissions</h3>
        <p className="text-sm text-muted-foreground">Weekly submission trend</p>
      </div>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Area type="monotone" dataKey="submissions" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorSubmissions)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
