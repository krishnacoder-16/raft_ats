"use client";

import { MoreHorizontal, FileText, UserCheck, UserX, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Candidate } from "@/types/candidate";

export function CandidateRowActions({ candidate }: { candidate: Candidate }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = candidate;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex justify-end" ref={ref}>
      <button 
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
      
      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-card border shadow-lg rounded-xl z-50 py-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <FileText className="h-4 w-4" /> View Resume
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Calendar className="h-4 w-4" /> Schedule Interview
          </button>
          <div className="h-px w-full bg-border my-1" />
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
            <UserCheck className="h-4 w-4" /> Move to Next Stage
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <UserX className="h-4 w-4" /> Reject
          </button>
        </div>
      )}
    </div>
  );
}
