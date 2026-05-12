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
  searchQuery: string;
  filters: CandidateFilters;
  pagination: {
    page: number;
    pageSize: number;
  };
  addCandidate: (candidate: Candidate) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<CandidateFilters>) => void;
  setPagination: (pagination: Partial<{ page: number; pageSize: number }>) => void;
  resetFilters: () => void;
}

const initialMockCandidates: Candidate[] = [
  { id: "1", name: "Sarah Connor", email: "sarah@example.com", phone: "+1 555-0101", role: "Senior Frontend Engineer", experience: "4 years", recruiter: "John Smith", status: "Interviewing", stage: "Technical Round", aiScore: 92, submitted: "2023-10-24", lastActivity: "2 hrs ago", skills: "React, TypeScript, Node.js" },
  { id: "2", name: "Mike Johnson", email: "mike@example.com", phone: "+1 555-0102", role: "Product Manager", experience: "6 years", recruiter: "Jane Doe", status: "Applied", stage: "Shortlisted", aiScore: 85, submitted: "2023-10-25", lastActivity: "5 hrs ago", skills: "Product Strategy, Roadmap, SQL" },
  { id: "3", name: "Emily Chen", email: "emily@example.com", phone: "+1 555-0103", role: "UX Designer", experience: "3 years", recruiter: "John Smith", status: "Screening", stage: "HR Round", aiScore: 78, submitted: "2023-10-22", lastActivity: "1 day ago", skills: "Figma, User Research, Prototyping" },
  { id: "4", name: "David Kim", email: "david@example.com", phone: "+1 555-0104", role: "Backend Engineer", experience: "5 years", recruiter: "Jane Doe", status: "Offer Sent", stage: "Managerial Round", aiScore: 95, submitted: "2023-10-15", lastActivity: "1 day ago", skills: "Go, PostgreSQL, Redis" },
  { id: "5", name: "Lisa Wong", email: "lisa@example.com", phone: "+1 555-0105", role: "Data Scientist", experience: "2 years", recruiter: "John Smith", status: "Rejected", stage: "Technical Round", aiScore: 45, submitted: "2023-10-20", lastActivity: "3 days ago", skills: "Python, PyTorch, Pandas" },
  { id: "6", name: "James Bond", email: "james@example.com", phone: "+1 555-0107", role: "Security Analyst", experience: "10 years", recruiter: "Jane Doe", status: "Hired", stage: "Shortlisted", aiScore: 98, submitted: "2023-10-10", lastActivity: "1 week ago", skills: "Pentesting, Network Security, SIEM" },
  { id: "7", name: "Alice Wonderland", email: "alice@example.com", phone: "+1 555-0108", role: "Frontend Developer", experience: "3 years", recruiter: "John Smith", status: "Interviewing", stage: "Technical Round", aiScore: 88, submitted: "2023-10-26", lastActivity: "4 hrs ago", skills: "Vue.js, CSS3, HTML5" },
];

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
  candidates: initialMockCandidates,
  searchQuery: '',
  filters: initialFilters,
  pagination: {
    page: 1,
    pageSize: 10,
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
