"use client";

import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PipelineCard } from "./pipeline-card";
import { PipelineStageMenu } from "./pipeline-stage-menu";
import { PipelineEmptyState } from "./pipeline-empty-state";
import type { Candidate } from "@/types/candidate";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineColumnProps {
  id: string;
  title: string;
  candidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
  isOverlay?: boolean;
}

export function PipelineColumn({ id, title, candidates, onCandidateClick, isOverlay }: PipelineColumnProps) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "Column",
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
        className="flex flex-col w-[320px] shrink-0 h-[400px] bg-muted/50 rounded-2xl border-2 border-dashed border-primary/40 opacity-50" 
      />
    );
  }

  return (
    <div 
      ref={!isOverlay ? setNodeRef : undefined}
      style={!isOverlay ? style : undefined}
      className={cn(
        "flex flex-col w-[320px] shrink-0 bg-muted/40 rounded-2xl border max-h-full",
        isOverlay && "rotate-2 shadow-2xl ring-2 ring-primary border-primary bg-card/90 backdrop-blur-sm"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b bg-card rounded-t-2xl sticky top-0 z-10 group">
        <div className="flex items-center gap-2">
          <div 
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-muted-foreground hover:text-foreground opacity-50 hover:opacity-100 transition-opacity"
          >
            <GripVertical className="h-4 w-4" />
          </div>
          <h3 className="font-extrabold text-sm text-foreground tracking-tight">{title}</h3>
          <span className="bg-muted text-muted-foreground text-xs font-bold px-2 py-0.5 rounded-full ml-1">
            {candidates.length}
          </span>
        </div>
        <PipelineStageMenu stageId={id} stageTitle={title} />
      </div>

      <div className="flex-1 p-3 flex flex-col gap-3 min-h-[150px] overflow-y-auto hidden-scrollbar transition-colors">
        <SortableContext items={candidates.map(c => c.id)} strategy={verticalListSortingStrategy}>
          {candidates.map(candidate => (
            <PipelineCard 
              key={candidate.id} 
              candidate={candidate} 
              onClick={onCandidateClick} 
            />
          ))}
        </SortableContext>
        {candidates.length === 0 && <PipelineEmptyState />}
      </div>
    </div>
  );
}
