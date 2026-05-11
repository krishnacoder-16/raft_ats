import { SettingsSection } from "./settings-section";
import { Upload } from "lucide-react";

export function OrganizationSettings() {
  return (
    <SettingsSection title="Organization Details" description="Manage your company's profile and core preferences.">
      <div className="p-6 space-y-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-muted border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
            <div className="text-center">
              <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
              <span className="text-[10px] font-black text-muted-foreground uppercase">Logo</span>
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-extrabold text-foreground">Company Logo</h4>
            <p className="text-xs font-medium text-muted-foreground">Recommended size: 256x256px. Max file size: 2MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-foreground">Company Name</label>
            <input type="text" defaultValue="Raft Global" className="w-full h-11 px-4 rounded-lg border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-foreground">Workspace URL</label>
            <input type="text" defaultValue="raftglobal.ats.com" className="w-full h-11 px-4 rounded-lg border bg-muted text-muted-foreground text-sm font-bold cursor-not-allowed shadow-sm" disabled />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-foreground">Industry</label>
            <select className="w-full h-11 px-4 rounded-lg border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
              <option>Technology</option>
              <option>Finance</option>
              <option>Consulting</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-foreground">Default Timezone</label>
            <select className="w-full h-11 px-4 rounded-lg border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC+0 (London)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex justify-end border-t mt-4">
          <button className="px-6 py-2.5 mt-4 bg-primary text-primary-foreground font-extrabold text-sm rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </SettingsSection>
  );
}
