"use client";

import { X, Briefcase, Building2, MapPin, Users, DollarSign, Clock, FileText, ChevronRight, Edit3, Lock, Eye, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Job } from "@/types/job";
import { RecruiterAssignment } from "./recruiter-assignment";

import { useRouter } from "next/navigation";

interface JobDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export function JobDetailsDrawer({ isOpen, onClose, job }: JobDetailsDrawerProps) {
  const router = useRouter();
  if (!job) return null;

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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-full max-w-xl bg-card z-50 flex flex-col border-l border-border shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b shrink-0 bg-muted/5">
              <h2 className="text-sm font-black text-foreground uppercase tracking-tight">Job Requisition Overview</h2>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto hidden-scrollbar">
              {/* Header Info */}
              <div className="p-6 border-b bg-muted/10">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20 shadow-sm">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-xl font-black tracking-tight text-foreground">{job.title}</h1>
                    <p className="text-muted-foreground font-black uppercase tracking-widest text-[9px] mt-0.5">{job.company}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                        job.status === "Open" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-600 border-slate-100"
                      }`}>
                        {job.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border bg-orange-50 text-orange-600 border-orange-100">
                        {job.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-muted/20 border border-border">
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Progress</p>
                    <p className="text-lg font-black text-foreground mt-0.5">{job.hiredCount} / {job.openings}</p>
                    <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${(job.hiredCount / job.openings) * 100}%` }} />
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/20 border border-border">
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Pipeline</p>
                    <p className="text-lg font-black text-foreground mt-0.5">{job.totalApplicants} <span className="text-[10px] font-bold text-muted-foreground uppercase ml-0.5">Candidates</span></p>
                  </div>
                </div>

                {/* Job Specs */}
                <section className="space-y-3">
                  <h3 className="text-[9px] font-black text-muted-foreground uppercase tracking-widest border-b pb-1">Technical Specs</h3>
                  <div className="grid grid-cols-2 gap-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                        <Users className="h-2.5 w-2.5 text-primary" /> Recruiters
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {job.recruiters.map(r => (
                          <RecruiterAssignment key={r} name={r} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                        <Clock className="h-2.5 w-2.5 text-primary" /> Type
                      </div>
                      <p className="text-[11px] font-bold text-foreground">{job.employmentType}</p>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                        <DollarSign className="h-2.5 w-2.5 text-primary" /> Budget Range
                      </div>
                      <p className="text-[11px] font-bold text-foreground">{job.currency} {job.minSalary} - {job.maxSalary}</p>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                        <Award className="h-2.5 w-2.5 text-primary" /> Education
                      </div>
                      <p className="text-[11px] font-bold text-foreground">{job.education}</p>
                    </div>
                  </div>
                </section>

                {/* Locations */}
                <section className="space-y-3">
                  <h3 className="text-[9px] font-black text-muted-foreground uppercase tracking-widest border-b pb-1">Hiring Locations</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {job.locations.map((loc, i) => (
                      <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded bg-muted/40 border border-border">
                        <MapPin className="h-2.5 w-2.5 text-primary/70" />
                        <span className="text-[9px] font-bold text-foreground uppercase tracking-tight">{loc.city}, {loc.state}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills */}
                <section className="space-y-3">
                  <h3 className="text-[9px] font-black text-muted-foreground uppercase tracking-widest border-b pb-1">Competencies</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-primary/5 text-[9px] font-bold text-primary uppercase tracking-widest border border-primary/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Description */}
                <section className="space-y-3">
                  <h3 className="text-[9px] font-black text-muted-foreground uppercase tracking-widest border-b pb-1">Role Description</h3>
                  <p className="text-[11px] font-bold text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {job.description}
                  </p>
                </section>
              </div>
            </div>

            <div className="p-5 border-t bg-muted/10 grid grid-cols-3 gap-2 shrink-0">
              <button 
                type="button"
                onClick={() => {
                  router.push(`/jobs/create?edit=${job.id}`);
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 py-2 bg-card border shadow-sm rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-muted text-foreground transition-all"
              >
                <Edit3 className="h-3 w-3" /> Edit
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2 bg-card border shadow-sm rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-muted text-foreground transition-all">
                <Lock className="h-3 w-3" /> Close
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2 bg-primary text-primary-foreground shadow-sm rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all">
                <Eye className="h-3 w-3" /> Pipeline
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
