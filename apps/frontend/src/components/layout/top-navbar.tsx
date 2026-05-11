"use client";

import { Search, Bell, Sun, User } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";

export function TopNavbar() {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 shrink-0 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <MobileSidebar />
        <div className="relative w-full max-w-md hidden sm:flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search candidates, jobs, or interviews..." 
            className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/60 border-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        <button className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors">
          <Sun className="h-5 w-5" />
        </button>
        <button className="h-10 w-10 relative rounded-full flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-destructive border-2 border-card"></span>
        </button>
        <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-medium cursor-pointer overflow-hidden ml-2 sm:ml-4 shadow-sm">
          <User className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}
