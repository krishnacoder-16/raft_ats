export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Dashboard Overview</h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">Welcome back. Here's a snapshot of your recruitment pipeline today.</p>
      </div>
    </div>
  );
}
