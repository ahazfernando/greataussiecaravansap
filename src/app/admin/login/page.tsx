"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";
import { resolveAdminAccessForSession } from "@/lib/admin-access";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  AdminAuthShell,
  AdminAuthSplitCard,
  adminAuthInputClassName,
  adminAuthLabelClassName,
} from "@/components/admin/AdminAuthShell";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const routeAfterResolved = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const status = await resolveAdminAccessForSession(user);
    if (status === "rejected") {
      await signOut(auth);
      toast({
        title: "Access not granted",
        description: "This account was not approved. Contact an administrator.",
        variant: "destructive",
      });
      return;
    }
    if (status === "approved") {
      toast({ title: "Signed in", description: "Welcome back." });
      router.push("/admin/blogs");
      return;
    }
    toast({
      title: "Approval pending",
      description: "An administrator must approve your access before you can use the dashboard.",
    });
    router.push("/admin/pending");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await routeAfterResolved();
    } catch (error: unknown) {
      const message =
        error instanceof FirebaseError
          ? error.message
          : error instanceof Error
            ? error.message
            : "Failed to sign in";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      await routeAfterResolved();
    } catch (error: unknown) {
      if (error instanceof FirebaseError && error.code === "auth/popup-closed-by-user") {
        return;
      }
      const message =
        error instanceof FirebaseError
          ? error.message
          : "Google sign-in failed";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const form = (
    <form onSubmit={handleLogin} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50">Sign in</h1>
        <p className="text-pretty text-sm text-zinc-400">
          Enter your credentials to access the admin dashboard
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className={adminAuthLabelClassName}>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className={cn(adminAuthInputClassName, "h-11")}
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className={adminAuthLabelClassName}>
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className={cn(adminAuthInputClassName, "h-11 pr-10")}
              autoComplete="current-password"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-full bg-white font-semibold text-black hover:bg-zinc-200"
      >
        {loading ? "Signing in…" : "Sign in"}
      </Button>

      <div className="relative">
        <Separator className="bg-zinc-800" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-2 text-xs text-zinc-500">
          Or continue with
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={loading}
        onClick={handleGoogle}
        className="h-11 w-full border-zinc-700 bg-zinc-900/50 text-zinc-100 hover:bg-zinc-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        Google
      </Button>

      <p className="text-center text-sm text-zinc-400">
        Need an account?{" "}
        <Link href="/admin/signup" className="font-medium text-zinc-100 underline underline-offset-4 hover:text-white">
          Sign up
        </Link>
      </p>
    </form>
  );

  return (
    <AdminAuthShell
      footer={
        <p className="px-4 text-center text-xs text-zinc-500">
          By continuing, you agree to our{" "}
          <a href="/faqs" className="underline underline-offset-2 hover:text-zinc-400">
            terms
          </a>{" "}
          and privacy practices for admin access.
        </p>
      }
    >
      <AdminAuthSplitCard form={form} />
    </AdminAuthShell>
  );
}
