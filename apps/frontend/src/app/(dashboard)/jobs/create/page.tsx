"use client";

import { X, Plus, Trash2, MapPin, Briefcase, DollarSign, Users, Award, FileText, Check, ChevronLeft, Save, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useJobStore } from "@/features/jobs/store/job-store";
import { Job, JobLocation } from "@/types/job";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

// --- UI Components ---

function ConfirmationModal({ isOpen, onClose, onConfirm, title, description, confirmText, confirmVariant = "primary" }: any) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-card border border-border shadow-2xl rounded-2xl p-8"
        >
          <h2 className="text-xl font-black tracking-tight text-foreground">{title}</h2>
          <p className="text-sm font-medium text-muted-foreground mt-3 leading-relaxed">{description}</p>
          <div className="mt-8 flex items-center justify-end gap-3">
            <button onClick={onClose} className="px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl border bg-card hover:bg-muted transition-all">
              Cancel
            </button>
            <button 
              onClick={() => { onConfirm(); onClose(); }}
              className={cn(
                "px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all",
                confirmVariant === "primary" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90" : "bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20"
              )}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function Toast({ message, onClose }: { message: string, onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[101] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10"
    >
      <Check className="h-4 w-4 text-primary" />
      <span className="text-[11px] font-black uppercase tracking-widest">{message}</span>
    </motion.div>
  );
}

// --- Form Components ---

function FormSection({ title, subtitle, icon: Icon, children }: any) {
  return (
    <div className="bg-card rounded-2xl border shadow-sm overflow-visible relative">
      <div className="px-6 py-5 border-b bg-muted/5 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-foreground">{title}</h3>
          {subtitle && <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}

function TagInput({ label, tags, onAdd, onRemove, placeholder }: any) {
  const [input, setInput] = useState("");
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) onAdd(input.trim());
      setInput("");
    }
  };
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">{label}</label>
      <div className="min-h-[48px] p-2 rounded-xl border border-border bg-muted/20 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        {tags.map((tag: string) => (
          <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[11px] font-black text-primary uppercase tracking-tight">
            {tag}
            <button onClick={() => onRemove(tag)} className="hover:text-primary/70"><X className="h-3 w-3" /></button>
          </span>
        ))}
        <input 
          type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent text-sm font-bold outline-none placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  );
}

const ALL_RECRUITERS = ["John Smith", "Jane Doe", "Michael Ross", "Rachel Zane", "Harvey Specter"];

function RecruiterSelect({ selected, onToggle }: { selected: string[], onToggle: (r: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const click = (e: MouseEvent) => { if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener("mousedown", click); return () => document.removeEventListener("mousedown", click);
  }, []);

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Assigned Recruiters</label>
      <div onClick={() => setIsOpen(!isOpen)} className="min-h-[48px] p-2 rounded-xl border border-border bg-muted/20 flex flex-wrap gap-2 cursor-pointer hover:border-primary/40 transition-all">
        {selected.length === 0 ? (
          <span className="text-sm font-medium text-muted-foreground/50 px-2 py-1.5">Select team members...</span>
        ) : (
          selected.map(r => (
            <span key={r} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border text-[11px] font-black text-foreground uppercase tracking-tight shadow-sm">
              {r}
              <button onClick={(e) => { e.stopPropagation(); onToggle(r); }} className="hover:text-primary"><X className="h-3 w-3" /></button>
            </span>
          ))
        )}
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border shadow-2xl rounded-xl z-50 py-2 max-h-60 overflow-y-auto hidden-scrollbar">
          {ALL_RECRUITERS.map(r => (
            <div key={r} onClick={() => onToggle(r)} className="px-5 py-3 text-sm font-bold hover:bg-muted cursor-pointer flex items-center justify-between transition-colors">
              {r} {selected.includes(r) && <Check className="h-4 w-4 text-primary" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CreateJobPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black uppercase tracking-widest text-muted-foreground">Loading Form...</div>}>
      <JobFormContent />
    </Suspense>
  );
}

function JobFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { addJob, jobs, fetchJobs } = useJobStore();

  const [formData, setFormData] = useState({
    title: "", company: "", recruiters: [] as string[], employmentType: "Full-time",
    education: "Bachelor's Degree", minExperience: 0, maxExperience: 0,
    minSalary: "", maxSalary: "", currency: "INR", salaryUnit: "Lakh", salaryDuration: "Per Year", openings: 1,
    priority: "Medium" as const, status: "Open" as const, skills: [] as string[], description: "",
  });
  const [locations, setLocations] = useState<JobLocation[]>([{ country: "", state: "", city: "", pincode: "" }]);

  useEffect(() => {
    if (editId) {
      const jobToEdit = jobs.find(j => j.id === editId);
      if (jobToEdit) {
        setFormData({
          title: jobToEdit.title,
          company: jobToEdit.company,
          recruiters: jobToEdit.recruiters,
          employmentType: jobToEdit.employmentType,
          education: jobToEdit.education,
          minExperience: jobToEdit.minExperience,
          maxExperience: jobToEdit.maxExperience,
          minSalary: jobToEdit.minSalary,
          maxSalary: jobToEdit.maxSalary,
          currency: jobToEdit.currency,
          salaryUnit: "Lakh", // Default for edit if not stored
          salaryDuration: "Per Year", // Default for edit if not stored
          openings: jobToEdit.openings,
          priority: jobToEdit.priority,
          status: jobToEdit.status,
          skills: jobToEdit.skills,
          description: jobToEdit.description,
        });
        setLocations(jobToEdit.locations);
      }
    }
  }, [editId, jobs]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modals, setModals] = useState({ discard: false, publish: false });
  const [toast, setToast] = useState<string | null>(null);

  const handlePublish = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        jobTitle: formData.title,
        clientCompany: formData.company,
        employmentType: formData.employmentType,
        priorityLevel: formData.priority,
        assignedRecruiters: formData.recruiters,
        minExperience: formData.minExperience,
        maxExperience: formData.maxExperience,
        minSalary: formData.minSalary.replace(/[^0-9.]/g, ""),
        maxSalary: formData.maxSalary.replace(/[^0-9.]/g, ""),
        budgetCurrency: formData.currency,
        targetOpenings: formData.openings,
        educationRequirement: formData.education,
        requiredSkills: formData.skills,
        jobDescription: formData.description,
        locations: locations,
        requisitionStatus: formData.status,
      };

      const res = await fetch(editId ? `http://localhost:5000/jobs/${editId}` : "http://localhost:5000/jobs", {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Failed to ${editId ? 'update' : 'publish'} requisition`);
      }

      setToast(editId ? "Requisition Updated Successfully" : "Requisition Published Successfully");
      await fetchJobs(); // Refresh store
      setTimeout(() => router.push("/jobs"), 1500);
    } catch (error: any) {
      console.error(error);
      setToast(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    setToast("Draft saved successfully");
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 pb-5 border-b">
        <div className="flex items-center gap-4">
          <button onClick={() => setModals({ ...modals, discard: true })} className="p-2.5 rounded-xl border bg-card hover:bg-muted transition-all shadow-sm">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-foreground">{editId ? "Edit Requisition" : "Create New Requisition"}</h1>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Jobs / {editId ? "Edit" : "New"} Requisition</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <FormSection title="Basic Information" subtitle="Primary job details and identification" icon={Briefcase}>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Job Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Lead Frontend Architect" className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Client Company</label>
              <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="e.g. Global Tech Solutions" className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Employment Type</label>
              <select value={formData.employmentType} onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm">
                <option>Full-time</option><option>Contract</option><option>Remote</option><option>Internship</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Priority Level</label>
              <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm">
                <option>Urgent</option><option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
          </div>
        </FormSection>

        <FormSection title="Team & Recruiter Assignment" subtitle="Assign recruiters to manage this pipeline" icon={Users}>
          <RecruiterSelect selected={formData.recruiters} onToggle={(r) => {
            const newR = formData.recruiters.includes(r) ? formData.recruiters.filter(x => x !== r) : [...formData.recruiters, r];
            setFormData({...formData, recruiters: newR});
          }} />
        </FormSection>

        <FormSection title="Experience & Compensation" subtitle="Define requirements and budget" icon={DollarSign}>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Experience Range (Years)</label>
              <div className="flex items-center gap-3">
                <input type="number" placeholder="Min" value={formData.minExperience ?? 0} onChange={(e) => setFormData({...formData, minExperience: parseInt(e.target.value) || 0})}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
                <span className="font-bold text-muted-foreground">to</span>
                <input type="number" placeholder="Max" value={formData.maxExperience ?? 0} onChange={(e) => setFormData({...formData, maxExperience: parseInt(e.target.value) || 0})}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
              </div>
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Salary Budget</label>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <input type="text" placeholder="Min" value={formData.minSalary ?? ""} onChange={(e) => setFormData({...formData, minSalary: e.target.value})}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
                  <span className="font-bold text-muted-foreground">-</span>
                  <input type="text" placeholder="Max" value={formData.maxSalary ?? ""} onChange={(e) => setFormData({...formData, maxSalary: e.target.value})}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
                </div>
                
                <select value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})}
                  className="h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm">
                  <option>INR</option><option>USD</option><option>EUR</option>
                </select>

                <select value={formData.salaryUnit} onChange={(e) => setFormData({...formData, salaryUnit: e.target.value})}
                  className="h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm">
                  <option>Lakh</option><option>Thousand</option><option>Million</option><option>Crore</option>
                </select>

                <select value={formData.salaryDuration} onChange={(e) => setFormData({...formData, salaryDuration: e.target.value})}
                  className="h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm">
                  <option>Per Year</option><option>Per Month</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Target Openings</label>
              <input type="number" value={formData.openings ?? 1} onChange={(e) => setFormData({...formData, openings: parseInt(e.target.value) || 1})}
                className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
            </div>
          </div>
        </FormSection>

        <FormSection title="Skills & Education" subtitle="Core competencies and degree requirements" icon={Award}>
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Education Requirement</label>
              <select value={formData.education} onChange={(e) => setFormData({...formData, education: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm">
                <option>Any Graduate</option><option>Bachelor's Degree</option><option>Master's Degree</option><option>B.Tech / B.E.</option><option>MBA</option><option>PhD</option>
              </select>
            </div>
            <TagInput label="Required Skills & Technologies" tags={formData.skills} 
              onAdd={(s: string) => setFormData({...formData, skills: [...formData.skills, s]})}
              onRemove={(s: string) => setFormData({...formData, skills: formData.skills.filter(x => x !== s)})}
              placeholder="e.g. React, Node.js, GraphQL (Press Enter to add)" />
          </div>
        </FormSection>

        <FormSection title="Job Description" subtitle="Role responsibilities and expectations" icon={FileText}>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Summary & Description</label>
            <textarea rows={6} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm resize-none leading-relaxed"
              placeholder="Provide a detailed overview of the role, team, and day-to-day responsibilities..." />
          </div>
        </FormSection>

        <FormSection title="Hiring Locations" subtitle="Support for multiple office locations" icon={MapPin}>
          <div className="space-y-4">
            {locations.map((loc, idx) => (
              <div key={idx} className="flex gap-4 items-end bg-muted/5 p-6 rounded-2xl border border-border/50 group relative transition-all hover:bg-muted/10">
                <div className="flex-1 grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">City</label>
                    <input type="text" value={loc.city} onChange={(e) => { const nl = [...locations]; nl[idx].city = e.target.value; setLocations(nl); }}
                      placeholder="e.g. New York" className="w-full h-10 px-3 rounded-xl border border-border bg-card text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">State</label>
                    <input type="text" value={loc.state} onChange={(e) => { const nl = [...locations]; nl[idx].state = e.target.value; setLocations(nl); }}
                      placeholder="e.g. NY" className="w-full h-10 px-3 rounded-xl border border-border bg-card text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Country</label>
                    <input type="text" value={loc.country} onChange={(e) => { const nl = [...locations]; nl[idx].country = e.target.value; setLocations(nl); }}
                      placeholder="e.g. USA" className="w-full h-10 px-3 rounded-xl border border-border bg-card text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Zip Code</label>
                    <input type="text" value={loc.pincode} onChange={(e) => { const nl = [...locations]; nl[idx].pincode = e.target.value; setLocations(nl); }}
                      placeholder="e.g. 10001" className="w-full h-10 px-3 rounded-xl border border-border bg-card text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary/20" />
                  </div>
                </div>
                <button onClick={() => setLocations(locations.filter((_, i) => i !== idx))} disabled={locations.length === 1}
                  className="h-10 w-10 flex items-center justify-center rounded-xl border bg-card hover:bg-destructive/10 text-destructive/60 hover:text-destructive disabled:opacity-20 transition-all">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button onClick={() => setLocations([...locations, { country: "", state: "", city: "", pincode: "" }])}
              className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" /> Add Office Location
            </button>
          </div>
        </FormSection>

        <FormSection title="Publishing Settings" subtitle="Control requisition visibility" icon={Globe}>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Requisition Status</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm">
                <option>Open</option><option>Draft</option><option>Internal Only</option><option>Paused</option>
              </select>
            </div>
            <div className="flex items-end pb-1">
              <p className="text-xs font-medium text-muted-foreground leading-relaxed italic">
                * Requisitions marked as "Open" will be visible to all assigned recruiters and eligible for public job board distribution.
              </p>
            </div>
          </div>
        </FormSection>
      </div>

      <div className="mt-16 flex items-center justify-end gap-4 border-t pt-10">
        <button 
          onClick={() => setModals({ ...modals, discard: true })} 
          className="px-8 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
        >
          Discard
        </button>
        <button 
          onClick={handleSaveDraft}
          className="px-8 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl border border-border bg-card hover:bg-muted transition-all shadow-sm"
        >
          Save Draft
        </button>
        <button 
          onClick={() => setModals({ ...modals, publish: true })} 
          disabled={isSubmitting}
          className="px-10 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : (editId ? "Update Requisition" : "Publish Requisition")}
        </button>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal 
        isOpen={modals.discard} 
        onClose={() => setModals({ ...modals, discard: false })}
        onConfirm={() => router.push("/jobs")}
        title="Discard Changes?"
        description="You have unsaved changes in this requisition. Are you sure you want to discard them?"
        confirmText="Yes, Discard"
        confirmVariant="destructive"
      />

      <ConfirmationModal 
        isOpen={modals.publish} 
        onClose={() => setModals({ ...modals, publish: false })}
        onConfirm={handlePublish}
        title={editId ? "Update Requisition?" : "Publish Requisition?"}
        description={editId ? "Confirm all changes before updating the job requisition." : "This requisition will become visible to assigned recruiters and available in the ATS pipeline."}
        confirmText={editId ? "Update" : "Publish"}
        confirmVariant="primary"
      />

      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
