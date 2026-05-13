"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Job } from "@/types/job";
import { JobStatusBadge } from "./job-status-badge";
import { RecruiterAssignment } from "./recruiter-assignment";
import { HiringProgress } from "./hiring-progress";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: "Job Title",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-extrabold text-foreground whitespace-nowrap">{row.getValue("title")}</span>
        <span className="text-xs text-muted-foreground mt-1 font-medium">
          {row.original.company} • {row.original.locations?.[0]?.city || "Remote"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <JobStatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const p = row.getValue("priority") as string;
      return (
        <span className={`text-xs font-bold uppercase tracking-wider ${p === 'High' || p === 'Urgent' ? 'text-red-600' : p === 'Medium' ? 'text-amber-600' : 'text-slate-500'}`}>
          {p}
        </span>
      );
    }
  },
  {
    accessorKey: "recruiters",
    header: "Assigned Recruiter",
    cell: ({ row }) => {
      const recruiters = row.original.recruiters || [];
      return <RecruiterAssignment name={recruiters[0] || "Unassigned"} />;
    },
  },
  {
    id: "progress",
    header: "Hiring Progress",
    cell: ({ row }) => (
      <HiringProgress 
        candidates={row.original.totalApplicants || 0} 
        offers={row.original.hiredCount || 0} 
        openings={row.original.openings || 1} 
      />
    ),
  },
  {
    id: "actions",
    cell: () => (
      <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
        <MoreHorizontal className="h-5 w-5" />
      </button>
    )
  }
];
