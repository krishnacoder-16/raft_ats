import { Filter, X, RotateCcw, ChevronDown } from "lucide-react";
import { useCandidateStore } from "@/features/candidates/store/candidate-store";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CandidateFilters() {
  const { filters, setFilters, resetFilters } = useCandidateStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex items-center gap-3 relative">
      {/* Primary Toolbar Filters */}
      <select 
        value={filters.role}
        onChange={(e) => setFilters({ role: e.target.value })}
        className="h-10 px-3 py-2 rounded-lg bg-card border border-border text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer text-foreground transition-all hover:border-primary/50"
      >
        <option>All Roles</option>
        <option>Senior Frontend Engineer</option>
        <option>Frontend Developer</option>
        <option>Product Manager</option>
        <option>UX Designer</option>
        <option>Backend Engineer</option>
        <option>Data Scientist</option>
        <option>Security Analyst</option>
      </select>

      <select 
        value={filters.stage}
        onChange={(e) => setFilters({ stage: e.target.value })}
        className="h-10 px-3 py-2 rounded-lg bg-card border border-border text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer text-foreground transition-all hover:border-primary/50"
      >
        <option>All Stages</option>
        <option>Shortlisted</option>
        <option>Technical Round</option>
        <option>Managerial Round</option>
        <option>HR Round</option>
      </select>

      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="h-10 px-4 rounded-lg border border-border bg-card shadow-sm hover:bg-muted flex items-center gap-2 text-xs font-bold transition-all text-foreground hover:border-primary/50"
      >
        <Filter className="h-3.5 w-3.5 text-primary" /> 
        More Filters
      </button>

      {/* Advanced Filters Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-card border-l border-border shadow-2xl z-[101] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div>
                  <h3 className="text-lg font-black tracking-tight text-foreground uppercase">Advanced Filters</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Refine your search</p>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 hidden-scrollbar">
                {/* Experience Range */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Experience (Years)</label>
                    <span className="text-xs font-black text-primary">{filters.experienceRange[0]} - {filters.experienceRange[1]}+ yrs</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Min</span>
                      <input 
                        type="range" min="0" max="20" step="1"
                        value={filters.experienceRange[0]}
                        onChange={(e) => setFilters({ experienceRange: [parseInt(e.target.value), filters.experienceRange[1]] })}
                        className="w-full accent-primary h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Max</span>
                      <input 
                        type="range" min="0" max="20" step="1"
                        value={filters.experienceRange[1]}
                        onChange={(e) => setFilters({ experienceRange: [filters.experienceRange[0], parseInt(e.target.value)] })}
                        className="w-full accent-primary h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* AI Score Range */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">AI Match Score</label>
                    <span className="text-xs font-black text-emerald-600">{filters.aiScoreRange[0]}% - {filters.aiScoreRange[1]}%</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Min</span>
                      <input 
                        type="range" min="0" max="100" step="5"
                        value={filters.aiScoreRange[0]}
                        onChange={(e) => setFilters({ aiScoreRange: [parseInt(e.target.value), filters.aiScoreRange[1]] })}
                        className="w-full accent-emerald-500 h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Max</span>
                      <input 
                        type="range" min="0" max="100" step="5"
                        value={filters.aiScoreRange[1]}
                        onChange={(e) => setFilters({ aiScoreRange: [filters.aiScoreRange[0], parseInt(e.target.value)] })}
                        className="w-full accent-emerald-500 h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Application Status</label>
                  <select 
                    value={filters.status}
                    onChange={(e) => setFilters({ status: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-border bg-card text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option>All Status</option>
                    <option>Applied</option>
                    <option>Screening</option>
                    <option>Interviewing</option>
                    <option>Offer Sent</option>
                    <option>Hired</option>
                    <option>Rejected</option>
                  </select>
                </div>

                {/* Recruiter Filter */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Assigned Recruiter</label>
                  <select 
                    value={filters.recruiter}
                    onChange={(e) => setFilters({ recruiter: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-border bg-card text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option>All Recruiters</option>
                    <option>John Smith</option>
                    <option>Jane Doe</option>
                  </select>
                </div>

                {/* Recent Activity */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Activity Period</label>
                  <select 
                    value={filters.recentActivity}
                    onChange={(e) => setFilters({ recentActivity: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-border bg-card text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option>All Time</option>
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-border/50 bg-muted/20 flex flex-col gap-3">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
                >
                  Apply Filters
                </button>
                <button 
                  onClick={() => { resetFilters(); setIsDrawerOpen(false); }}
                  className="w-full py-3.5 bg-card border border-border text-foreground rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-muted transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset All
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
