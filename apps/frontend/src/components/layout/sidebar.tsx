"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import { SidebarItem } from "./sidebar-item";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  GitBranch,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Candidates", href: "/candidates" },
  { icon: Briefcase, label: "Jobs", href: "/jobs" },
  { icon: GitBranch, label: "Pipeline", href: "/pipeline" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 240 : 80 }}
      className="hidden md:flex flex-col bg-sidebar-background h-screen border-r border-white/10 sticky top-0 z-40 text-sidebar-foreground shadow-xl"
    >
      <div className="flex items-center h-16 px-4 shrink-0 border-b border-white/5">
        <div className={cn("flex items-center gap-3 overflow-hidden", sidebarOpen ? "justify-start" : "justify-center w-full")}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-sm">
            <span className="font-extrabold text-primary-foreground text-lg">R</span>
          </div>
          {sidebarOpen && <span className="font-extrabold text-xl tracking-tight shrink-0 whitespace-nowrap text-white">Raft Global</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1.5 scrollbar-none">
        {navItems.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </div>

      <div className="p-4 border-t border-white/10 flex justify-end shrink-0">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-white/10 text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors w-full flex justify-center"
        >
          {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>
    </motion.aside>
  );
}
