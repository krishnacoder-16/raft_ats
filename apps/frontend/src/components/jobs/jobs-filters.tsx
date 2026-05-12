import { Search, Plus } from "lucide-react";
import { useJobStore } from "@/features/jobs/store/job-store";
import { useRouter } from "next/navigation";

export function JobsFilters() {
  const { searchQuery, setSearchQuery, filters, setFilters } = useJobStore();
  const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
      <div className="flex-1 w-full lg:max-w-xs relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search jobs or companies..." 
          className="w-full h-10 pl-10 pr-3 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all font-bold placeholder:font-medium"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        <select 
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value })}
          className="h-10 px-3 py-1 rounded-lg bg-card border border-border text-[11px] font-black uppercase tracking-[0.1em] shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer"
        >
          <option>All Status</option>
          <option>Open</option>
          <option>Closed</option>
          <option>Paused</option>
          <option>Draft</option>
        </select>

        <select 
          value={filters.priority}
          onChange={(e) => setFilters({ priority: e.target.value })}
          className="h-10 px-3 py-1 rounded-lg bg-card border border-border text-[11px] font-black uppercase tracking-[0.1em] shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer"
        >
          <option>All Priority</option>
          <option>Urgent</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button
          onClick={() => router.push("/jobs/create")}
          className="ml-auto h-10 px-4 py-1 text-sm font-bold rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus className="h-4 w-4" /> Create Job
        </button>
      </div>
    </div>
  );
}
