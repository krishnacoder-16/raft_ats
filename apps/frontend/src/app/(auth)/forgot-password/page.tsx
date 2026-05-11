"use client";

import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <div className="bg-card border shadow-2xl rounded-2xl p-8 relative">
      <Link href="/login" className="absolute left-6 top-8 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-5 w-5" />
      </Link>
      <div className="text-center mb-8 px-6">
        <h1 className="text-2xl font-black tracking-tight text-foreground">Reset Password</h1>
        <p className="text-sm text-muted-foreground mt-2 font-bold">Enter your email and we'll send a reset link.</p>
      </div>

      {!isSent ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider text-foreground">Work Email</label>
            <input type="email" required placeholder="name@company.com" className="w-full h-12 px-4 rounded-xl border bg-card text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 bg-primary text-primary-foreground font-extrabold rounded-xl shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-70 mt-2"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send Reset Link"}
          </button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-black text-foreground">Check your email</h3>
          <p className="text-sm font-bold text-muted-foreground">We've sent password reset instructions to your email address.</p>
          <Link href="/login" className="w-full mt-6 h-12 bg-card border text-foreground font-extrabold rounded-xl shadow-sm hover:bg-muted transition-colors flex items-center justify-center">
            Return to Login
          </Link>
        </div>
      )}
    </div>
  );
}
