"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ScheduleInterviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            className="fixed left-1/2 top-1/2 w-full max-w-2xl bg-card border shadow-2xl rounded-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-xl font-extrabold text-foreground tracking-tight">Schedule Interview</h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh] hidden-scrollbar">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-black uppercase tracking-wider text-foreground">Select Candidate</label>
                  <select className="w-full h-11 px-3 rounded-lg border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                    <option>Sarah Connor - Senior Frontend Engineer</option>
                    <option>Mike Johnson - Product Manager</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-foreground">Interview Round</label>
                  <select className="w-full h-11 px-3 rounded-lg border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                    <option>L1 Technical</option>
                    <option>Culture Fit</option>
                    <option>System Design</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-foreground">Assign Interviewer</label>
                  <select className="w-full h-11 px-3 rounded-lg border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                    <option>Alex Admin</option>
                    <option>Jane Doe</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-foreground">Date</label>
                  <input type="date" className="w-full h-11 px-3 rounded-lg border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-foreground">Time</label>
                  <input type="time" className="w-full h-11 px-3 rounded-lg border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-black uppercase tracking-wider text-foreground">Meeting Link</label>
                  <input type="url" placeholder="https://zoom.us/j/123456" className="w-full h-11 px-3 rounded-lg border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-black uppercase tracking-wider text-foreground">Notes for Interviewer</label>
                  <textarea rows={3} placeholder="Please focus on React performance optimization..." className="w-full p-3 rounded-lg border bg-card text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-muted/30 flex justify-end gap-3">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold rounded-lg bg-card border shadow-sm hover:bg-muted text-foreground transition-colors">
                Cancel
              </button>
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-extrabold rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
                Schedule Interview
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
