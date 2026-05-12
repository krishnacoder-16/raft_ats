import { create } from 'zustand';
import { Job, JobStatus, JobPriority } from '@/types/job';

interface JobFilters {
  status: string;
  priority: string;
}

interface JobState {
  jobs: Job[];
  searchQuery: string;
  filters: JobFilters;
  pagination: {
    page: number;
    pageSize: number;
  };
  addJob: (job: Job) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<JobFilters>) => void;
  setPagination: (pagination: Partial<{ page: number; pageSize: number }>) => void;
  resetFilters: () => void;
}

const initialMockJobs: Job[] = [
  {
    id: "J-001",
    title: "Senior Frontend Developer",
    company: "Google",
    recruiters: ["John Smith", "Jane Doe"],
    employmentType: "Full-time",
    education: "Bachelor's in CS",
    minExperience: 5,
    maxExperience: 8,
    minSalary: "120,000",
    maxSalary: "180,000",
    currency: "USD",
    openings: 3,
    priority: "High",
    status: "Open",
    skills: ["React", "TypeScript", "Next.js"],
    description: "Looking for a seasoned frontend engineer to lead our core products.",
    locations: [{ country: "USA", state: "CA", city: "Mountain View", pincode: "94043" }],
    hiredCount: 1,
    totalApplicants: 45,
    postedDate: "2023-10-01",
  },
  {
    id: "J-002",
    title: "Backend Engineer",
    company: "Amazon",
    recruiters: ["Jane Doe"],
    employmentType: "Remote",
    education: "Master's in CS",
    minExperience: 3,
    maxExperience: 6,
    minSalary: "100,000",
    maxSalary: "150,000",
    currency: "USD",
    openings: 5,
    priority: "Urgent",
    status: "Open",
    skills: ["Go", "Kubernetes", "AWS"],
    description: "Help us build the next generation of logistics systems.",
    locations: [
      { country: "USA", state: "WA", city: "Seattle", pincode: "98101" },
      { country: "Canada", state: "ON", city: "Toronto", pincode: "M5H" }
    ],
    hiredCount: 2,
    totalApplicants: 120,
    postedDate: "2023-10-05",
  }
];

const initialFilters: JobFilters = {
  status: 'All Status',
  priority: 'All Priority',
};

export const useJobStore = create<JobState>((set) => ({
  jobs: initialMockJobs,
  searchQuery: '',
  filters: initialFilters,
  pagination: {
    page: 1,
    pageSize: 10,
  },
  addJob: (job) => set((state) => ({ 
    jobs: [job, ...state.jobs],
    pagination: { ...state.pagination, page: 1 } 
  })),
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
