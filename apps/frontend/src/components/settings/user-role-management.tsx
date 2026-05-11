"use client";

import { useState } from "react";
import { SettingsSection } from "./settings-section";
import { SettingsTabs } from "./settings-tabs";
import { MoreHorizontal, Plus } from "lucide-react";

export function UserRoleManagement() {
  const [activeTab, setActiveTab] = useState("Active Users");

  const users = [
    { name: "Alex Admin", email: "alex@raft.com", role: "Admin", status: "Active" },
    { name: "Sarah Connor", email: "sarah@raft.com", role: "Senior Recruiter", status: "Active" },
    { name: "John Smith", email: "john@raft.com", role: "Hiring Manager", status: "Invited" },
    { name: "Jane Doe", email: "jane@raft.com", role: "Sourcer", status: "Deactivated" },
  ];

  return (
    <SettingsSection title="Users & Roles" description="Manage team access, roles, and permissions across your workspace.">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <SettingsTabs tabs={["Active Users", "Pending Invites", "Roles & Permissions"]} activeTab={activeTab} onTabChange={setActiveTab} />
          <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 flex items-center gap-2 text-sm font-extrabold transition-colors">
            <Plus className="h-4 w-4" /> Invite User
          </button>
        </div>

        <div className="border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b text-xs text-muted-foreground uppercase font-extrabold tracking-wider">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-foreground">{user.name}</p>
                        <p className="text-xs font-medium text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <select className="h-8 px-2 rounded-md border bg-card text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary/50 shadow-sm cursor-pointer">
                      <option selected>{user.role}</option>
                      <option>Admin</option>
                      <option>Recruiter</option>
                      <option>Hiring Manager</option>
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      user.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                      user.status === "Invited" ? "bg-amber-100 text-amber-700" :
                      "bg-slate-100 text-slate-700"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors shadow-sm border border-transparent hover:border-border bg-card">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SettingsSection>
  );
}
