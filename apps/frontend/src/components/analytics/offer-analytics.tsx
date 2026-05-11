"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", sent: 12, accepted: 10 },
  { month: "Feb", sent: 18, accepted: 14 },
  { month: "Mar", sent: 24, accepted: 20 },
  { month: "Apr", sent: 15, accepted: 12 },
  { month: "May", sent: 28, accepted: 25 },
  { month: "Jun", sent: 32, accepted: 29 },
];

export function OfferAnalytics() {
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-foreground">Offer Analytics</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">Offers sent vs accepted</p>
      </div>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold' }} />
            <Area type="monotone" dataKey="sent" name="Offers Sent" stroke="#94a3b8" fill="#e2e8f0" strokeWidth={3} />
            <Area type="monotone" dataKey="accepted" name="Accepted" stroke="#10b981" fill="#d1fae5" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
