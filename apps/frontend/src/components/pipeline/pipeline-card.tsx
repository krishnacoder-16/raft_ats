"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreHorizontal, Sparkles } from "lucide-react";
import type { Candidate } from "@/types/candidate";
import { cn } from "@/lib/utils";

interface PipelineCardProps {
  candidate: Candidate;
  onClick: (candidate: Candidate) => void;
  isOverlay?: boolean;
}

export function PipelineCard({ candidate, onClick, isOverlay }: PipelineCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: candidate.id,
    data: {
      type: "Candidate",
      candidate,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging && !isOverlay) {
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className="h-[128px] w-full rounded-xl bg-muted/50 border-2 border-dashed border-primary/40 opacity-50" 
      />
    );
  }

  return (
    <div
      ref={!isOverlay ? setNodeRef : undefined}
      style={!isOverlay ? style : undefined}
      {...(!isOverlay ? attributes : {})}
      {...(!isOverlay ? listeners : {})}
      onClick={() => onClick(candidate)}
      className={cn(
        "p-4 bg-card border rounded-xl shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group",
        isOverlay && "rotate-3 scale-105 shadow-xl ring-2 ring-primary border-primary"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
            <span className="font-extrabold text-sm text-primary">{candidate.name.charAt(0)}</span>
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-foreground leading-none">{candidate.name}</h4>
            <p className="text-xs text-muted-foreground mt-1 font-medium">{candidate.role}</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-3 border-t">
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className={cn(candidate.aiScore >= 80 ? "text-primary" : "text-muted-foreground")}>{candidate.aiScore}% Match</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">{candidate.experience}</span>
          <span className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md font-bold">{candidate.recruiter.split(" ")[0]}</span>
        </div>
      </div>
    </div>
  );
}
