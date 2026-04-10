"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { resolveAdminAccessForSession, type AdminAccessStatus } from "@/lib/admin-access";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPendingPage() {
  const router = useRouter();
  const [status, setStatus] = useState<AdminAccessStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }
      try {
        const s = await resolveAdminAccessForSession(user);
        setStatus(s);
        if (s === "approved") {
          router.replace("/admin/blogs");
          return;
        }
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  if (loading || status === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  const isRejected = status === "rejected";

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-display">
            {isRejected ? "Access not granted" : "Waiting for approval"}
          </CardTitle>
          <CardDescription>
            {isRejected
              ? "An administrator has not granted access to this account. Contact your team if you believe this is a mistake."
              : "Your account is registered. A system administrator must approve your access from User management before you can open the dashboard."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {!isRejected && (
            <p className="text-sm text-muted-foreground text-center">
              You can leave this page and return after you have been notified, or check again later.
            </p>
          )}
          <Button variant="outline" className="w-full" onClick={() => router.refresh()}>
            Check again
          </Button>
          <Button variant="ghost" className="w-full" onClick={handleSignOut}>
            Sign out
          </Button>
          <div className="text-center">
            <Link href="/admin/login" className="text-sm text-muted-foreground hover:text-foreground">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
