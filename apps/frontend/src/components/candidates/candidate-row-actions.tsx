"use client";

import { MoreHorizontal, FileText, UserCheck, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Candidate } from "@/types/candidate";
import { useCandidateStore } from "@/features/candidates/store/candidate-store";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ConfirmationModal({ isOpen, onClose, onConfirm, title, description, confirmText, isDeleting }: any) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }} 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-card border border-border shadow-2xl rounded-2xl p-8"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <h2 className="text-lg font-black tracking-tight text-foreground">{title}</h2>
          <p className="text-sm font-medium text-muted-foreground mt-3 leading-relaxed">{description}</p>
          <div className="mt-8 flex items-center justify-end gap-3">
            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }} className="px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl border bg-card hover:bg-muted transition-all">
              Cancel
            </button>
            <button 
              type="button"
              disabled={isDeleting}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onConfirm(); }}
              className="px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function CandidateRowActions({ candidate }: { candidate: Candidate }) {
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { fetchCandidates } = useCandidateStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/candidates/${candidate.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchCandidates();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative flex justify-end" ref={ref}>
      <button 
        type="button"
        onClick={(e) => { 
          e.preventDefault();
          e.stopPropagation(); 
          setOpen(!open); 
        }}
        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
      
      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-card border shadow-lg rounded-xl z-50 py-1 overflow-hidden" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <FileText className="h-4 w-4" /> View Resume
          </button>
          <div className="h-px w-full bg-border my-1" />
          <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
            <UserCheck className="h-4 w-4" /> Move to Next Stage
          </button>
          <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowDeleteModal(true); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <Trash2 className="h-4 w-4" /> Delete Candidate
          </button>
        </div>
      )}

      <ConfirmationModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Candidate?"
        description="Are you sure you want to delete this candidate? This action cannot be undone."
        confirmText="Delete"
        isDeleting={isDeleting}
      />
    </div>
  );
}
