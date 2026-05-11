"use client";

import { useState } from "react";
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { PipelineColumn } from "./pipeline-column";
import { PipelineCard } from "./pipeline-card";
import { PipelineAddStage } from "./pipeline-add-stage";
import type { Candidate } from "@/types/candidate";
import type { PipelineStage } from "@/types/pipeline";

interface PipelineBoardProps {
  initialStages: PipelineStage[];
  initialCandidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
}

export function PipelineBoard({ initialStages, initialCandidates, onCandidateClick }: PipelineBoardProps) {
  const [stages, setStages] = useState<PipelineStage[]>(initialStages);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);
  const [activeColumn, setActiveColumn] = useState<PipelineStage | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getCandidatesByStage = (stageId: string) => {
    return candidates.filter(c => c.status === stageId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const isColumn = active.data.current?.type === "Column";
    const isCandidate = active.data.current?.type === "Candidate";

    if (isColumn) {
      setActiveColumn(stages.find(s => s.id === active.id) || null);
    } else if (isCandidate) {
      setActiveCandidate(candidates.find(c => c.id === active.id) || null);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveCandidate = active.data.current?.type === "Candidate";
    const isOverCandidate = over.data.current?.type === "Candidate";
    const isOverColumn = over.data.current?.type === "Column";

    if (!isActiveCandidate) return;

    setCandidates(prev => {
      const activeItems = [...prev];
      const activeIndex = activeItems.findIndex(c => c.id === activeId);
      
      if (isOverCandidate) {
        const overIndex = activeItems.findIndex(c => c.id === overId);
        if (activeItems[activeIndex].status !== activeItems[overIndex].status) {
          activeItems[activeIndex] = {
            ...activeItems[activeIndex],
            status: activeItems[overIndex].status
          };
          return arrayMove(activeItems, activeIndex, overIndex);
        }
        return arrayMove(activeItems, activeIndex, overIndex);
      }

      if (isOverColumn) {
        activeItems[activeIndex] = {
          ...activeItems[activeIndex],
          status: overId as string
        };
        return arrayMove(activeItems, activeIndex, activeItems.length - 1);
      }

      return prev;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCandidate(null);
    setActiveColumn(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveColumn = active.data.current?.type === "Column";
    if (isActiveColumn) {
      setStages(prev => {
        const activeIndex = prev.findIndex(s => s.id === activeId);
        const overIndex = prev.findIndex(s => s.id === overId);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: { opacity: "0.5" },
      },
    }),
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full gap-6 overflow-x-auto pb-4 pt-2 px-1 hidden-scrollbar items-start">
        <SortableContext items={stages.map(s => s.id)} strategy={horizontalListSortingStrategy}>
          {stages.map(stage => (
            <PipelineColumn 
              key={stage.id} 
              id={stage.id} 
              title={stage.title} 
              candidates={getCandidatesByStage(stage.id)} 
              onCandidateClick={onCandidateClick}
            />
          ))}
        </SortableContext>
        <PipelineAddStage />
      </div>
      
      <DragOverlay dropAnimation={dropAnimation}>
        {activeColumn ? (
          <PipelineColumn 
            id={activeColumn.id} 
            title={activeColumn.title} 
            candidates={getCandidatesByStage(activeColumn.id)} 
            onCandidateClick={() => {}}
            isOverlay
          />
        ) : activeCandidate ? (
          <PipelineCard 
            candidate={activeCandidate} 
            onClick={() => {}} 
            isOverlay 
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
