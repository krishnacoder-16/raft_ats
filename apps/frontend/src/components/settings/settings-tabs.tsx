import { cn } from "@/lib/utils";

interface SettingsTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SettingsTabs({ tabs, activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg w-fit mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "px-4 py-1.5 text-sm font-bold rounded-md transition-all whitespace-nowrap",
            activeTab === tab 
              ? "bg-card text-foreground shadow-sm border border-border/50" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
