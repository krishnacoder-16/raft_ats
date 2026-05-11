import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-black text-xl">R</span>
            </div>
            <span className="text-2xl font-black text-foreground tracking-tight">Raft Global</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
