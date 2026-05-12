import { cn } from "@/lib/utils";
import { Building2, Users, KanbanSquare, Bell, Blocks, Palette } from "lucide-react";

export type SettingsTab = "organization" | "users" | "pipeline" | "notifications" | "integrations" | "appearance";

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  const tabs = [
    { id: "organization", label: "Organization", icon: Building2 },
    { id: "users", label: "Users & Roles", icon: Users },
    { id: "pipeline", label: "Pipeline Config", icon: KanbanSquare },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Blocks },
    { id: "appearance", label: "Appearance", icon: Palette },
  ] as const;

  return (
    <nav className="w-full md:w-56 shrink-0 flex flex-col gap-1.5">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-extrabold transition-all w-full text-left",
              isActive 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
