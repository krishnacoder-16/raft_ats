"use client";

import { CandidateTable } from "@/components/candidates/candidate-table";
import { CandidateSearch } from "@/components/candidates/candidate-search";
import { CandidateFilters } from "@/components/candidates/candidate-filters";
import { AddCandidateModal } from "@/components/candidates/add-candidate-modal";
import { CandidateDetailsDrawer } from "@/components/candidates/candidate-details-drawer";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { Candidate } from "@/types/candidate";

const mockCandidates: Candidate[] = [
  { id: "1", name: "Sarah Connor", email: "sarah@example.com", role: "Senior Frontend Engineer", experience: "4 years", recruiter: "John Smith", status: "Interviewing", aiScore: 92, submitted: "Oct 24, 2023", lastActivity: "2 hrs ago" },
  { id: "2", name: "Mike Johnson", email: "mike@example.com", role: "Product Manager", experience: "6 years", recruiter: "Jane Doe", status: "Applied", aiScore: 85, submitted: "Oct 25, 2023", lastActivity: "5 hrs ago" },
  { id: "3", name: "Emily Chen", email: "emily@example.com", role: "UX Designer", experience: "3 years", recruiter: "John Smith", status: "Screening", aiScore: 78, submitted: "Oct 22, 2023", lastActivity: "1 day ago" },
  { id: "4", name: "David Kim", email: "david@example.com", role: "Backend Engineer", experience: "5 years", recruiter: "Jane Doe", status: "Offer Sent", aiScore: 95, submitted: "Oct 15, 2023", lastActivity: "1 day ago" },
  { id: "5", name: "Lisa Wong", email: "lisa@example.com", role: "Data Scientist", experience: "2 years", recruiter: "John Smith", status: "Rejected", aiScore: 45, submitted: "Oct 20, 2023", lastActivity: "3 days ago" },
  { id: "6", name: "James Bond", email: "james@example.com", role: "Security Analyst", experience: "10 years", recruiter: "Jane Doe", status: "Hired", aiScore: 98, submitted: "Oct 10, 2023", lastActivity: "1 week ago" },
  { id: "7", name: "Alice Wonderland", email: "alice@example.com", role: "Frontend Developer", experience: "3 years", recruiter: "John Smith", status: "Interviewing", aiScore: 88, submitted: "Oct 26, 2023", lastActivity: "4 hrs ago" },
];

export default function CandidatesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Candidate Management</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Manage, filter, and review applications across all open roles.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 text-sm font-bold rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Candidate
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex-1 w-full lg:max-w-sm">
          <CandidateSearch />
        </div>
        <div className="w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 hidden-scrollbar">
          <CandidateFilters />
        </div>
      </div>

      <CandidateTable
        data={mockCandidates}
        onRowClick={(candidate) => {
          setSelectedCandidate(candidate);
          setIsDrawerOpen(true);
        }}
      />

      <AddCandidateModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <CandidateDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        candidate={selectedCandidate}
      />
    </div>
  );
}
