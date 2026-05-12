import { SettingsSection } from "./settings-section";

export function IntegrationSettings() {
  const integrations = [
    { name: "Google Workspace", desc: "Sync calendar and organization tools.", status: "Connected", icon: "G" },
    { name: "Zoom", desc: "Video conferencing for team meetings.", status: "Connect", icon: "Z" },
    { name: "LinkedIn Recruiter", desc: "Import candidates directly from LinkedIn.", status: "Connected", icon: "in" },
    { name: "Slack", desc: "Send hiring alerts to Slack channels.", status: "Connect", icon: "S" },
  ];

  return (
    <SettingsSection title="Integrations" description="Connect external tools to your ATS workflow.">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {integrations.map((integration, i) => (
          <div key={i} className="flex items-center justify-between p-5 border rounded-xl bg-card hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center font-black text-foreground text-xl shrink-0 border shadow-sm group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {integration.icon}
              </div>
              <div>
                <p className="font-extrabold text-sm text-foreground">{integration.name}</p>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">{integration.desc}</p>
              </div>
            </div>
            <button className={`px-4 py-2 text-xs font-extrabold rounded-lg shadow-sm transition-colors ${
              integration.status === "Connected" 
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" 
                : "bg-card border hover:bg-muted text-foreground"
            }`}>
              {integration.status}
            </button>
          </div>
        ))}
      </div>
    </SettingsSection>
  );
}
