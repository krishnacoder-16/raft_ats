"use client";

import { useState, useMemo, useEffect } from "react";
import { JobKpiCards } from "@/components/jobs/job-kpi-cards";
import { JobsFilters } from "@/components/jobs/jobs-filters";
import { JobsTable } from "@/components/jobs/jobs-table";
import { JobDetailsDrawer } from "@/components/jobs/job-details-drawer";
import { useJobStore } from "@/features/jobs/store/job-store";
import type { Job } from "@/types/job";

export default function JobsPage() {
  const { jobs, searchQuery, filters, pagination, fetchJobs, isLoading, error } = useJobStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchMatch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());

      if (!searchMatch) return false;
      if (filters.status !== "All Status" && job.status !== filters.status) return false;
      if (filters.priority !== "All Priority" && job.priority !== filters.priority) return false;
      return true;
    });
  }, [jobs, searchQuery, filters]);

  const paginatedJobs = useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return filteredJobs.slice(start, start + pagination.pageSize);
  }, [filteredJobs, pagination]);

  return (
    <div className="space-y-6 pb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Jobs Management</h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">Manage active requisitions, pipeline velocity, and recruiter assignments.</p>
      </div>

      <JobKpiCards />
      
      <div className="space-y-6">
        <JobsFilters />
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border shadow-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Loading Jobs...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border shadow-sm">
            <p className="text-sm font-bold text-destructive uppercase tracking-widest">Error Loading Jobs</p>
            <p className="text-xs text-muted-foreground mt-2">{error}</p>
          </div>
        ) : (
          <JobsTable 
            data={paginatedJobs} 
            totalCount={filteredJobs.length}
            onRowClick={(job) => {
              setSelectedJob(job);
              setIsDrawerOpen(true);
            }} 
          />
        )}
      </div>

      <JobDetailsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} job={selectedJob} />
    </div>
  );
}
