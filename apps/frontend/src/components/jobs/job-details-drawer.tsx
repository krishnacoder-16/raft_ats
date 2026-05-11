"use client";

import { X, Edit2, Users, Calendar, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Job } from "@/types/job";
import { JobStatusBadge } from "./job-status-badge";
import { RecruiterAssignment } from "./recruiter-assignment";

interface JobDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export function JobDetailsDrawer({ isOpen, onClose, job }: JobDetailsDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && job && (
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
              <h2 className="text-lg font-extrabold text-foreground tracking-tight">Job Overview</h2>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg border bg-card hover:bg-muted transition-colors shadow-sm">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto hidden-scrollbar p-6 space-y-8">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-foreground mb-1">{job.title}</h1>
                <p className="text-muted-foreground font-medium mb-4">{job.client} • {job.location}</p>
                <div className="flex gap-2 mb-6">
                  <JobStatusBadge status={job.status} />
                  <span className="px-2.5 py-1 text-xs font-bold rounded-md border bg-muted/50 uppercase tracking-wider">
                    {job.priority} Priority
                  </span>
                </div>
                
                <h3 className="text-xs font-black text-foreground mb-3 uppercase tracking-wider">Assigned Recruiter</h3>
                <RecruiterAssignment name={job.recruiter} />
              </div>

              <div className="bg-muted/30 rounded-xl p-5 border">
                <h3 className="text-xs font-black text-foreground mb-4 uppercase tracking-wider">Funnel Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5 text-muted-foreground">
                      <Users className="h-4 w-4" /> <span className="text-sm font-bold">Total Candidates</span>
                    </div>
                    <span className="font-extrabold text-lg">{job.candidateCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5 text-muted-foreground">
                      <Calendar className="h-4 w-4" /> <span className="text-sm font-bold">Interviews Scheduled</span>
                    </div>
                    <span className="font-extrabold text-lg">{job.interviewCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-primary pt-2 border-t">
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-sm font-bold">Offers Made</span>
                    </div>
                    <span className="font-extrabold text-lg">{job.offersCount}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black text-foreground mb-4 uppercase tracking-wider">Job Details</h3>
                <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm">
                  <div>
                    <span className="block text-muted-foreground mb-1 font-bold">Department</span>
                    <span className="font-extrabold">{job.department}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground mb-1 font-bold">Experience</span>
                    <span className="font-extrabold">{job.experience}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground mb-1 font-bold">Target Openings</span>
                    <span className="font-extrabold">{job.openings}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground mb-1 font-bold">Date Posted</span>
                    <span className="font-extrabold">{job.postedDate}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t bg-muted/30">
              <button className="w-full py-3 bg-primary text-primary-foreground font-extrabold rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
                View Pipeline Board
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
