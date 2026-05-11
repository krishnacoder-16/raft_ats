"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Alice", cvs: 40, hires: 5 },
  { name: "Bob", cvs: 30, hires: 3 },
  { name: "Charlie", cvs: 50, hires: 8 },
  { name: "Diana", cvs: 25, hires: 2 },
  { name: "Ethan", cvs: 45, hires: 6 },
];

export function RecruiterPerformance() {
  return (
    <div className="p-5 md:p-6 rounded-xl bg-card border shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Recruiter Performance</h3>
        <p className="text-sm text-muted-foreground">CVs vs Hires by recruiter</p>
      </div>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))" }}
              contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Bar dataKey="cvs" name="CVs Sent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="hires" name="Hires" fill="hsl(var(--primary) / 0.3)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
