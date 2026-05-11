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
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all group relative",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-sidebar-foreground/70 hover:bg-white/10 hover:text-sidebar-foreground"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {sidebarOpen && (
        <span className="text-sm font-medium animate-in fade-in duration-200">
          {label}
        </span>
      )}
      {!sidebarOpen && (
        <div className="absolute left-full rounded-md px-2 py-1.5 ml-4 bg-sidebar-background text-sidebar-foreground text-sm font-medium invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50 whitespace-nowrap border border-white/10 shadow-xl pointer-events-none">
          {label}
        </div>
      )}
    </Link>
  );
}
