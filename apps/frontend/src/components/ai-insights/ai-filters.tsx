import { Filter, Sparkles, SlidersHorizontal } from "lucide-react";

export function AiFilters() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-card p-4 rounded-xl border shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-72">
          <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <select className="w-full h-10 pl-10 pr-4 rounded-lg bg-card border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none shadow-sm transition-all">
            <option>All Intelligence Models</option>
            <option>Candidate Match Scoring</option>
            <option>Pipeline Risk Detection</option>
            <option>Recruiter Productivity</option>
          </select>
        </div>
        <button className="h-10 px-4 w-full sm:w-auto rounded-lg border bg-card shadow-sm hover:bg-muted flex items-center justify-center gap-2 text-sm font-bold text-foreground transition-colors shrink-0">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>
      <button className="h-10 px-5 w-full sm:w-auto rounded-lg bg-card border shadow-sm hover:bg-muted flex items-center justify-center gap-2 text-sm font-extrabold transition-colors text-foreground">
        <SlidersHorizontal className="h-4 w-4" /> Configure AI Thresholds
      </button>
    </div>
  );
}
