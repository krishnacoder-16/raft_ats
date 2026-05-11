"use client";

import { X, Calendar, Clock, Video, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Interview } from "@/types/interview";
import { InterviewStatusBadge } from "./interview-status-badge";
import { FeedbackStatus } from "./feedback-status";

interface InterviewDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  interview: Interview | null;
}

export function InterviewDetailsDrawer({ isOpen, onClose, interview }: InterviewDetailsDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && interview && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-card z-50 flex flex-col border-l shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-extrabold text-foreground tracking-tight">Interview Details</h2>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto hidden-scrollbar p-6 space-y-8">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-foreground mb-1">{interview.candidateName}</h1>
                <p className="text-muted-foreground font-bold mb-4">{interview.role}</p>
                <div className="flex gap-2 mb-6">
                  <InterviewStatusBadge status={interview.status} />
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-5 border">
                <h3 className="text-xs font-black text-foreground mb-4 uppercase tracking-wider">Schedule Info</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5 text-muted-foreground">
                      <Calendar className="h-4 w-4" /> <span className="text-sm font-bold">Date</span>
                    </div>
                    <span className="font-extrabold text-sm">{interview.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5 text-muted-foreground">
                      <Clock className="h-4 w-4" /> <span className="text-sm font-bold">Time</span>
                    </div>
                    <span className="font-extrabold text-sm">{interview.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5 text-muted-foreground">
                      <User className="h-4 w-4" /> <span className="text-sm font-bold">Interviewer</span>
                    </div>
                    <span className="font-extrabold text-sm">{interview.interviewer}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black text-foreground mb-4 uppercase tracking-wider">Feedback Status</h3>
                <div className="p-4 border rounded-xl bg-card flex justify-between items-center">
                  <span className="text-sm font-bold">{interview.round}</span>
                  <FeedbackStatus status={interview.feedbackStatus} />
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t bg-muted/30 space-y-3">
              <button className="w-full py-3 bg-primary text-primary-foreground font-extrabold rounded-lg shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Video className="h-4 w-4" /> Join Meeting
              </button>
              <button className="w-full py-3 bg-card border text-foreground font-extrabold rounded-lg shadow-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
                Submit Feedback
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
