"use client";

import { useState } from "react";
import { JobKpiCards } from "@/components/jobs/job-kpi-cards";
import { JobsFilters } from "@/components/jobs/jobs-filters";
import { JobsTable } from "@/components/jobs/jobs-table";
import { CreateJobModal } from "@/components/jobs/create-job-modal";
import { JobDetailsDrawer } from "@/components/jobs/job-details-drawer";
import type { Job } from "@/types/job";

const mockJobs: Job[] = [
  { id: "1", title: "Senior Frontend Engineer", client: "Stark Industries", department: "Engineering", location: "Remote, US", recruiter: "Jane Doe", openings: 2, status: "Active", priority: "High", experience: "5+ years", candidateCount: 45, offersCount: 1, postedDate: "Oct 10, 2023" },
  { id: "2", title: "Product Manager", client: "Acme Corp", department: "Product", location: "New York, NY", recruiter: "John Smith", openings: 1, status: "Active", priority: "Medium", experience: "4+ years", candidateCount: 28, offersCount: 0, postedDate: "Oct 15, 2023" },
  { id: "3", title: "UX Designer", client: "Wayne Enterprises", department: "Design", location: "Gotham, NJ", recruiter: "Jane Doe", openings: 3, status: "Draft", priority: "Low", experience: "3+ years", candidateCount: 0, offersCount: 0, postedDate: "Oct 28, 2023" },
  { id: "4", title: "Backend Developer", client: "Stark Industries", department: "Engineering", location: "Remote, US", recruiter: "John Smith", openings: 2, status: "On Hold", priority: "Medium", experience: "4+ years", candidateCount: 65, offersCount: 2, postedDate: "Sep 20, 2023" },
  { id: "5", title: "Data Scientist", client: "LexCorp", department: "Data", location: "Metropolis, NY", recruiter: "Jane Doe", openings: 1, status: "Closed", priority: "High", experience: "6+ years", candidateCount: 120, offersCount: 1, postedDate: "Aug 15, 2023" },
];

export default function JobsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Jobs Management</h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">Manage active requisitions, pipeline velocity, and recruiter assignments.</p>
      </div>

      <JobKpiCards />
      <JobsFilters onAddJob={() => setIsCreateModalOpen(true)} />
      
      <JobsTable 
        data={mockJobs} 
        onRowClick={(job) => {
          setSelectedJob(job);
          setIsDrawerOpen(true);
        }} 
      />

      <CreateJobModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <JobDetailsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} job={selectedJob} />
    </div>
  );
}
