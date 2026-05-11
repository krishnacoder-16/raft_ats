export function RecruiterLeaderboard() {
  const leaders = [
    { name: "Jane Doe", role: "Senior Recruiter", hires: 24, conversion: "18%", target: 120 },
    { name: "John Smith", role: "Technical Recruiter", hires: 18, conversion: "15%", target: 95 },
    { name: "Sarah Connor", role: "Lead Recruiter", hires: 15, conversion: "21%", target: 110 },
    { name: "Mike Johnson", role: "Sourcer", hires: 8, conversion: "12%", target: 60 },
  ];

  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-foreground">Recruiter Leaderboard</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">Top performers this quarter</p>
      </div>
      <div className="flex-1 space-y-6">
        {leaders.map((leader, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black shrink-0">
                {leader.name.charAt(0)}
              </div>
              <div>
                <p className="font-extrabold text-sm text-foreground">{leader.name}</p>
                <p className="text-xs font-bold text-muted-foreground">{leader.role}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-extrabold text-sm text-foreground">{leader.hires} Hires</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, (leader.target))}%` }} />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 rounded">{leader.conversion} cvr</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
