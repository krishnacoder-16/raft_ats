export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Dashboard Overview</h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">Welcome back. Here's a snapshot of your recruitment pipeline today.</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-card border shadow-sm hover:bg-muted text-foreground transition-colors">
          Download Report
        </button>
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
          Add Candidate
        </button>
      </div>
    </div>
  );
}
