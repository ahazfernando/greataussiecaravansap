import { Skeleton } from "@/components/ui/skeleton";
import { Layout } from "@/components/layout";
import { cn } from "@/lib/utils";

/** Full marketing site shell: hero + featured block + card grid (home/blog-style pages). */
export function MarketingPageShellSkeleton() {
  return (
    <Layout>
      <section className="bg-secondary/30 py-16">
        <div className="container-wide">
          <div className="max-w-2xl space-y-4">
            <Skeleton className="h-12 w-full max-w-md" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>
        </div>
      </section>
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-[16/10] rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[16/10] rounded-xl" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

/** Events listing placeholder — uses Layout to match /events page. */
export function EventsPageSkeleton() {
  return (
    <Layout>
      <section className="pt-5 pb-8 md:pt-20 md:pb-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12 space-y-4">
            <Skeleton className="h-12 w-full max-w-md" />
            <Skeleton className="h-6 w-full max-w-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border">
                <Skeleton className="w-full aspect-[16/9] rounded-none" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

/** Admin list-style pages (quote requests, brochure, inquiries): header + filters + cards. */
export function AdminListPageSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div className={cn("space-y-6")} aria-hidden>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-9 w-[min(100%,260px)]" />
          <Skeleton className="h-4 w-[min(100%,380px)]" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-9 w-14 rounded-md" />
        <Skeleton className="h-9 w-14 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: cards }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-6 space-y-3 shadow-sm"
          >
            <div className="flex justify-between gap-4 items-start">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-7 w-48 max-w-full" />
                <Skeleton className="h-4 w-full max-w-xl" />
              </div>
              <Skeleton className="h-9 w-9 rounded-md shrink-0" />
            </div>
            <Skeleton className="h-4 w-2/3 max-w-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Generic data table placeholder inside admin cards. */
export function AdminDataTableSkeleton({
  columns = 6,
  rows = 6,
  className,
}: {
  columns?: number;
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3 py-2", className)}>
      <div
        className="grid gap-3 border-b border-border pb-3"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`h-${i}`} className="h-4 w-full" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid gap-3 border-b border-border/60 py-3 last:border-0"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={c} className="h-4 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Registrations / wide table pages: title row + toolbar + table. */
export function AdminRegistrationsPageSkeleton() {
  return (
    <div className="space-y-6" aria-hidden>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
      <Skeleton className="h-10 w-full max-w-md" />
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <AdminDataTableSkeleton columns={8} rows={8} />
      </div>
    </div>
  );
}

/** Centered gate / pending / small auth states. */
export function AdminCenteredCardSkeleton() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-8">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

/** Full-screen admin route transition (sidebar + content). */
export function AdminRouteShellSkeleton() {
  return (
    <div className="flex min-h-screen w-full bg-background" aria-busy aria-label="Loading">
      <aside className="hidden md:flex w-64 flex-col border-r border-border p-4 gap-3">
        <Skeleton className="h-10 w-full rounded-lg" />
        <div className="space-y-2 pt-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-md" />
          ))}
        </div>
      </aside>
      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-6 w-40" />
        </header>
        <div className="flex-1 p-4 pt-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-56 max-w-full" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-6 space-y-3"
            >
              <Skeleton className="h-7 w-48 max-w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** RequireApprovedAdmin — compact checking state. */
export function AdminAccessCheckingSkeleton() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 w-full max-w-xs text-center">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </div>
    </div>
  );
}
