"use client";

import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { authApi } from "@/features/auth/api/auth-api";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response: any = await authApi.login({ email, password });
      login(response.user, response.token);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border shadow-2xl rounded-2xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-black tracking-tight text-foreground">Welcome Back</h1>
        <p className="text-sm text-muted-foreground mt-2 font-bold">Log in to your Raft ATS workspace</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-black uppercase tracking-wider text-foreground">Work Email</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com" 
            className="w-full h-12 px-4 rounded-xl border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" 
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-black uppercase tracking-wider text-foreground">Password</label>
            <Link href="/forgot-password" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
              Forgot password?
            </Link>
          </div>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full h-12 px-4 rounded-xl border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" 
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 bg-primary text-primary-foreground font-extrabold rounded-xl shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-70 mt-2"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In to Workspace"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm font-bold text-muted-foreground border-t pt-6">
        Don't have an account? <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors">Request Access</Link>
      </div>
    </div>
  );
}
