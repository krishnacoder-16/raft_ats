"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="bg-card border shadow-2xl rounded-2xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-black tracking-tight text-foreground">Create an Account</h1>
        <p className="text-sm text-muted-foreground mt-2 font-bold">Join your team on Raft ATS</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider text-foreground">First Name</label>
            <input type="text" required className="w-full h-12 px-4 rounded-xl border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider text-foreground">Last Name</label>
            <input type="text" required className="w-full h-12 px-4 rounded-xl border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black uppercase tracking-wider text-foreground">Work Email</label>
          <input type="email" required placeholder="name@company.com" className="w-full h-12 px-4 rounded-xl border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black uppercase tracking-wider text-foreground">Password</label>
          <input type="password" required placeholder="••••••••" className="w-full h-12 px-4 rounded-xl border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 bg-primary text-primary-foreground font-extrabold rounded-xl shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-70 mt-2"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign Up"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm font-bold text-muted-foreground border-t pt-6">
        Already have an account? <Link href="/login" className="text-primary hover:text-primary/80 transition-colors">Sign In</Link>
      </div>
    </div>
  );
}
