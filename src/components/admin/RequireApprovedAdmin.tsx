"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { resolveAdminAccessForSession } from "@/lib/admin-access";

interface RequireApprovedAdminProps {
  children: ReactNode;
}

export function RequireApprovedAdmin({ children }: RequireApprovedAdminProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }
      try {
        const status = await resolveAdminAccessForSession(user);
        if (status !== "approved") {
          router.replace("/admin/pending");
          return;
        }
        setReady(true);
      } catch {
        await signOut(auth);
        router.replace("/admin/login");
      }
    });
    return () => unsub();
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-muted-foreground">
        Checking access…
      </div>
    );
  }

  return <>{children}</>;
}
