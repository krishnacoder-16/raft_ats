import { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <section className="mb-10 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-6 border-b pb-4">
        <h3 className="text-xl font-extrabold tracking-tight text-foreground">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        {children}
      </div>
    </section>
  );
}
