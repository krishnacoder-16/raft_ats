"use client";

import { Menu, X, LayoutDashboard, Users, Briefcase, GitBranch, CalendarDays, BarChart3, BrainCircuit, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Candidates", href: "/candidates" },
  { icon: Briefcase, label: "Jobs", href: "/jobs" },
  { icon: GitBranch, label: "Pipeline", href: "/pipeline" },
  { icon: CalendarDays, label: "Interviews", href: "/interviews" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: BrainCircuit, label: "AI Insights", href: "/ai-insights" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(true)} className="p-2 -ml-2 text-foreground hover:bg-muted rounded-lg transition-colors">
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-sidebar-background z-50 flex flex-col border-r border-white/10 shadow-2xl text-sidebar-foreground"
            >
              <div className="flex items-center justify-between h-16 px-4 shrink-0 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                    <span className="font-extrabold text-primary-foreground text-lg">R</span>
                  </div>
                  <span className="font-extrabold text-xl tracking-tight text-white">Raft Global</span>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/10 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1.5 scrollbar-none">
                {navItems.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-sidebar-foreground/70 hover:bg-white/10 hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
