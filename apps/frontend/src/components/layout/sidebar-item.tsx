"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useAppStore } from "@/store";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  const { sidebarOpen } = useAppStore();

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 transition-all group relative",
        active
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
          : "text-sidebar-foreground/60 hover:bg-white/5 hover:text-sidebar-foreground"
      )}
    >
      <Icon className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
      {sidebarOpen && (
        <span className="text-sm font-bold animate-in fade-in duration-200 tracking-tight">
          {label}
        </span>
      )}
      {!sidebarOpen && (
        <div className="absolute left-full rounded-xl px-3 py-2 ml-4 bg-sidebar-background text-sidebar-foreground text-xs font-bold invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50 whitespace-nowrap border border-white/10 shadow-2xl pointer-events-none tracking-tight">
          {label}
        </div>
      )}
    </Link>
  );
}
