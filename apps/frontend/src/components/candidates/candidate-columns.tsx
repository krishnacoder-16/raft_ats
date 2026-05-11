"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "./status-badge";
import { AIScoreBadge } from "./ai-score-badge";
import { CandidateRowActions } from "./candidate-row-actions";

import type { Candidate } from "@/types/candidate";

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: "name",
    header: "Candidate Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-foreground whitespace-nowrap">{row.getValue("name")}</span>
        <span className="text-xs text-muted-foreground">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role Applied",
    cell: ({ row }) => <span className="font-medium text-muted-foreground whitespace-nowrap">{row.getValue("role")}</span>,
  },
  {
    accessorKey: "experience",
    header: "Experience",
    cell: ({ row }) => <span className="text-muted-foreground whitespace-nowrap">{row.getValue("experience")}</span>,
  },
  {
    accessorKey: "status",
    header: "Current Stage",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "aiScore",
    header: "AI Match Score",
    cell: ({ row }) => <AIScoreBadge score={row.getValue("aiScore")} />,
  },
  {
    accessorKey: "recruiter",
    header: "Recruiter",
    cell: ({ row }) => <span className="text-sm font-medium whitespace-nowrap">{row.getValue("recruiter")}</span>,
  },
  {
    accessorKey: "submitted",
    header: "CV Submitted",
    cell: ({ row }) => <span className="text-sm text-muted-foreground whitespace-nowrap">{row.getValue("submitted")}</span>,
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) => <span className="text-sm text-muted-foreground whitespace-nowrap">{row.getValue("lastActivity")}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CandidateRowActions candidate={row.original} />,
  },
];
