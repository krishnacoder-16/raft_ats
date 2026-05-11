"use client";

import { MoreHorizontal, Pencil, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function PipelineStageMenu({ stageId, stageTitle }: { stageId: string, stageTitle: string }) {
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
    <div className="relative" ref={ref}>
      <button 
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-card border shadow-lg rounded-xl z-50 py-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Pencil className="h-4 w-4" /> Rename Stage
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <ArrowLeft className="h-4 w-4" /> Move Left
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <ArrowRight className="h-4 w-4" /> Move Right
          </button>
          <div className="h-px w-full bg-border my-1" />
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <Trash2 className="h-4 w-4" /> Delete Stage
          </button>
        </div>
      )}
    </div>
  );
}
