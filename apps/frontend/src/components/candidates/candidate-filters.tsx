import { Filter } from "lucide-react";

export function CandidateFilters() {
  return (
    <div className="flex items-center gap-3">
      <select className="h-10 px-3 py-2 rounded-lg bg-card border border-border text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer text-foreground font-medium">
        <option>All Roles</option>
        <option>Frontend Developer</option>
        <option>Product Manager</option>
        <option>UX Designer</option>
      </select>
      <select className="h-10 px-3 py-2 rounded-lg bg-card border border-border text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer text-foreground font-medium">
        <option>All Stages</option>
        <option>Applied</option>
        <option>Screening</option>
        <option>Interviewing</option>
        <option>Offer Sent</option>
      </select>
      <button className="h-10 px-4 rounded-lg border border-border bg-card shadow-sm hover:bg-muted flex items-center gap-2 text-sm font-medium transition-colors text-foreground">
        <Filter className="h-4 w-4" /> More Filters
      </button>
    </div>
  );
}
