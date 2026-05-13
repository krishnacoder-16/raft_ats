import { create } from 'zustand';
import { Job, JobStatus, JobPriority } from '@/types/job';

interface JobFilters {
  status: string;
  priority: string;
}

interface JobState {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filters: JobFilters;
  pagination: {
    page: number;
    pageSize: number;
  };
  fetchJobs: () => Promise<void>;
  addJob: (job: Job) => void;
  deleteJob: (id: string) => Promise<boolean>;
  updateJob: (id: string, updates: Partial<Job>) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<JobFilters>) => void;
  setPagination: (pagination: Partial<{ page: number; pageSize: number }>) => void;
  resetFilters: () => void;
}

const initialFilters: JobFilters = {
  status: 'All Status',
  priority: 'All Priority',
};

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  filters: initialFilters,
  pagination: {
    page: 1,
    pageSize: 10,
  },
  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:5000/jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      
      const mappedJobs: Job[] = data.map((j: any) => ({
        id: j.id,
        title: j.jobTitle,
        company: j.clientCompany,
        recruiters: j.assignedRecruiters || [],
        employmentType: j.employmentType || "Full-time",
        education: j.educationRequirement || "N/A",
        minExperience: j.minExperience || 0,
        maxExperience: j.maxExperience || 0,
        minSalary: j.minSalary?.toString() || "0",
        maxSalary: j.maxSalary?.toString() || "0",
        currency: j.budgetCurrency || "INR",
        openings: j.targetOpenings || 1,
        priority: j.priorityLevel as JobPriority,
        status: j.requisitionStatus as JobStatus,
        skills: j.requiredSkills || [],
        description: j.jobDescription || "",
        locations: j.locations || [],
        hiredCount: j.hiredCount || 0,
        totalApplicants: j.pipelineCount || 0,
        postedDate: new Date(j.createdAt).toLocaleDateString(),
      }));

      set({ jobs: mappedJobs, isLoading: false });
    } catch (error: any) {
      console.error(error);
      set({ error: error.message, isLoading: false });
    }
  },
  addJob: (job) => set((state) => ({ 
    jobs: [job, ...state.jobs],
    pagination: { ...state.pagination, page: 1 } 
  })),
  deleteJob: async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== id),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  updateJob: (id, updates) => set((state) => ({
    jobs: state.jobs.map(j => j.id === id ? { ...j, ...updates } : j)
  })),
  setSearchQuery: (query) => set(() => ({ searchQuery: query, pagination: { page: 1, pageSize: 10 } })),
  setFilters: (newFilters) => set((state) => ({ 
    filters: { ...state.filters, ...newFilters },
    pagination: { ...state.pagination, page: 1 }
  })),
  setPagination: (newPagination) => set((state) => ({ 
    pagination: { ...state.pagination, ...newPagination } 
  })),
  resetFilters: () => set(() => ({ filters: initialFilters, searchQuery: '', pagination: { page: 1, pageSize: 10 } })),
}));
