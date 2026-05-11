"use client";

import { X, User, Briefcase, Mail, Phone, Calendar, Download, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StatusBadge } from "./status-badge";
import { AIScoreBadge } from "./ai-score-badge";
import type { Candidate } from "@/types/candidate";

interface CandidateDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
}

export function CandidateDetailsDrawer({ isOpen, onClose, candidate }: CandidateDetailsDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && candidate && (
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
            className="fixed inset-y-0 right-0 w-full max-w-xl bg-card z-50 flex flex-col border-l border-border shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-extrabold text-foreground tracking-tight">Candidate Details</h2>
              <div className="flex items-center gap-3">
                <button className="px-3 py-1.5 text-sm font-medium rounded-lg border bg-card hover:bg-muted transition-colors flex items-center gap-2 shadow-sm">
                  <Download className="h-4 w-4" /> Export
                </button>
                <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto hidden-scrollbar">
              {/* Header Info */}
              <div className="p-6 border-b">
                <div className="flex gap-5 items-start">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20 shadow-sm">
                    <User className="h-10 w-10" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{candidate.name}</h1>
                    <p className="text-muted-foreground font-medium mb-3">{candidate.role}</p>
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge status={candidate.status} />
                      <div className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {candidate.experience} exp.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="p-6 border-b bg-muted/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-foreground">Raft AI Insights</h3>
                </div>
                <div className="bg-card border rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-muted-foreground">Match Score</span>
                    <AIScoreBadge score={candidate.aiScore} />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    Strong match for the {candidate.role} role. Excellent experience aligned with requirements. Shows high potential based on parsing previous career progression.
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-6 border-b">
                <h3 className="font-bold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {candidate.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    +1 (555) 123-4567
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-6">
                <h3 className="font-bold text-foreground mb-4">Activity Timeline</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <div className="w-px h-full bg-border my-1" />
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-bold text-foreground">Moved to {candidate.status}</p>
                      <p className="text-xs font-medium text-muted-foreground mt-0.5">{candidate.lastActivity}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Resume parsed and scored</p>
                      <p className="text-xs font-medium text-muted-foreground mt-0.5">{candidate.submitted}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-muted/30 flex gap-3 shrink-0">
              <button onClick={onClose} className="flex-1 py-2.5 bg-card border shadow-sm rounded-lg text-sm font-medium hover:bg-muted text-foreground transition-colors">
                Reject
              </button>
              <button className="flex-1 py-2.5 bg-primary text-primary-foreground shadow-sm rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Move to Next Stage
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
