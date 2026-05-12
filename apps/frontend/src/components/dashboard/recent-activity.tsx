import { CheckCircle2, FileText, UserPlus, Send, XCircle } from "lucide-react";

const activities = [
  { id: 1, type: "offer", content: "Offer accepted by Sarah Connor", time: "2 hours ago", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100" },
  { id: 2, type: "candidate", content: "Mike Johnson applied for Senior Backend Role", time: "4 hours ago", icon: UserPlus, color: "text-blue-600 bg-blue-50 p-2.5 rounded-xl border border-blue-100" },
  { id: 3, type: "review", content: "Feedback submitted for Emily Chen", time: "5 hours ago", icon: FileText, color: "text-slate-600 bg-slate-100 p-2.5 rounded-xl border border-slate-200" },
  { id: 4, type: "send", content: "CV sent to Stark Industries for DevOps Role", time: "1 day ago", icon: Send, color: "text-primary bg-primary/10 p-2.5 rounded-xl border border-primary/20" },
  { id: 5, type: "reject", content: "Candidate David Kim rejected after Final Round", time: "1 day ago", icon: XCircle, color: "text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-100" },
  { id: 6, type: "candidate", content: "Alice Wonderland moved to Interview stage", time: "2 days ago", icon: UserPlus, color: "text-blue-600 bg-blue-50 p-2.5 rounded-xl border border-blue-100" },
];

export function RecentActivity() {
  return (
    <div className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-sm flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black tracking-tight text-foreground uppercase">Recent Activity</h3>
          <p className="text-sm font-medium text-muted-foreground mt-1">Real-time operational log</p>
        </div>
        <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline px-4 py-2 bg-primary/5 rounded-lg transition-all">View Full Logs</button>
      </div>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-5 group items-start">
            <div className={`flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform ${activity.color}`}>
              <activity.icon className="h-5 w-5" />
            </div>
            <div className="flex flex-col flex-1 border-b border-border/50 pb-4 group-last:border-0">
              <span className="text-sm font-extrabold text-foreground leading-snug group-hover:text-primary transition-colors cursor-pointer">{activity.content}</span>
              <span className="text-[10px] font-black text-muted-foreground mt-1.5 uppercase tracking-wider">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
