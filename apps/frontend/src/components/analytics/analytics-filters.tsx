import { Calendar, Download, Filter } from "lucide-react";

export function AnalyticsFilters() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-card p-4 rounded-xl border shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-48">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select className="w-full h-10 pl-9 pr-4 rounded-lg bg-card border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none shadow-sm transition-all">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
        </div>
        <button className="h-10 px-4 w-full sm:w-auto rounded-lg border bg-card shadow-sm hover:bg-muted flex items-center justify-center gap-2 text-sm font-bold text-foreground transition-colors shrink-0">
          <Filter className="h-4 w-4" /> More Filters
        </button>
      </div>
      <button className="h-10 px-5 w-full sm:w-auto rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 flex items-center justify-center gap-2 text-sm font-extrabold transition-colors">
        <Download className="h-4 w-4" /> Export Report
      </button>
    </div>
  );
}
