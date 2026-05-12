"use client";

import { useState } from "react";
import { SettingsSidebar, SettingsTab } from "@/components/settings/settings-sidebar";
import { OrganizationSettings } from "@/components/settings/organization-settings";
import { UserRoleManagement } from "@/components/settings/user-role-management";
import { PipelineSettings } from "@/components/settings/pipeline-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { IntegrationSettings } from "@/components/settings/integration-settings";
import { AppearanceSettings } from "@/components/settings/appearance-settings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("organization");

  const renderContent = () => {
    switch (activeTab) {
      case "organization": return <OrganizationSettings />;
      case "users": return <UserRoleManagement />;
      case "pipeline": return <PipelineSettings />;
      case "notifications": return <NotificationSettings />;
      case "integrations": return <IntegrationSettings />;
      case "appearance": return <AppearanceSettings />;
      default: return <OrganizationSettings />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Workspace Settings</h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">Manage enterprise configurations, access controls, and operational preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start max-w-full overflow-hidden">
        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 w-full min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
