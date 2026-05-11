export type Job = {
  id: string;
  title: string;
  client: string;
  department: string;
  location: string;
  recruiter: string;
  openings: number;
  status: "Active" | "Draft" | "On Hold" | "Closed";
  priority: "High" | "Medium" | "Low";
  experience: string;
  candidateCount: number;
  interviewCount: number;
  offersCount: number;
  postedDate: string;
};
