import { X, UploadCloud, MapPin, Briefcase, User, Mail, Phone, Calendar, DollarSign, Clock, Building2, Code2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCandidateStore } from "@/features/candidates/store/candidate-store";
import { Candidate } from "@/types/candidate";

export function AddCandidateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const addCandidate = useCandidateStore((state) => state.addCandidate);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    dob: "",
    gender: "",
    experience: "",
    skills: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    totalExperience: "",
    currentCompany: "",
    state: "",
    city: "",
    pincode: "",
    recruiter: "John Smith",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.skills) newErrors.skills = "Skills are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newCandidate: Candidate = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role || "Frontend Developer",
      dob: formData.dob,
      gender: formData.gender,
      experience: formData.experience || "0 years",
      skills: formData.skills,
      currentSalary: formData.currentSalary,
      expectedSalary: formData.expectedSalary,
      noticePeriod: formData.noticePeriod,
      totalExperience: formData.totalExperience,
      currentCompany: formData.currentCompany,
      location: {
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
      },
      recruiter: formData.recruiter,
      status: "Applied",
      aiScore: 0,
      submitted: new Date().toISOString().split('T')[0],
      lastActivity: "Just now",
    };

    addCandidate(newCandidate);
    onClose();
    setStep(1);
    setFormData({
      name: "", email: "", phone: "", role: "", dob: "", gender: "", experience: "", skills: "",
      currentSalary: "", expectedSalary: "", noticePeriod: "", totalExperience: "", currentCompany: "",
      state: "", city: "", pincode: "", recruiter: "John Smith",
    });
  };

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
            className="fixed left-1/2 top-1/2 w-full max-w-3xl bg-card border shadow-2xl rounded-2xl z-50 flex flex-col overflow-hidden max-h-[90vh]"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
              <h2 className="text-xl font-bold text-foreground">Add New Candidate</h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto hidden-scrollbar">
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
                  <button onClick={() => setStep(2)} className="w-full px-4 py-2.5 bg-card border shadow-sm text-foreground rounded-lg font-medium text-sm hover:bg-muted transition-colors">
                    Enter details manually
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <User className="h-4 w-4" />
                      <h3 className="text-sm font-bold uppercase tracking-wider">Personal Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Full Name *</label>
                        <input 
                          type="text" 
                          value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="John Doe" 
                          className={`w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 ${errors.name ? 'border-destructive focus:ring-destructive/20' : 'focus:ring-primary/20'}`} 
                        />
                        {errors.name && <p className="text-[10px] font-bold text-destructive">{errors.name}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Email Address *</label>
                        <input 
                          type="email" 
                          value={formData.email} 
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="john@example.com" 
                          className={`w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-destructive focus:ring-destructive/20' : 'focus:ring-primary/20'}`} 
                        />
                        {errors.email && <p className="text-[10px] font-bold text-destructive">{errors.email}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Phone Number *</label>
                        <input 
                          type="text" 
                          value={formData.phone} 
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+1 555-0101" 
                          className={`w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 ${errors.phone ? 'border-destructive focus:ring-destructive/20' : 'focus:ring-primary/20'}`} 
                        />
                        {errors.phone && <p className="text-[10px] font-bold text-destructive">{errors.phone}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Date of Birth</label>
                        <input 
                          type="date" 
                          value={formData.dob} 
                          onChange={(e) => setFormData({...formData, dob: e.target.value})}
                          className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Gender</label>
                        <select 
                          value={formData.gender} 
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Briefcase className="h-4 w-4" />
                      <h3 className="text-sm font-bold uppercase tracking-wider">Professional Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Role Applied For</label>
                        <input 
                          type="text" 
                          value={formData.role} 
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          placeholder="Senior Frontend Engineer" 
                          className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Skills (Comma separated) *</label>
                        <input 
                          type="text" 
                          value={formData.skills} 
                          onChange={(e) => setFormData({...formData, skills: e.target.value})}
                          placeholder="React, TypeScript, Node.js" 
                          className={`w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 ${errors.skills ? 'border-destructive focus:ring-destructive/20' : 'focus:ring-primary/20'}`} 
                        />
                        {errors.skills && <p className="text-[10px] font-bold text-destructive">{errors.skills}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Current Company</label>
                        <input 
                          type="text" 
                          value={formData.currentCompany} 
                          onChange={(e) => setFormData({...formData, currentCompany: e.target.value})}
                          placeholder="Acme Corp" 
                          className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Total Experience (Years)</label>
                        <input 
                          type="number" 
                          value={formData.totalExperience} 
                          onChange={(e) => setFormData({...formData, totalExperience: e.target.value})}
                          placeholder="5" 
                          className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Current Salary</label>
                        <input 
                          type="text" 
                          value={formData.currentSalary} 
                          onChange={(e) => setFormData({...formData, currentSalary: e.target.value})}
                          placeholder="12 LPA" 
                          className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Expected Salary</label>
                        <input 
                          type="text" 
                          value={formData.expectedSalary} 
                          onChange={(e) => setFormData({...formData, expectedSalary: e.target.value})}
                          placeholder="18 LPA" 
                          className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Notice Period (Days)</label>
                        <input 
                          type="number" 
                          value={formData.noticePeriod} 
                          onChange={(e) => setFormData({...formData, noticePeriod: e.target.value})}
                          placeholder="30" 
                          className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Recruiter Name</label>
                        <input 
                          type="text" 
                          value={formData.recruiter} 
                          onChange={(e) => setFormData({...formData, recruiter: e.target.value})}
                          placeholder="John Smith" 
                          className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <MapPin className="h-4 w-4" />
                      <h3 className="text-sm font-bold uppercase tracking-wider">Location Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">City</label>
                        <input 
                          type="text" 
                          value={formData.city} 
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          placeholder="New York" 
                          className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">State</label>
                        <input 
                          type="text" 
                          value={formData.state} 
                          onChange={(e) => setFormData({...formData, state: e.target.value})}
                          placeholder="NY" 
                          className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Pincode</label>
                        <input 
                          type="text" 
                          value={formData.pincode} 
                          onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                          placeholder="10001" 
                          className="w-full h-10 px-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t bg-muted/30 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => { setStep(1); onClose(); }} 
                className="px-4 py-2 text-sm font-bold rounded-lg bg-card border shadow-sm hover:bg-muted text-foreground transition-colors"
              >
                Cancel
              </button>
              {step === 2 && (
                <button 
                  onClick={handleSubmit} 
                  className="px-6 py-2 text-sm font-bold rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                >
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
