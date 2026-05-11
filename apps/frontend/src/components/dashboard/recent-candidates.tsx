import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const candidates = [
  { id: 1, name: "Alice Wonderland", role: "Frontend Developer", status: "Interviewing", score: 92 },
  { id: 2, name: "Bob Builder", role: "Civil Engineer", status: "Offer Sent", score: 88 },
  { id: 3, name: "Charlie Chaplin", role: "Actor", status: "Screening", score: 76 },
  { id: 4, name: "Diana Prince", role: "Security Analyst", status: "Hired", score: 98 },
  { id: 5, name: "Ethan Hunt", role: "Field Agent", status: "Rejected", score: 45 },
];

const statusStyles: Record<string, string> = {
  "Interviewing": "bg-primary/10 text-primary",
  "Offer Sent": "bg-slate-900 text-white",
  "Screening": "bg-slate-100 text-slate-700",
  "Hired": "bg-emerald-100 text-emerald-700",
  "Rejected": "bg-slate-100 text-slate-500",
};

export function RecentCandidates() {
  return (
    <div className="p-5 md:p-6 rounded-xl bg-card border shadow-sm w-full overflow-hidden">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Recent Candidates</h3>
          <p className="text-sm text-muted-foreground">Candidates active in the last 24 hours</p>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
            <tr>
              <th className="px-4 py-3 font-medium rounded-l-lg">Name</th>
              <th className="px-4 py-3 font-medium">Applied Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Match Score</th>
              <th className="px-4 py-3 font-medium rounded-r-lg"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-muted/50 transition-colors group">
                <td className="px-4 py-3.5 font-medium text-foreground whitespace-nowrap">{candidate.name}</td>
                <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">{candidate.role}</td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className={cn("px-2.5 py-1 text-xs font-semibold rounded-full", statusStyles[candidate.status])}>
                    {candidate.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 min-w-[150px]">
                  <div className="flex items-center gap-3">
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full", candidate.score >= 80 ? "bg-primary" : candidate.score >= 60 ? "bg-slate-400" : "bg-slate-200")}
                        style={{ width: `${candidate.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground w-8">{candidate.score}%</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
