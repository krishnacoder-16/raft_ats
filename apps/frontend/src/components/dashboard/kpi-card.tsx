"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  onClick?: () => void;
  className?: string;
}

export function KPICard({ title, value, icon: Icon, trend, onClick, className }: KPICardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={cn(
        "p-6 rounded-2xl bg-card border border-border shadow-sm transition-all hover:shadow-md cursor-pointer h-full flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">{title}</span>
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/10">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-4xl font-black tracking-tighter text-foreground">{value}</h3>
        {trend && (
          <div className="flex items-center text-[10px] mt-2">
            <div className={cn(
              "flex items-center gap-1 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter",
              trend.positive !== false ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            )}>
              {trend.positive !== false ? "+" : "-"}{Math.abs(trend.value)}%
            </div>
            <span className="text-muted-foreground ml-2 font-bold uppercase tracking-wider">{trend.label}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
