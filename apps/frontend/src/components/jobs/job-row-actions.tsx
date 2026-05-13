"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit, Trash2, Check, X } from "lucide-react";
import { Job } from "@/types/job";
import { useJobStore } from "@/features/jobs/store/job-store";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";

interface JobRowActionsProps {
  job: Job;
}

export function JobRowActions({ job }: JobRowActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { deleteJob } = useJobStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    const success = await deleteJob(job.id);
    setIsDeleting(false);
    if (success) {
      setShowConfirm(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        type="button"
        onClick={(e) => { 
          e.preventDefault();
          e.stopPropagation(); 
          setOpen(!open); 
        }}
        className={cn(
          "p-2 rounded-lg transition-all border",
          open ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "hover:bg-muted text-muted-foreground border-transparent"
        )}
      >
        < MoreHorizontal className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-2 w-48 bg-card border shadow-xl rounded-xl z-50 py-1.5 overflow-hidden"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          >
            <button
              type="button"
              className="w-full px-4 py-2 text-left text-xs font-bold text-foreground hover:bg-muted flex items-center gap-3 transition-colors uppercase tracking-widest"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/jobs/create?edit=${job.id}`);
                setOpen(false);
              }}
            >
              <Edit className="h-3.5 w-3.5 text-blue-500" />
              Edit Job
            </button>
            
            <div className="h-px bg-border my-1" />
            
            <button
              type="button"
              className="w-full px-4 py-2 text-left text-xs font-bold text-destructive hover:bg-destructive/5 flex items-center gap-3 transition-colors uppercase tracking-widest"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowConfirm(true);
                setOpen(false);
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete Job
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-card border border-border shadow-2xl rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                  <Trash2 className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-lg font-black tracking-tight text-foreground uppercase tracking-widest">Delete Job?</h3>
                <p className="text-sm font-medium text-muted-foreground mt-2 leading-relaxed">
                  Are you sure you want to delete <span className="text-foreground font-bold">{job.title}</span>? This action cannot be undone.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl border bg-card hover:bg-muted transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl bg-destructive text-destructive-foreground shadow-lg shadow-destructive/20 hover:bg-destructive/90 transition-all disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete Job"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
