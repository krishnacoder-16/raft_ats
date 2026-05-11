import { CheckCircle2, FileText, UserPlus, Calendar } from "lucide-react";

const activities = [
  { id: 1, type: "offer", content: "Offer accepted by Sarah Connor", time: "2 hours ago", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 p-2 rounded-lg" },
  { id: 2, type: "interview", content: "Interview scheduled with John Doe", time: "4 hours ago", icon: Calendar, color: "text-primary bg-primary/10 p-2 rounded-lg" },
  { id: 3, type: "candidate", content: "Mike Johnson applied for Product Manager", time: "5 hours ago", icon: UserPlus, color: "text-slate-700 bg-slate-100 p-2 rounded-lg" },
  { id: 4, type: "review", content: "Feedback submitted for Emily Chen", time: "1 day ago", icon: FileText, color: "text-slate-700 bg-slate-100 p-2 rounded-lg" },
];

export function RecentActivity() {
  return (
    <div className="p-5 md:p-6 rounded-xl bg-card border shadow-sm h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest actions across teams</p>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">View all</button>
      </div>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className={`mt-0.5 flex items-center justify-center ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{activity.content}</span>
              <span className="text-xs text-muted-foreground mt-1">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
