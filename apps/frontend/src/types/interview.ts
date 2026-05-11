export type InterviewStatus = "Scheduled" | "Completed" | "Cancelled" | "Pending Feedback" | "Rescheduled";
export type FeedbackStatus = "Pending" | "Submitted" | "Action Required";

export type Interview = {
  id: string;
  candidateName: string;
  role: string;
  round: string;
  interviewer: string;
  date: string;
  time: string;
  status: InterviewStatus;
  feedbackStatus: FeedbackStatus;
  meetingLink: string;
};
