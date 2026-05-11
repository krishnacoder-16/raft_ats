export function RecruiterAssignment({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-extrabold shrink-0">
        {name.charAt(0)}
      </div>
      <span className="text-sm font-bold text-foreground whitespace-nowrap">{name}</span>
    </div>
  );
}
