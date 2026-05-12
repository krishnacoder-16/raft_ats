"use client";

import { X, Plus, Trash2, MapPin, Briefcase, DollarSign, Users, Award, FileText, Check, ChevronLeft, Save, Globe, Upload, File } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCandidateStore } from "@/features/candidates/store/candidate-store";
import { Candidate } from "@/types/candidate";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// --- UI Components ---

function FormSection({ title, subtitle, icon: Icon, children }: any) {
  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b bg-muted/5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-[11px] font-black uppercase tracking-widest text-foreground">{title}</h3>
          {subtitle && <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="p-6">
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
      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{label}</label>
      <div className="min-h-[44px] p-2 rounded-lg border border-border bg-muted/20 flex flex-wrap gap-2 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
        {tags.map((tag: string) => (
          <span key={tag} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-tight">
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
          <h2 className="text-lg font-black tracking-tight text-foreground">{title}</h2>
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
      <span className="text-[10px] font-black uppercase tracking-widest">{message}</span>
    </motion.div>
  );
}

export default function CreateCandidatePage() {
  const router = useRouter();
  const addCandidate = useCandidateStore((state) => state.addCandidate);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", role: "",
    experience: "", currentCompany: "", currentSalary: "", expectedSalary: "",
    noticePeriod: "", totalExperience: "", skills: [] as string[],
    state: "", city: "", pincode: "", recruiter: "John Smith", stage: "Source",
    notes: "",
  });
  
  const [modals, setModals] = useState({ discard: false, publish: false });
  const [toast, setToast] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  const handleAddCandidate = () => {
    const newCandidate: Candidate = {
      id: `C-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...formData,
      skills: formData.skills.join(", "),
      location: {
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
      },
      status: "Active",
      aiScore: Math.floor(Math.random() * 40) + 60,
      submitted: new Date().toISOString().split('T')[0],
      lastActivity: "Just now",
    };
    addCandidate(newCandidate);
    setToast("Candidate Added Successfully");
    setTimeout(() => router.push("/candidates"), 1000);
  };

  const handleSaveDraft = () => {
    setToast("Draft saved successfully");
  };

  return (
    <div className="max-w-5xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 pb-5 border-b">
        <div className="flex items-center gap-4">
          <button onClick={() => setModals({ ...modals, discard: true })} className="p-2.5 rounded-xl border bg-card hover:bg-muted transition-all shadow-sm">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-foreground uppercase tracking-widest">Add New Candidate</h1>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Candidates / Create Profile</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <FormSection title="Basic Information" subtitle="Primary contact and identification" icon={Users}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Full Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Alex Johnson" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/30" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Email Address</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="alex.j@example.com" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/30" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Phone Number</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+1 (555) 000-0000" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/30" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">City</label>
                <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="City" className="w-full h-10 px-3 rounded-lg border border-border bg-muted/20 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary/30" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">State</label>
                <input type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})}
                  placeholder="State" className="w-full h-10 px-3 rounded-lg border border-border bg-muted/20 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary/30" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Zip</label>
                <input type="text" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  placeholder="Zip" className="w-full h-10 px-3 rounded-lg border border-border bg-muted/20 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary/30" />
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection title="Professional Information" subtitle="Current role and experience details" icon={Briefcase}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Current Company</label>
              <input type="text" value={formData.currentCompany} onChange={(e) => setFormData({...formData, currentCompany: e.target.value})}
                placeholder="e.g. TechCorp Inc." className="w-full h-10 px-4 rounded-lg border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/30" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Current Role</label>
              <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
                placeholder="e.g. Senior Frontend Engineer" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Exp (Yrs)</label>
                <input type="text" value={formData.totalExperience} onChange={(e) => setFormData({...formData, totalExperience: e.target.value})}
                  placeholder="e.g. 5" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/30" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Notice Period (Days)</label>
                <input type="text" value={formData.noticePeriod} onChange={(e) => setFormData({...formData, noticePeriod: e.target.value})}
                  placeholder="e.g. 30" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/30" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Assigned Recruiter</label>
              <select value={formData.recruiter} onChange={(e) => setFormData({...formData, recruiter: e.target.value})}
                className="w-full h-10 px-4 rounded-lg border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer">
                <option>John Smith</option><option>Jane Doe</option><option>Michael Ross</option><option>Rachel Zane</option>
              </select>
            </div>
          </div>
        </FormSection>

        <FormSection title="Experience & Compensation" subtitle="Financial expectations and salary details" icon={DollarSign}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Current CTC (Annual)</label>
              <input type="text" value={formData.currentSalary} onChange={(e) => setFormData({...formData, currentSalary: e.target.value})}
                placeholder="e.g. $80,000" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/30" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Expected CTC (Annual)</label>
              <input type="text" value={formData.expectedSalary} onChange={(e) => setFormData({...formData, expectedSalary: e.target.value})}
                placeholder="e.g. $100,000" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/30" />
            </div>
          </div>
        </FormSection>

        <FormSection title="Skills & Technologies" subtitle="Core competencies and stack expertise" icon={Award}>
          <TagInput label="Technical Skills" tags={formData.skills} 
            onAdd={(s: string) => setFormData({...formData, skills: [...formData.skills, s]})}
            onRemove={(s: string) => setFormData({...formData, skills: formData.skills.filter(x => x !== s)})}
            placeholder="e.g. React, Node.js, GraphQL (Press Enter to add)" />
        </FormSection>

        <FormSection title="Resume Upload" subtitle="Candidate CV and supporting documents" icon={Upload}>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-muted/5 hover:bg-muted/10 transition-all cursor-pointer">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Upload className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold">Click to upload or drag and drop</p>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-1">PDF, DOCX (Max. 5MB)</p>
              </div>
              <input type="file" className="hidden" />
            </div>
            {resume && (
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card shadow-sm">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <File className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold">{resume.name}</p>
                  <p className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest">{(resume.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button onClick={() => setResume(null)} className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive/60 hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </FormSection>

        <FormSection title="Notes & Recruiter Comments" subtitle="Internal feedback and candidate context" icon={FileText}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Candidate Notes</label>
            <textarea rows={4} value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-border bg-muted/20 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/30 shadow-sm resize-none leading-relaxed"
              placeholder="Provide context about the candidate, interview performance, or specific observations..." />
          </div>
        </FormSection>
      </div>

      <div className="mt-16 flex items-center justify-end gap-4 border-t pt-10">
        <button 
          onClick={() => setModals({ ...modals, discard: true })} 
          className="px-8 py-3 text-[11px] font-black uppercase tracking-widest rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
        >
          Discard
        </button>
        <button 
          onClick={handleSaveDraft}
          className="px-8 py-3 text-[11px] font-black uppercase tracking-widest rounded-lg border border-border bg-card hover:bg-muted transition-all shadow-sm"
        >
          Save Draft
        </button>
        <button 
          onClick={() => setModals({ ...modals, publish: true })} 
          className="px-10 py-3 text-[11px] font-black uppercase tracking-widest rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
        >
          Add Candidate
        </button>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal 
        isOpen={modals.discard} 
        onClose={() => setModals({ ...modals, discard: false })}
        onConfirm={() => router.push("/candidates")}
        title="Discard Changes?"
        description="You have unsaved changes in this candidate profile. Are you sure you want to discard them?"
        confirmText="Yes, Discard"
        confirmVariant="destructive"
      />

      <ConfirmationModal 
        isOpen={modals.publish} 
        onClose={() => setModals({ ...modals, publish: false })}
        onConfirm={handleAddCandidate}
        title="Add Candidate?"
        description="This candidate will be added to the pipeline and visible to the assigned recruiter."
        confirmText="Add Candidate"
        confirmVariant="primary"
      />

      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
