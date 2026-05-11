import { Filter, Search, Plus } from "lucide-react";

export function PipelineHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Pipeline Board</h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">Manage candidate progression via drag and drop.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search board..." 
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-card border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
          />
        </div>
        <button className="h-10 px-4 rounded-lg border border-border bg-card shadow-sm hover:bg-muted flex items-center gap-2 text-sm font-bold transition-colors text-foreground">
          <Filter className="h-4 w-4" /> Filters
        </button>
        <button className="px-4 py-2.5 text-sm font-bold rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Candidate
        </button>
      </div>
    </div>
  );
}
