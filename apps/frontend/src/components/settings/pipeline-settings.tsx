import { SettingsSection } from "./settings-section";
import { GripVertical, Plus } from "lucide-react";

export function PipelineSettings() {
  const stages = [
    { name: "Applied", color: "bg-slate-500" },
    { name: "Screening", color: "bg-blue-500" },
    { name: "Interview", color: "bg-purple-500" },
    { name: "Offer Review", color: "bg-amber-500" },
    { name: "Hired", color: "bg-emerald-500" },
  ];

  return (
    <SettingsSection title="Pipeline Configuration" description="Customize default hiring stages and Kanban structure.">
      <div className="p-6">
        <div className="space-y-3 mb-6">
          {stages.map((stage, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-card border rounded-lg shadow-sm group">
              <div className="cursor-grab text-muted-foreground hover:text-foreground p-1">
                <GripVertical className="h-4 w-4" />
              </div>
              <div className={`w-3.5 h-3.5 rounded-full ${stage.color} shadow-sm`} />
              <input 
                type="text" 
                defaultValue={stage.name} 
                className="flex-1 h-8 px-2 bg-transparent text-sm font-bold focus:outline-none focus:border-b border-primary transition-colors"
              />
              <button className="text-xs font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity px-2">Remove</button>
            </div>
          ))}
        </div>
        
        <button className="w-full h-12 border-2 border-dashed border-muted-foreground/30 rounded-lg text-sm font-bold text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" /> Add Pipeline Stage
        </button>

        <div className="pt-6 mt-8 border-t flex justify-end">
          <button className="px-6 py-2.5 bg-primary text-primary-foreground font-extrabold text-sm rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
            Save Pipeline Structure
          </button>
        </div>
      </div>
    </SettingsSection>
  );
}
