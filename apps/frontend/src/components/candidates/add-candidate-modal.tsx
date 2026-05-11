"use client";

import { X, UploadCloud, FileText } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AddCandidateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);

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
              <h2 className="text-xl font-bold text-foreground">Add New Candidate</h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              {step === 1 ? (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center bg-muted/20 text-center hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setStep(2)}>
                    <UploadCloud className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-1">Drag and drop resume here</h3>
                    <p className="text-sm text-muted-foreground mb-4">Support for PDF, DOCX up to 5MB</p>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm shadow-sm">
                      Browse Files
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-px bg-border flex-1" />
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">OR</span>
                    <div className="h-px bg-border flex-1" />
                  </div>
                  <button className="w-full px-4 py-2.5 bg-card border shadow-sm text-foreground rounded-lg font-medium text-sm hover:bg-muted transition-colors">
                    Enter details manually
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">alex_chen_resume.pdf</h4>
                      <p className="text-xs text-muted-foreground">Parsed successfully • 100% data extraction</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">First Name</label>
                      <input type="text" defaultValue="Alex" className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Last Name</label>
                      <input type="text" defaultValue="Chen" className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-sm font-medium text-foreground">Email Address</label>
                      <input type="email" defaultValue="alex.chen@example.com" className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Assign Role</label>
                      <select className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Frontend Developer</option>
                        <option>Product Manager</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Initial Stage</label>
                      <select className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Applied</option>
                        <option>Screening</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t bg-muted/30 flex justify-end gap-3">
              <button onClick={() => { setStep(1); onClose(); }} className="px-4 py-2 text-sm font-medium rounded-lg bg-card border shadow-sm hover:bg-muted text-foreground transition-colors">
                Cancel
              </button>
              {step === 2 && (
                <button onClick={() => { setStep(1); onClose(); }} className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
                  Save Candidate
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
