export type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  dob?: string;
  gender?: string;
  experience: string;
  skills: string;
  currentSalary?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  totalExperience?: string;
  currentCompany?: string;
  location?: {
    state: string;
    city: string;
    pincode: string;
  };
  recruiter: string;
  status: string;
  stage?: string;
  aiScore: number;
  submitted: string;
  lastActivity: string;
};
