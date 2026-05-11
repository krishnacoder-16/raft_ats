"use client";

import { PipelineHeader } from "@/components/pipeline/pipeline-header";
import { PipelineBoard } from "@/components/pipeline/pipeline-board";
import { CandidateDetailsDrawer } from "@/components/candidates/candidate-details-drawer";
import { useState } from "react";
import type { Candidate } from "@/types/candidate";
import type { PipelineStage } from "@/types/pipeline";

const mockStages: PipelineStage[] = [
  { id: "applied", title: "Applied", order: 1 },
  { id: "shortlisted", title: "Shortlisted", order: 2 },
  { id: "scheduled", title: "Scheduled", order: 3 },
  { id: "l1", title: "L1 Interview", order: 4 },
  { id: "l2", title: "L2 Interview", order: 5 },
  { id: "final", title: "Final Interview", order: 6 },
  { id: "offered", title: "Offer Sent", order: 7 },
  { id: "hired", title: "Hired", order: 8 },
];

const mockCandidates: Candidate[] = [
  { id: "1", name: "Sarah Connor", email: "sarah@example.com", role: "Senior Frontend Engineer", experience: "4 yrs", recruiter: "John Smith", status: "l1", aiScore: 92, submitted: "Oct 24", lastActivity: "2 hrs ago" },
  { id: "2", name: "Mike Johnson", email: "mike@example.com", role: "Product Manager", experience: "6 yrs", recruiter: "Jane Doe", status: "applied", aiScore: 85, submitted: "Oct 25", lastActivity: "5 hrs ago" },
  { id: "3", name: "Emily Chen", email: "emily@example.com", role: "UX Designer", experience: "3 yrs", recruiter: "John Smith", status: "shortlisted", aiScore: 78, submitted: "Oct 22", lastActivity: "1 day ago" },
  { id: "4", name: "David Kim", email: "david@example.com", role: "Backend Engineer", experience: "5 yrs", recruiter: "Jane Doe", status: "offered", aiScore: 95, submitted: "Oct 15", lastActivity: "1 day ago" },
  { id: "5", name: "Lisa Wong", email: "lisa@example.com", role: "Data Scientist", experience: "2 yrs", recruiter: "John Smith", status: "applied", aiScore: 82, submitted: "Oct 20", lastActivity: "3 days ago" },
  { id: "6", name: "James Bond", email: "james@example.com", role: "Security Analyst", experience: "10 yrs", recruiter: "Jane Doe", status: "hired", aiScore: 98, submitted: "Oct 10", lastActivity: "1 week ago" },
  { id: "7", name: "Alice Wonderland", email: "alice@example.com", role: "Frontend Developer", experience: "3 yrs", recruiter: "John Smith", status: "scheduled", aiScore: 88, submitted: "Oct 26", lastActivity: "4 hrs ago" },
  { id: "8", name: "Bob Builder", email: "bob@example.com", role: "DevOps Engineer", experience: "8 yrs", recruiter: "Jane Doe", status: "l2", aiScore: 91, submitted: "Oct 12", lastActivity: "2 days ago" },
];

export default function PipelinePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <PipelineHeader />
      <div className="flex-1 overflow-hidden mt-2">
        <PipelineBoard 
          initialStages={mockStages} 
          initialCandidates={mockCandidates} 
          onCandidateClick={handleCandidateClick} 
        />
      </div>

      <CandidateDetailsDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        candidate={selectedCandidate}
      />
    </div>
  );
}
