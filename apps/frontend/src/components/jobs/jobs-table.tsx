import { MoreHorizontal, ChevronLeft, ChevronRight, MapPin, Users, Flame } from "lucide-react";
import { Job } from "@/types/job";
import { useJobStore } from "@/features/jobs/store/job-store";

interface JobsTableProps {
  data: Job[];
  totalCount: number;
  onRowClick: (job: Job) => void;
}

export function JobsTable({ data, totalCount, onRowClick }: JobsTableProps) {
  const { pagination, setPagination } = useJobStore();

  const totalPages = Math.ceil(totalCount / pagination.pageSize);
  const startIdx = (pagination.page - 1) * pagination.pageSize + 1;
  const endIdx = Math.min(pagination.page * pagination.pageSize, totalCount);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent": return "text-red-600 bg-red-50 border-red-100";
      case "High": return "text-orange-600 bg-orange-50 border-orange-100";
      case "Medium": return "text-blue-600 bg-blue-50 border-blue-100";
      default: return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  return (
    <div className="w-full bg-card border shadow-sm rounded-xl overflow-hidden">
      <div className="overflow-x-auto hidden-scrollbar">
        <table className="w-full text-left">
          <thead className="bg-muted/20 border-b text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">
            <tr>
              <th className="px-5 py-4">Job Title</th>
              <th className="px-5 py-4">Client Company</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Priority</th>
              <th className="px-5 py-4">Assigned Recruiters</th>
              <th className="px-5 py-4">Hiring Progress</th>
              <th className="px-5 py-4">Locations</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((job) => (
              <tr 
                key={job.id} 
                onClick={() => onRowClick(job)}
                className="hover:bg-muted/30 transition-colors cursor-pointer group"
              >
                <td className="px-5 py-4">
                  <span className="font-bold text-foreground text-sm tracking-tight group-hover:text-primary transition-colors">{job.title}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="font-medium text-muted-foreground text-xs uppercase tracking-wider">{job.company}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    job.status === "Open" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-600 border-slate-100"
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getPriorityColor(job.priority)}`}>
                    {job.priority}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex -space-x-2">
                    {job.recruiters.map((r, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary/10 border-2 border-card flex items-center justify-center text-[10px] font-black text-primary shadow-sm" title={r}>
                        {r[0]}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${(job.hiredCount / job.openings) * 100}%` }} 
                      />
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest">{job.hiredCount}/{job.openings}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.1em]">
                    <MapPin className="h-3 w-3 text-primary/70" />
                    {job.locations.length} {job.locations.length > 1 ? "Locations" : "Location"}
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-all">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-4 border-t bg-muted/5">
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            Showing <span className="text-foreground">{totalCount > 0 ? startIdx : 0}-{endIdx}</span> of <span className="text-foreground">{totalCount}</span> Jobs
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Display</label>
            <select 
              value={pagination.pageSize}
              onChange={(e) => setPagination({ pageSize: parseInt(e.target.value), page: 1 })}
              className="h-8 px-2 rounded-lg border bg-card text-[11px] font-bold focus:outline-none focus:ring-1 focus:ring-primary/20 cursor-pointer"
            >
              {[5, 10, 15, 30].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            Page <span className="text-foreground">{pagination.page}</span> of <span className="text-foreground">{totalPages || 1}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPagination({ page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className="p-1.5 rounded-lg border bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPagination({ page: pagination.page + 1 })}
              disabled={pagination.page >= totalPages}
              className="p-1.5 rounded-lg border bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
