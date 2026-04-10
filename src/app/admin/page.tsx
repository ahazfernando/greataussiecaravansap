"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { resolveAdminAccessForSession } from "@/lib/admin-access";
import { AdminAccessCheckingSkeleton } from "@/components/skeletons";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }
      const status = await resolveAdminAccessForSession(user);
      if (status === "approved") {
        router.push("/admin/blogs");
      } else {
        router.push("/admin/pending");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <AdminAccessCheckingSkeleton />
    </div>
  );
}










