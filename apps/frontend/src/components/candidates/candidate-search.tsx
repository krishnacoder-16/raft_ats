import { Search } from "lucide-react";

export function CandidateSearch() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input 
        type="text" 
        placeholder="Search candidates by name, email, or role..." 
        className="w-full h-10 pl-10 pr-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
      />
    </div>
  );
}
