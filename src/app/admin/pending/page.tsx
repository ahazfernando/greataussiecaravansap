"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { resolveAdminAccessForSession, type AdminAccessStatus } from "@/lib/admin-access";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Public path — filename contains spaces; encode for reliable loading. */
const HERO_IMAGE =
  "/aboutus/" + encodeURIComponent("GreatAussieCaravans_XPlora-36 (1).jpg");

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
      <div className="flex min-h-svh flex-col items-center justify-center bg-black p-4">
        <div className="w-full max-w-sm space-y-4">
          <Skeleton className="h-40 w-full rounded-[2rem] bg-zinc-800" />
          <Skeleton className="h-32 w-full rounded-2xl bg-zinc-800" />
          <Skeleton className="h-14 w-full rounded-full bg-zinc-800" />
        </div>
      </div>
    );
  }

  const isRejected = status === "rejected";

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-black p-4 sm:p-6 md:p-10">
      <div
        className={cn(
          "relative w-full max-w-sm overflow-hidden rounded-[2.5rem] shadow-2xl",
          "border border-zinc-800 bg-zinc-950 shadow-none"
        )}
      >
        <div className="relative h-40 w-full sm:h-44">
          <img
            src={HERO_IMAGE}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        <div className="relative z-10 -mt-14 px-8 pb-10 sm:-mt-16">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
            {isRejected ? (
              <>
                Access
                <br />
                Not granted
              </>
            ) : (
              <>
                Welcome,
                <br />
                Approval pending!
              </>
            )}
          </h1>

          <p className="mt-4 mb-6 text-sm text-zinc-400">
            {isRejected
              ? "An administrator has not approved access for this account. Contact your team if you believe this is a mistake."
              : "Our administrators need to review your account before you can securely access the admin dashboard."}
          </p>

          <div className="mb-6 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-sm transition-all">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/5 p-1">
                <img
                  src="/logo/greataussielogo.png"
                  alt="Great Aussie Caravans"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex min-w-0 flex-col">
                <h3 className="text-sm font-semibold leading-tight text-zinc-100">
                  Great Aussie
                </h3>
                <p className="text-[11px] text-zinc-400">Admin dashboard</p>
              </div>
            </div>
            <div
              className={cn(
                "flex shrink-0 items-center justify-center rounded-full px-3 py-1.5 shadow-sm",
                isRejected
                  ? "bg-red-500/15"
                  : "bg-amber-500/10"
              )}
            >
              <span
                className={cn(
                  "text-xs font-semibold",
                  isRejected ? "text-red-400" : "text-amber-500"
                )}
              >
                {isRejected ? "Rejected" : "Pending"}
              </span>
            </div>
          </div>

          {!isRejected && (
            <Button
              type="button"
              variant="outline"
              className="mb-3 w-full h-11 rounded-full border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-800 hover:text-white"
              onClick={() => router.refresh()}
            >
              Check again
            </Button>
          )}

          <Button
            type="button"
            onClick={handleSignOut}
            className="h-14 w-full rounded-full bg-white text-base font-semibold text-black shadow-md transition-all hover:bg-zinc-200 active:scale-[0.98]"
          >
            Sign out
          </Button>

          <p className="mt-6 text-center text-xs text-zinc-500">
            <button
              type="button"
              onClick={() => router.push("/admin/login")}
              className="underline-offset-4 hover:text-zinc-300 hover:underline"
            >
              Back to login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
