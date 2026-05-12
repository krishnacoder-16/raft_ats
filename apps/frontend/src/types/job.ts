export type JobStatus = "Open" | "Closed" | "Paused" | "Draft";
export type JobPriority = "High" | "Medium" | "Low" | "Urgent";

export interface JobLocation {
  country: string;
  state: string;
  city: string;
  pincode: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  recruiters: string[];
  employmentType: string;
  education: string;
  minExperience: number;
  maxExperience: number;
  minSalary: string;
  maxSalary: string;
  currency: string;
  openings: number;
  priority: JobPriority;
  status: JobStatus;
  skills: string[];
  description: string;
  locations: JobLocation[];
  hiredCount: number;
  totalApplicants: number;
  postedDate: string;
}
