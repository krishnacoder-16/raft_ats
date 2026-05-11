import { Calendar, Video } from "lucide-react";
import type { Interview } from "@/types/interview";

export function UpcomingInterviews({ interviews }: { interviews: Interview[] }) {
  const upcoming = interviews.filter(i => i.status === "Scheduled").slice(0, 3);

  return (
    <div className="bg-card border rounded-xl shadow-sm p-5 w-full lg:w-[340px] shrink-0 h-fit">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="font-extrabold text-foreground">Upcoming Today</h3>
        </div>
        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-md">{upcoming.length}</span>
      </div>
      
      <div className="space-y-4">
        {upcoming.length > 0 ? upcoming.map(interview => (
          <div key={interview.id} className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors border-l-4 border-l-primary group">
            <div className="flex justify-between items-start mb-2">
              <span className="font-black text-sm text-foreground">{interview.time}</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">{interview.round}</span>
            </div>
            <p className="text-sm font-extrabold text-foreground">{interview.candidateName}</p>
            <p className="text-xs font-bold text-muted-foreground mt-0.5">{interview.role}</p>
            
            <button className="w-full mt-4 py-2 bg-card border text-foreground font-bold text-xs rounded-lg group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all flex items-center justify-center gap-2 shadow-sm">
              <Video className="h-3.5 w-3.5" /> Join Meeting
            </button>
          </div>
        )) : (
          <div className="text-center py-6">
            <p className="text-sm font-bold text-muted-foreground">No upcoming interviews today.</p>
          </div>
        )}
      </div>
    </div>
  );
}
