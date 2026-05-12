import { Search } from "lucide-react";
import { useCandidateStore } from "@/features/candidates/store/candidate-store";

export function CandidateSearch() {
  const { searchQuery, setSearchQuery } = useCandidateStore();

  return (
    <div className="relative w-full">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input 
        type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search candidates by name, email, or role..." 
        className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all font-bold placeholder:font-medium shadow-sm"
      />
    </div>
  );
}
