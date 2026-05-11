import { Search, Filter, Plus } from "lucide-react";

export function JobsFilters({ onAddJob }: { onAddJob: () => void }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-card p-4 rounded-xl border shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
        <div className="relative flex-1 w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search roles, clients..." 
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-card border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
          />
        </div>
        <select className="h-10 px-3 rounded-lg border bg-card text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm w-full sm:w-auto">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Draft</option>
          <option>On Hold</option>
        </select>
        <button className="h-10 px-4 w-full sm:w-auto rounded-lg border border-border bg-card shadow-sm hover:bg-muted flex items-center justify-center gap-2 text-sm font-bold text-foreground transition-colors shrink-0">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>
      
      <button 
        onClick={onAddJob}
        className="h-10 px-5 w-full lg:w-auto rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 flex items-center justify-center gap-2 text-sm font-bold transition-colors"
      >
        <Plus className="h-4 w-4" /> Create New Job
      </button>
    </div>
  );
}
