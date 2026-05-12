import { create } from 'zustand';
import { Candidate } from '@/types/candidate';

interface CandidateFilters {
  role: string;
  stage: string;
  recruiter: string;
  status: string;
  experienceRange: [number, number];
  aiScoreRange: [number, number];
  submittedDate: string;
  recentActivity: string;
}

interface CandidateState {
  candidates: Candidate[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filters: CandidateFilters;
  pagination: {
    page: number;
    pageSize: number;
  };
  fetchCandidates: () => Promise<void>;
  addCandidate: (candidate: Candidate) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<CandidateFilters>) => void;
  setPagination: (pagination: Partial<{ page: number; pageSize: number }>) => void;
  resetFilters: () => void;
}

const initialFilters: CandidateFilters = {
  role: 'All Roles',
  stage: 'All Stages',
  recruiter: 'All Recruiters',
  status: 'All Status',
  experienceRange: [0, 20],
  aiScoreRange: [0, 100],
  submittedDate: '',
  recentActivity: 'All Time',
};

export const useCandidateStore = create<CandidateState>((set) => ({
  candidates: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  filters: initialFilters,
  pagination: {
    page: 1,
    pageSize: 10,
  },
  fetchCandidates: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:5000/candidates');
      if (!response.ok) throw new Error('Failed to fetch candidates');
      const data = await response.json();
      
      const mappedCandidates: Candidate[] = data.map((c: any) => ({
        id: c.id,
        name: c.fullName,
        email: c.email,
        phone: c.phone || '',
        role: "Applicant",
        experience: c.experience ? `${c.experience} years` : '0 years',
        skills: "N/A",
        recruiter: "Unassigned",
        status: c.status || 'Applied',
        stage: "Applied",
        aiScore: Math.floor(Math.random() * 40) + 60, // Mock AI score
        submitted: new Date(c.createdAt).toLocaleDateString(),
        lastActivity: new Date(c.createdAt).toLocaleDateString(),
      }));

      set({ candidates: mappedCandidates, isLoading: false });
    } catch (error: any) {
      console.error(error);
      set({ error: error.message, isLoading: false });
    }
  },
  addCandidate: (candidate) => set((state) => ({ 
    candidates: [candidate, ...state.candidates],
    pagination: { ...state.pagination, page: 1 } 
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

