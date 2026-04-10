"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Public asset path — filename contains spaces. */
export const ADMIN_AUTH_HERO_SRC =
  "/aboutus/" + encodeURIComponent("GreatAussieCaravans_XPlora-36 (1).jpg");

export const adminAuthInputClassName =
  "border-zinc-700 bg-zinc-900/80 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-600";

export const adminAuthLabelClassName = "text-zinc-300";

type AdminAuthShellProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function AdminAuthShell({ children, footer, className }: AdminAuthShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-svh flex-col items-center justify-center bg-black p-4 sm:p-6 md:p-10",
        className
      )}
    >
      <div className="w-full max-w-4xl space-y-6">
        {children}
        {footer}
      </div>
    </div>
  );
}

type AdminAuthSplitCardProps = {
  form: React.ReactNode;
};

export function AdminAuthSplitCard({ form }: AdminAuthSplitCardProps) {
  return (
    <Card className="overflow-hidden border border-zinc-800 bg-zinc-950 p-0 text-zinc-50 shadow-2xl">
      <CardContent className="grid gap-0 p-0 md:grid-cols-2">
        <div className="order-2 flex flex-col justify-center p-6 sm:p-8 md:order-1 md:p-10">
          {form}
        </div>
        <div className="relative order-1 min-h-[220px] md:order-2 md:min-h-[min(100%,520px)]">
          <img
            src={ADMIN_AUTH_HERO_SRC}
            alt="Great Aussie Caravans"
            className="h-full w-full object-cover md:absolute md:inset-0 md:min-h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent md:bg-gradient-to-l md:from-zinc-950 md:via-zinc-950/30 md:to-transparent" />
        </div>
      </CardContent>
    </Card>
  );
}
