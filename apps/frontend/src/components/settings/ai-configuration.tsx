import { SettingsSection } from "./settings-section";
import { BrainCircuit, SlidersHorizontal, ShieldCheck } from "lucide-react";

export function AiConfiguration() {
  return (
    <SettingsSection title="AI Intelligence Settings" description="Configure predictive models and automation thresholds.">
      <div className="p-6 space-y-8">
        
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-sm border border-primary/20">
            <SlidersHorizontal className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h4 className="text-sm font-extrabold text-foreground">Candidate Match Threshold</h4>
              <p className="text-xs font-medium text-muted-foreground mt-0.5">Minimum score required to flag a candidate as a "Top Match".</p>
            </div>
            <div className="flex items-center gap-4">
              <input type="range" min="50" max="100" defaultValue="85" className="flex-1 accent-primary" />
              <span className="w-14 text-center text-sm font-black text-foreground border rounded-lg py-1.5 shadow-sm bg-card">85%</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-border" />

        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-sm border border-primary/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h4 className="text-sm font-extrabold text-foreground">Auto-Screening Confidence</h4>
              <p className="text-xs font-medium text-muted-foreground mt-0.5">Required AI confidence level to automatically move candidates to screening.</p>
            </div>
            <select className="w-full max-w-xs h-11 px-4 rounded-lg border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm">
              <option>Strict (95%+ Confidence)</option>
              <option selected>Balanced (85%+ Confidence)</option>
              <option>Permissive (75%+ Confidence)</option>
            </select>
          </div>
        </div>

        <div className="h-px bg-border" />

        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-sm border border-primary/20">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-foreground">Generative AI Summaries</h4>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">Enable automatic generation of candidate profile summaries.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
              </label>
            </div>
          </div>
        </div>

      </div>
    </SettingsSection>
  );
}
