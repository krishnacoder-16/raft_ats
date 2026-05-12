"use client";

import { CandidateTable } from "@/components/candidates/candidate-table";
import { CandidateSearch } from "@/components/candidates/candidate-search";
import { CandidateFilters } from "@/components/candidates/candidate-filters";
import { CandidateKpiCards } from "@/components/candidates/candidate-kpi-cards";
import { CandidateDetailsDrawer } from "@/components/candidates/candidate-details-drawer";
import { useCandidateStore } from "@/features/candidates/store/candidate-store";
import { Plus, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Candidate } from "@/types/candidate";

export default function CandidatesPage() {
  const router = useRouter();
  const { candidates, searchQuery, filters, pagination, setPagination, setFilters, resetFilters, fetchCandidates, isLoading, error } = useCandidateStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const searchMatch = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.recruiter.toLowerCase().includes(searchQuery.toLowerCase());

      if (!searchMatch) return false;
      if (filters.role !== "All Roles" && c.role !== filters.role) return false;
      if (filters.stage !== "All Stages" && c.stage !== filters.stage) return false;
      if (filters.recruiter !== "All Recruiters" && c.recruiter !== filters.recruiter) return false;
      if (filters.status !== "All Status" && c.status !== filters.status) return false;
      
      const exp = parseInt(c.experience) || 0;
      if (exp < filters.experienceRange[0] || exp > filters.experienceRange[1]) return false;
      if (c.aiScore < filters.aiScoreRange[0] || c.aiScore > filters.aiScoreRange[1]) return false;
      return true;
    });
  }, [candidates, searchQuery, filters]);

  const activeFilterChips = useMemo(() => {
    const chips = [];
    if (filters.role !== "All Roles") chips.push({ label: `Role: ${filters.role}`, key: "role", value: "All Roles" });
    if (filters.stage !== "All Stages") chips.push({ label: `Stage: ${filters.stage}`, key: "stage", value: "All Stages" });
    if (filters.status !== "All Status") chips.push({ label: `Status: ${filters.status}`, key: "status", value: "All Status" });
    if (filters.recruiter !== "All Recruiters") chips.push({ label: `Recruiter: ${filters.recruiter}`, key: "recruiter", value: "All Recruiters" });
    if (filters.experienceRange[0] !== 0 || filters.experienceRange[1] !== 20) {
      chips.push({ label: `Exp: ${filters.experienceRange[0]}-${filters.experienceRange[1]}+`, key: "experienceRange", value: [0, 20] });
    }
    if (filters.aiScoreRange[0] !== 0 || filters.aiScoreRange[1] !== 100) {
      chips.push({ label: `Score: ${filters.aiScoreRange[0]}-${filters.aiScoreRange[1]}%`, key: "aiScoreRange", value: [0, 100] });
    }
    return chips;
  }, [filters]);

  const paginatedCandidates = useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return filteredCandidates.slice(start, start + pagination.pageSize);
  }, [filteredCandidates, pagination]);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Candidate Management</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Manage and track your candidate pipeline with real-time operational insights.</p>
        </div>
        <button
          onClick={() => router.push("/candidates/create")}
          className="px-4 py-2.5 text-sm font-bold rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="h-4 w-4" /> Add Candidate
        </button>
      </div>

      <CandidateKpiCards />

      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
          <div className="flex-1 w-full lg:max-w-sm">
            <CandidateSearch />
          </div>
          <div className="w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 hidden-scrollbar">
            <CandidateFilters />
          </div>
        </div>

        {activeFilterChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 px-1">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-1">Active Filters:</span>
            {activeFilterChips.map((chip) => (
              <div 
                key={chip.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-wider group hover:bg-primary/20 transition-all cursor-default shadow-sm"
              >
                {chip.label}
                <button 
                  onClick={() => setFilters({ [chip.key as any]: chip.value })}
                  className="p-0.5 rounded-md hover:bg-primary/20 text-primary/60 hover:text-primary transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <button 
              onClick={resetFilters}
              className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 ml-2 uppercase tracking-widest"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border shadow-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Loading Candidates...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border shadow-sm">
          <p className="text-sm font-bold text-destructive uppercase tracking-widest">Error Loading Candidates</p>
          <p className="text-xs text-muted-foreground mt-2">{error}</p>
        </div>
      ) : (
        <CandidateTable
          data={paginatedCandidates}
          totalCount={filteredCandidates.length}
          onRowClick={(candidate) => {
            setSelectedCandidate(candidate);
            setIsDrawerOpen(true);
          }}
        />
      )}
      
      <CandidateDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        candidate={selectedCandidate}
      />
    </div>
  );
}
