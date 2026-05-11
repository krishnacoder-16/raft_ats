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
        <span className="text-xs text-muted-foreground mt-1 font-medium">{row.original.client} • {row.original.location}</span>
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
        <span className={`text-xs font-bold uppercase tracking-wider ${p === 'High' ? 'text-red-600' : p === 'Medium' ? 'text-amber-600' : 'text-slate-500'}`}>
          {p}
        </span>
      );
    }
  },
  {
    accessorKey: "recruiter",
    header: "Assigned Recruiter",
    cell: ({ row }) => <RecruiterAssignment name={row.getValue("recruiter")} />,
  },
  {
    id: "progress",
    header: "Hiring Progress",
    cell: ({ row }) => (
      <HiringProgress 
        candidates={row.original.candidateCount} 
        offers={row.original.offersCount} 
        openings={row.original.openings} 
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
