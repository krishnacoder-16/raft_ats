import { SettingsSection } from "./settings-section";

export function AppearanceSettings() {
  return (
    <SettingsSection title="Appearance" description="Customize the look and feel of your ATS workspace.">
      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <h4 className="text-sm font-extrabold text-foreground">Interface Theme</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="border-2 border-primary rounded-xl p-5 bg-slate-50 cursor-pointer shadow-sm relative transition-all">
              <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full border-[3px] border-white shadow-sm" />
              <div className="space-y-3">
                <div className="w-full h-5 bg-slate-200 rounded-md" />
                <div className="w-3/4 h-5 bg-slate-200 rounded-md" />
              </div>
              <p className="text-xs font-extrabold text-center mt-5 text-slate-700">Light (Raft Global)</p>
            </div>
            <div className="border-2 border-transparent hover:border-muted-foreground/30 rounded-xl p-5 bg-slate-900 cursor-pointer transition-all shadow-sm">
              <div className="space-y-3">
                <div className="w-full h-5 bg-slate-800 rounded-md" />
                <div className="w-3/4 h-5 bg-slate-800 rounded-md" />
              </div>
              <p className="text-xs font-extrabold text-center mt-5 text-slate-300">Dark Mode</p>
            </div>
            <div className="border-2 border-transparent hover:border-muted-foreground/30 rounded-xl p-5 bg-gradient-to-br from-slate-100 to-slate-900 cursor-pointer transition-all shadow-sm">
              <div className="space-y-3">
                <div className="w-full h-5 bg-slate-500/50 rounded-md" />
                <div className="w-3/4 h-5 bg-slate-500/50 rounded-md" />
              </div>
              <p className="text-xs font-extrabold text-center mt-5 text-slate-700">System Sync</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-3">
          <label className="text-sm font-extrabold text-foreground">Primary Accent Color</label>
          <p className="text-xs font-medium text-muted-foreground">Select the primary color for buttons, active states, and charts.</p>
          <div className="flex gap-4 pt-2">
            <button className="w-10 h-10 rounded-full bg-[#F97316] ring-2 ring-offset-2 ring-[#F97316] shadow-sm flex items-center justify-center text-white" title="Raft Orange">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-[#3B82F6] hover:scale-110 transition-transform shadow-sm" title="Blue" />
            <button className="w-10 h-10 rounded-full bg-[#10B981] hover:scale-110 transition-transform shadow-sm" title="Emerald" />
            <button className="w-10 h-10 rounded-full bg-[#8B5CF6] hover:scale-110 transition-transform shadow-sm" title="Purple" />
            <button className="w-10 h-10 rounded-full bg-[#0F172A] hover:scale-110 transition-transform shadow-sm" title="Slate" />
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}
