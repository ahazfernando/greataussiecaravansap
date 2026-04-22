"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { fetchAllInquiries, updateInquiryStatus, deleteInquiry } from "@/lib/admin-functions";
import type { Inquiry } from "@/types/inquiry";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  AU_STATE_OPTIONS,
  INQUIRY_SUBJECT_OPTIONS,
  formatInquirySubject,
  inquiryMatchesStateFilter,
  inquiryMatchesSubjectFilter,
} from "@/lib/admin-filter-options";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Search,
  Trash2,
  Eye,
  Reply,
  Clock,
  LayoutGrid,
  Table2,
} from "lucide-react";
import { format } from "date-fns";
import { AdminListPageSkeleton } from "@/components/skeletons";
import { cn } from "@/lib/utils";

type InquiryStatus = NonNullable<Inquiry["status"]>;

function formatDateShort(ts: Inquiry["createdAt"]) {
  if (!ts) return "—";
  try {
    const d =
      typeof ts === "object" && ts && "toDate" in ts && typeof ts.toDate === "function"
        ? ts.toDate()
        : new Date(ts as string);
    return format(d, "dd MMM yyyy, HH:mm");
  } catch {
    return "—";
  }
}

function formatDateFull(ts: Inquiry["createdAt"]) {
  if (!ts) return "—";
  try {
    const d =
      typeof ts === "object" && ts && "toDate" in ts && typeof ts.toDate === "function"
        ? ts.toDate()
        : new Date(ts as string);
    return format(d, "PPp");
  } catch {
    return "—";
  }
}

function locationLabel(row: Inquiry) {
  const parts = [row.state, row.postalCode].filter(Boolean);
  return parts.length ? parts.join(" · ") : "—";
}

type InquiryDetailFieldsProps = {
  row: Inquiry;
  getStatusBadge: (status: InquiryStatus) => ReactNode;
  onStatus: (id: string, status: InquiryStatus) => void;
  onDelete: (id: string) => void;
};

function InquiryDetailFields({
  row,
  getStatusBadge,
  onStatus,
  onDelete,
}: InquiryDetailFieldsProps) {
  const st = (row.status || "new") as InquiryStatus;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">{getStatusBadge(st)}</div>
        <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 sm:col-span-2">
          <MessageSquare className="h-5 w-5 text-accent mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">Subject</p>
            <p className="text-foreground font-medium">{formatInquirySubject(row.subject)}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-accent mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Email</p>
            <a
              href={`mailto:${row.email}`}
              className="text-foreground hover:text-accent break-all"
            >
              {row.email}
            </a>
          </div>
        </div>
        {row.phone ? (
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <a href={`tel:${row.phone}`} className="text-foreground hover:text-accent">
                {row.phone}
              </a>
            </div>
          </div>
        ) : null}
        {(row.state || row.postalCode) ? (
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="text-foreground">{locationLabel(row)}</p>
            </div>
          </div>
        ) : null}
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-accent mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">Received</p>
            <p className="text-foreground">{formatDateFull(row.createdAt)}</p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Message</p>
        <div className="rounded-lg bg-muted/50 p-4 text-foreground whitespace-pre-wrap text-sm max-h-[min(50vh,420px)] overflow-y-auto">
          {row.message || "—"}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
        <p className="text-sm text-muted-foreground w-full mb-1">Update status</p>
        <Button
          variant={st === "new" ? "default" : "outline"}
          size="sm"
          onClick={() => onStatus(row.id, "new")}
        >
          <Clock className="h-4 w-4 mr-2" />
          New
        </Button>
        <Button
          variant={st === "read" ? "default" : "outline"}
          size="sm"
          onClick={() => onStatus(row.id, "read")}
        >
          <Eye className="h-4 w-4 mr-2" />
          Read
        </Button>
        <Button
          variant={st === "replied" ? "default" : "outline"}
          size="sm"
          onClick={() => onStatus(row.id, "replied")}
        >
          <Reply className="h-4 w-4 mr-2" />
          Replied
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive ml-auto sm:ml-0"
          onClick={() => onDelete(row.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function AdminInquiriesPage() {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("table");
  const [tableDetail, setTableDetail] = useState<Inquiry | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllInquiries();
      setInquiries(data);
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Failed to load inquiries.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const getStatusBadge = (status: InquiryStatus) => {
    const config: Record<InquiryStatus, { label: string; className: string }> = {
      new: {
        label: "New",
        className:
          "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800",
      },
      read: {
        label: "Read",
        className:
          "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
      },
      replied: {
        label: "Replied",
        className:
          "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800",
      },
    };
    const c = config[status] || config.new;
    return (
      <Badge variant="outline" className={c.className}>
        {c.label}
      </Badge>
    );
  };

  const handleStatus = async (id: string, status: InquiryStatus) => {
    try {
      await updateInquiryStatus(id, status);
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      setTableDetail((prev) => (prev?.id === id ? { ...prev, status } : prev));
      toast({ title: "Updated", description: `Marked as ${status}.` });
    } catch {
      toast({
        title: "Error",
        description: "Could not update status.",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteInquiry(deleteId);
      setInquiries((prev) => prev.filter((i) => i.id !== deleteId));
      setExpandedId((e) => (e === deleteId ? null : e));
      setTableDetail((d) => (d?.id === deleteId ? null : d));
      toast({ title: "Deleted", description: "Inquiry removed." });
    } catch {
      toast({
        title: "Error",
        description: "Could not delete inquiry.",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const requestDelete = (id: string) => setDeleteId(id);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inquiries.filter((i) => {
      const okStatus = statusFilter === "all" || (i.status || "new") === statusFilter;
      if (!okStatus) return false;
      if (!inquiryMatchesStateFilter(i.state, stateFilter)) return false;
      if (!inquiryMatchesSubjectFilter(i.subject, subjectFilter)) return false;
      if (!q) return true;
      const blob = [i.name, i.email, i.phone, i.state, i.postalCode, i.subject, i.message]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    });
  }, [inquiries, statusFilter, stateFilter, subjectFilter, search]);

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Inquiries</h1>
            <p className="text-muted-foreground">
              Contact form messages from customers (Contact page).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Total: {inquiries.length}</Badge>
            <Badge variant="outline">
              New: {inquiries.filter((i) => (i.status || "new") === "new").length}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 flex-wrap lg:items-center lg:justify-between">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, email, subject, message…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">State</span>
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-[min(100vw-2rem,200px)]">
                  <SelectValue placeholder="All states" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All states</SelectItem>
                  <SelectItem value="__none__">No state</SelectItem>
                  {AU_STATE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Type</span>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-[min(100vw-2rem,220px)]">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All enquiry types</SelectItem>
                  <SelectItem value="__none__">No subject</SelectItem>
                  {INQUIRY_SUBJECT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground mr-1">View:</span>
            <div className="flex rounded-lg border border-border p-0.5 bg-muted/40">
              <Button
                type="button"
                variant={viewMode === "cards" ? "secondary" : "ghost"}
                size="sm"
                className={cn("gap-1.5", viewMode === "cards" && "shadow-sm")}
                onClick={() => setViewMode("cards")}
                aria-pressed={viewMode === "cards"}
              >
                <LayoutGrid className="h-4 w-4" />
                Cards
              </Button>
              <Button
                type="button"
                variant={viewMode === "table" ? "secondary" : "ghost"}
                size="sm"
                className={cn("gap-1.5", viewMode === "table" && "shadow-sm")}
                onClick={() => setViewMode("table")}
                aria-pressed={viewMode === "table"}
              >
                <Table2 className="h-4 w-4" />
                Table
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {(["all", "new", "read", "replied"] as const).map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(s)}
            >
              {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {inquiries.length === 0
                  ? "No inquiries yet."
                  : "No inquiries match your filters."}
              </p>
            </CardContent>
          </Card>
        ) : viewMode === "table" ? (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="min-w-[160px]">Email</TableHead>
                      <TableHead className="min-w-[120px]">Subject</TableHead>
                      <TableHead className="min-w-[100px]">Location</TableHead>
                      <TableHead className="min-w-[140px] whitespace-nowrap">Received</TableHead>
                      <TableHead className="text-right w-[180px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((row) => {
                      const st = (row.status || "new") as InquiryStatus;
                      return (
                        <TableRow key={row.id}>
                          <TableCell>{getStatusBadge(st)}</TableCell>
                          <TableCell className="font-medium">{row.name || "—"}</TableCell>
                          <TableCell className="text-muted-foreground max-w-[220px] truncate">
                            <a href={`mailto:${row.email}`} className="hover:text-accent hover:underline">
                              {row.email}
                            </a>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {row.subject ? (
                              formatInquirySubject(row.subject)
                            ) : (
                              <span className="text-muted-foreground">No subject</span>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground whitespace-nowrap">
                            {locationLabel(row)}
                          </TableCell>
                          <TableCell className="text-muted-foreground whitespace-nowrap text-sm">
                            {formatDateShort(row.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="inline-flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => setTableDetail(row)}>
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-destructive hover:text-destructive"
                                onClick={() => requestDelete(row.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filtered.map((row) => {
              const st = (row.status || "new") as InquiryStatus;
              return (
                <Card
                  key={row.id}
                  className="hover:border-accent/50 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <CardTitle className="text-lg truncate">{row.name || "—"}</CardTitle>
                          {getStatusBadge(st)}
                        </div>
                        <CardDescription className="line-clamp-1">
                          <span className="text-foreground/90 font-medium">
                            {formatInquirySubject(row.subject)}
                          </span>
                          {row.state ? ` · ${row.state}` : ""}
                          {row.postalCode ? ` ${row.postalCode}` : ""}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setExpandedId(expandedId === row.id ? null : row.id)}
                        aria-expanded={expandedId === row.id}
                      >
                        {expandedId === row.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  {expandedId === row.id && (
                    <CardContent className="space-y-4 pt-0 border-t border-border/60">
                      <InquiryDetailFields
                        row={row}
                        getStatusBadge={getStatusBadge}
                        onStatus={handleStatus}
                        onDelete={requestDelete}
                      />
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        <Dialog open={!!tableDetail} onOpenChange={(open) => !open && setTableDetail(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="pr-8">
                {tableDetail?.name || "Inquiry"}
              </DialogTitle>
            </DialogHeader>
            {tableDetail ? (
              <InquiryDetailFields
                row={tableDetail}
                getStatusBadge={getStatusBadge}
                onStatus={handleStatus}
                onDelete={requestDelete}
              />
            ) : null}
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete inquiry?</AlertDialogTitle>
              <AlertDialogDescription>
                This permanently removes the inquiry from Firestore. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}
