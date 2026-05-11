import { Plus } from "lucide-react";

export function PipelineAddStage() {
  return (
    <div className="w-[320px] shrink-0">
      <button className="w-full h-[54px] rounded-2xl border-2 border-dashed border-border bg-card/50 hover:bg-muted/50 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm">
        <Plus className="h-5 w-5" /> Add Stage
      </button>
    </div>
  );
}
