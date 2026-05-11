"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Interview } from "@/types/interview";
import { InterviewStatusBadge } from "./interview-status-badge";
import { FeedbackStatus } from "./feedback-status";
import { MoreHorizontal, Video } from "lucide-react";

export const columns: ColumnDef<Interview>[] = [
  {
    accessorKey: "candidateName",
    header: "Candidate & Role",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-extrabold text-foreground">{row.getValue("candidateName")}</span>
        <span className="text-xs text-muted-foreground mt-1 font-medium">{row.original.role}</span>
      </div>
    ),
  },
  {
    accessorKey: "round",
    header: "Interview Round",
    cell: ({ row }) => (
      <span className="font-bold text-sm text-foreground">{row.getValue("round")}</span>
    ),
  },
  {
    accessorKey: "interviewer",
    header: "Interviewer",
    cell: ({ row }) => (
      <span className="font-bold text-sm text-muted-foreground">{row.getValue("interviewer")}</span>
    ),
  },
  {
    id: "schedule",
    header: "Date & Time",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-extrabold text-foreground text-sm">{row.original.date}</span>
        <span className="text-xs text-muted-foreground mt-1 font-bold">{row.original.time}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <InterviewStatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "feedbackStatus",
    header: "Feedback",
    cell: ({ row }) => <FeedbackStatus status={row.getValue("feedbackStatus")} />,
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex items-center gap-2">
        <button className="p-1.5 rounded-md hover:bg-primary/10 text-primary transition-colors" title="Join Meeting">
          <Video className="h-4 w-4" />
        </button>
        <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    )
  }
];
