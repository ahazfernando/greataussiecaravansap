"use client";

import { useState, useEffect, useMemo } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { AdminListPageSkeleton } from "@/components/skeletons";
import { endOfDay, format, startOfDay } from "date-fns";
import { Calendar as CalendarIcon, Check, Copy, Mail, Newspaper, Search } from "lucide-react";
import type { DateRange } from "react-day-picker";

interface NewsletterSubscription {
  id: string;
  email: string;
  subscribedAt: { toDate?: () => Date } | Date | null;
}

function toSubscribedDate(value: NewsletterSubscription["subscribedAt"]): Date | null {
  if (!value) return null;
  try {
    const date =
      typeof (value as { toDate?: () => Date }).toDate === "function"
        ? (value as { toDate: () => Date }).toDate()
        : new Date(value as Date);
    if (Number.isNaN(date.getTime())) return null;
    return date;
  } catch {
    return null;
  }
}

export default function AdminNewsletterSubscriptionsPage() {
  const [rows, setRows] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const copyEmail = async (id: string, email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Could not copy to the clipboard.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, "newsletterSubscriptions"), orderBy("subscribedAt", "desc"));
        const snap = await getDocs(q);
        const list: NewsletterSubscription[] = [];
        snap.forEach((docSnap) => {
          list.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<NewsletterSubscription, "id">),
          });
        });
        setRows(list);
      } catch (err) {
        console.error("Error loading newsletter subscriptions:", err);
        toast({
          title: "Error",
          description: "Failed to load newsletter sign-ups.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- load once on mount
  }, []);

  const formatDate = (value: NewsletterSubscription["subscribedAt"]) => {
    const date = toSubscribedDate(value);
    return date ? format(date, "PPp") : "—";
  };

  const filtered = useMemo(() => {
    let list = rows;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((r) => r.email?.toLowerCase().includes(q));
    }
    if (dateRange?.from) {
      const fromBound = startOfDay(dateRange.from);
      const toBound = dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from);
      list = list.filter((r) => {
        const d = toSubscribedDate(r.subscribedAt);
        if (!d) return false;
        return d >= fromBound && d <= toBound;
      });
    }
    return list;
  }, [rows, searchQuery, dateRange]);

  const hasActiveFilters = Boolean(searchQuery.trim() || dateRange?.from);

  if (loading) {
    return (
      <AdminLayout>
        <AdminListPageSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Newspaper className="h-8 w-8 shrink-0" aria-hidden />
              Newsletter sign-ups
            </h1>
            <p className="text-muted-foreground">
              Emails collected from the site newsletter form, with subscription date and time.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="w-fit">
              Total: {rows.length}
            </Badge>
            {hasActiveFilters && (
              <Badge variant="secondary" className="w-fit">
                Showing: {filtered.length}
              </Badge>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subscribers</CardTitle>
            <CardDescription>Search by email and filter by subscription date.</CardDescription>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-end">
              <div className="relative w-full max-w-md flex-1 min-w-[12rem]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search emails…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  aria-label="Search newsletter emails"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full min-w-[220px] justify-start text-left font-normal sm:w-[280px] border-[#FAA31B] hover:border-[#FAA31B] focus-visible:ring-[#FAA31B]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL d, y")} – {format(dateRange.to, "LLL d, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL d, y")
                        )
                      ) : (
                        <span className="text-muted-foreground">Subscribed date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                {hasActiveFilters && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="shrink-0"
                    onClick={() => {
                      setSearchQuery("");
                      setDateRange(undefined);
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                {rows.length === 0
                  ? "No newsletter sign-ups yet."
                  : "No subscribers match your filters."}
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subscribed</TableHead>
                    <TableHead className="w-[min(50%,28rem)]">
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="h-4 w-4" aria-hidden />
                        Email
                      </span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-muted-foreground">{formatDate(row.subscribedAt)}</TableCell>
                      <TableCell className="font-medium">
                        <span className="inline-flex items-center gap-1.5 min-w-0">
                          <span className="truncate">{row.email}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                            onClick={() => copyEmail(row.id, row.email)}
                            aria-label={`Copy ${row.email}`}
                          >
                            {copiedId === row.id ? (
                              <Check className="h-4 w-4 text-green-600" aria-hidden />
                            ) : (
                              <Copy className="h-4 w-4" aria-hidden />
                            )}
                          </Button>
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
