"use client";

import { useState } from "react";
import { InterviewFilters } from "@/components/interviews/interview-filters";
import { InterviewTable } from "@/components/interviews/interview-table";
import { UpcomingInterviews } from "@/components/interviews/upcoming-interviews";
import { ScheduleInterviewModal } from "@/components/interviews/schedule-interview-modal";
import { InterviewDetailsDrawer } from "@/components/interviews/interview-details-drawer";
import type { Interview } from "@/types/interview";

const mockInterviews: Interview[] = [
  { id: "1", candidateName: "Sarah Connor", role: "Senior Frontend Engineer", round: "L1 Technical", interviewer: "John Smith", date: "Oct 24, 2023", time: "10:00 AM", status: "Scheduled", feedbackStatus: "Pending", meetingLink: "https://zoom.us/j/123" },
  { id: "2", candidateName: "Mike Johnson", role: "Product Manager", round: "Culture Fit", interviewer: "Jane Doe", date: "Oct 24, 2023", time: "2:00 PM", status: "Scheduled", feedbackStatus: "Pending", meetingLink: "https://zoom.us/j/456" },
  { id: "3", candidateName: "Emily Chen", role: "UX Designer", round: "Portfolio Review", interviewer: "Alex Admin", date: "Oct 23, 2023", time: "11:30 AM", status: "Pending Feedback", feedbackStatus: "Action Required", meetingLink: "https://zoom.us/j/789" },
  { id: "4", candidateName: "David Kim", role: "Backend Engineer", round: "System Design", interviewer: "John Smith", date: "Oct 22, 2023", time: "4:00 PM", status: "Completed", feedbackStatus: "Submitted", meetingLink: "https://zoom.us/j/101" },
  { id: "5", candidateName: "Lisa Wong", role: "Data Scientist", round: "L1 Technical", interviewer: "Jane Doe", date: "Oct 25, 2023", time: "9:00 AM", status: "Rescheduled", feedbackStatus: "Pending", meetingLink: "https://zoom.us/j/112" },
];

export default function InterviewsPage() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Interview Management</h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">Schedule, join, and manage candidate interview loops.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6 overflow-hidden">
          <InterviewFilters onSchedule={() => setIsScheduleOpen(true)} />
          
          <InterviewTable 
            data={mockInterviews} 
            onRowClick={(interview) => {
              setSelectedInterview(interview);
              setIsDrawerOpen(true);
            }} 
          />
        </div>
        
        <UpcomingInterviews interviews={mockInterviews} />
      </div>

      <ScheduleInterviewModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
      <InterviewDetailsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} interview={selectedInterview} />
    </div>
  );
}
