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
        "p-5 rounded-xl bg-card border border-border shadow-sm transition-all hover:shadow-md cursor-pointer h-full",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-3xl font-extrabold tracking-tight text-foreground">{value}</h3>
        {trend && (
          <div className="flex items-center text-sm mt-1">
            <span
              className={cn(
                "font-medium mr-2",
                trend.positive !== false ? "text-emerald-600 dark:text-emerald-500" : "text-destructive"
              )}
            >
              {trend.positive !== false ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground text-xs">{trend.label}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
