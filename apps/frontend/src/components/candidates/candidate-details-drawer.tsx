"use client";

import { X, User, Briefcase, Mail, Phone, Calendar, Download, Code2, DollarSign, Building2, MapPin, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StatusBadge } from "./status-badge";
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
            <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
              <h2 className="text-lg font-black text-foreground tracking-tight uppercase">Candidate Profile</h2>
              <div className="flex items-center gap-3">
                <button className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg border bg-card hover:bg-muted transition-colors flex items-center gap-2 shadow-sm">
                  <Download className="h-3 w-3" /> Export
                </button>
                <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto hidden-scrollbar">
              {/* Header Info */}
              <div className="p-8 border-b bg-muted/10">
                <div className="flex gap-6 items-start">
                  <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20 shadow-lg relative">
                    <User className="h-12 w-12" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-card text-[10px] font-black">
                      {candidate.aiScore}%
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h1 className="text-3xl font-black tracking-tight text-foreground">{candidate.name}</h1>
                    <p className="text-muted-foreground font-extrabold uppercase tracking-widest text-xs mt-1">{candidate.role}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <StatusBadge status={candidate.status} />
                      <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-slate-100 text-slate-700 border border-slate-200 shadow-sm">
                        {candidate.experience}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-10">
                {/* Contact & Personal */}
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b pb-2">Information Summary</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-wider">
                        <Mail className="h-3 w-3 text-primary" /> Email Address
                      </div>
                      <p className="text-sm font-bold text-foreground">{candidate.email}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-wider">
                        <Phone className="h-3 w-3 text-primary" /> Phone Number
                      </div>
                      <p className="text-sm font-bold text-foreground">{candidate.phone || "+1 (555) 000-0000"}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-wider">
                        <MapPin className="h-3 w-3 text-primary" /> Location
                      </div>
                      <p className="text-sm font-bold text-foreground">
                        {candidate.location?.city ? `${candidate.location.city}, ${candidate.location.state}` : "San Francisco, CA"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-wider">
                        <Calendar className="h-3 w-3 text-primary" /> Date of Birth
                      </div>
                      <p className="text-sm font-bold text-foreground">{candidate.dob || "N/A"}</p>
                    </div>
                  </div>
                </section>

                {/* Professional Details */}
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b pb-2">Professional Snapshot</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-wider">
                        <Building2 className="h-3 w-3 text-primary" /> Current Company
                      </div>
                      <p className="text-sm font-bold text-foreground">{candidate.currentCompany || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-wider">
                        <DollarSign className="h-3 w-3 text-primary" /> Expected Salary
                      </div>
                      <p className="text-sm font-bold text-foreground">{candidate.expectedSalary || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-wider">
                        <Clock className="h-3 w-3 text-primary" /> Notice Period
                      </div>
                      <p className="text-sm font-bold text-foreground">{candidate.noticePeriod ? `${candidate.noticePeriod} Days` : "Immediate"}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-wider">
                        <User className="h-3 w-3 text-primary" /> Recruiter
                      </div>
                      <p className="text-sm font-bold text-foreground">{candidate.recruiter}</p>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-wider">
                      <Code2 className="h-3 w-3 text-primary" /> Top Skills
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.skills.split(',').map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-muted text-[10px] font-black uppercase tracking-widest border border-border">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Activity Timeline */}
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b pb-2">Activity History</h3>
                  <div className="space-y-6 pt-2">
                    <div className="flex gap-5 relative">
                      <div className="absolute left-[7px] top-[18px] bottom-[-20px] w-px bg-border" />
                      <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/10 shrink-0 z-10" />
                      <div>
                        <p className="text-sm font-black text-foreground uppercase tracking-tight">Status Update: {candidate.status}</p>
                        <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mt-1">{candidate.lastActivity}</p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-4 h-4 rounded-full bg-slate-300 ring-4 ring-slate-100 shrink-0 z-10" />
                      <div>
                        <p className="text-sm font-black text-foreground uppercase tracking-tight">Application Submitted</p>
                        <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mt-1">{candidate.submitted}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="p-6 border-t bg-muted/30 flex gap-4 shrink-0">
              <button onClick={onClose} className="flex-1 py-3 bg-card border shadow-sm rounded-xl text-xs font-black uppercase tracking-widest hover:bg-muted text-foreground transition-all">
                Reject
              </button>
              <button className="flex-1 py-3 bg-primary text-primary-foreground shadow-lg rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all">
                Next Stage
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
