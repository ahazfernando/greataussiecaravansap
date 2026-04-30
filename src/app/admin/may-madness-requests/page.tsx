"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { format } from "date-fns";
import { Calendar, CheckCircle2, ChevronDown, ChevronUp, Clock, LayoutGrid, Mail, MapPin, Phone, Search, Sparkles, Table2, User, X } from "lucide-react";
import { db } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminListPageSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface MayMadnessRequest {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  postcode: string;
  state: string;
  model: string;
  status: "new" | "contacted" | "closed";
  createdAt: any;
  lastUpdated: any;
}

const toSortableTimestamp = (value: unknown): number => {
  if (!value) return 0;
  if (typeof value === "object" && value !== null && "toMillis" in value && typeof (value as any).toMillis === "function") {
    return (value as any).toMillis();
  }
  const parsed = new Date(value as string | number).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

export default function MayMadnessRequestsPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MayMadnessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [modelFilter, setModelFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("table");
  const [tableDetail, setTableDetail] = useState<MayMadnessRequest | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        let snap;
        try {
          const orderedQuery = query(collection(db, "mayMadnessRequests"), orderBy("createdAt", "desc"));
          snap = await getDocs(orderedQuery);
        } catch (orderedQueryError) {
          console.warn("Falling back to unordered May Madness query:", orderedQueryError);
          snap = await getDocs(collection(db, "mayMadnessRequests"));
        }

        const data: MayMadnessRequest[] = snap.docs
          .map((requestDoc) => ({
            id: requestDoc.id,
            ...requestDoc.data(),
          }))
          .sort((a, b) => toSortableTimestamp(b.createdAt) - toSortableTimestamp(a.createdAt)) as MayMadnessRequest[];
        setRequests(data);
      } catch (error) {
        console.error("Error fetching May Madness requests:", error);
        toast({
          title: "Error",
          description: "Failed to load May Madness requests.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [toast]);

  const updateStatus = async (id: string, newStatus: MayMadnessRequest["status"]) => {
    try {
      const requestRef = doc(db, "mayMadnessRequests", id);
      await updateDoc(requestRef, {
        status: newStatus,
        lastUpdated: new Date(),
      });
      setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req)));
      toast({
        title: "Status Updated",
        description: `Request status updated to ${newStatus}.`,
      });
    } catch (error) {
      console.error("Error updating May Madness request status:", error);
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return format(date, "PPp");
    } catch {
      return "N/A";
    }
  };

  const getStatusBadge = (status: MayMadnessRequest["status"]) => {
    const statusConfig = {
      new: {
        label: "New",
        className:
          "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800",
      },
      contacted: {
        label: "Contacted",
        className:
          "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
      },
      closed: {
        label: "Closed",
        className:
          "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700",
      },
    };
    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const uniqueStates = useMemo(
    () => Array.from(new Set(requests.map((req) => req.state).filter(Boolean))).sort(),
    [requests]
  );
  const uniqueModels = useMemo(
    () => Array.from(new Set(requests.map((req) => req.model).filter(Boolean))).sort(),
    [requests]
  );

  const filteredRequests = useMemo(() => {
    const queryText = searchQuery.trim().toLowerCase();
    return requests.filter((req) => {
      const matchesStatus = statusFilter === "all" || req.status === statusFilter;
      const matchesState = stateFilter === "all" || req.state === stateFilter;
      const matchesModel = modelFilter === "all" || req.model === modelFilter;
      if (!(matchesStatus && matchesState && matchesModel)) return false;
      if (!queryText) return true;
      const blob = [req.firstName, req.lastName, req.phoneNumber, req.postcode, req.state, req.model]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return blob.includes(queryText);
    });
  }, [requests, statusFilter, stateFilter, modelFilter, searchQuery]);

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
            <h1 className="text-3xl font-bold text-foreground mb-2">May Madness Requests</h1>
            <p className="text-muted-foreground">Leads submitted from the May Madness campaign form.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Total: {requests.length}</Badge>
            <Badge variant="outline">New: {requests.filter((req) => req.status === "new").length}</Badge>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 flex-wrap lg:items-center lg:justify-between">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone, postcode, state, model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  {uniqueStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Model</span>
              <Select value={modelFilter} onValueChange={setModelFilter}>
                <SelectTrigger className="w-[min(100vw-2rem,220px)]">
                  <SelectValue placeholder="All models" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All models</SelectItem>
                  {uniqueModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
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
                className="gap-1.5"
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
                className="gap-1.5"
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
          <Button variant={statusFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setStatusFilter("all")}>
            All
          </Button>
          <Button variant={statusFilter === "new" ? "default" : "outline"} size="sm" onClick={() => setStatusFilter("new")}>
            New
          </Button>
          <Button variant={statusFilter === "contacted" ? "default" : "outline"} size="sm" onClick={() => setStatusFilter("contacted")}>
            Contacted
          </Button>
          <Button variant={statusFilter === "closed" ? "default" : "outline"} size="sm" onClick={() => setStatusFilter("closed")}>
            Closed
          </Button>
        </div>

        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {requests.length === 0 ? "No May Madness requests yet." : "No requests match your filters."}
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
                      <TableHead className="w-[110px]">Status</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="whitespace-nowrap">Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="font-medium">
                          {request.firstName} {request.lastName}
                        </TableCell>
                        <TableCell className="max-w-[220px] truncate text-muted-foreground">
                          {request.email ? (
                            <a href={`mailto:${request.email}`} className="hover:text-accent hover:underline">
                              {request.email}
                            </a>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          <a href={`tel:${request.phoneNumber}`} className="hover:text-accent hover:underline">
                            {request.phoneNumber}
                          </a>
                        </TableCell>
                        <TableCell>{request.model}</TableCell>
                        <TableCell className="text-muted-foreground whitespace-nowrap">
                          {request.state} {request.postcode}
                        </TableCell>
                        <TableCell className="text-muted-foreground whitespace-nowrap text-sm">
                          {formatDate(request.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => setTableDetail(request)}>
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="hover:border-accent/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle>
                          {request.firstName} {request.lastName}
                        </CardTitle>
                        {getStatusBadge(request.status)}
                      </div>
                      <CardDescription>
                        {request.model} • {request.state} {request.postcode}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                    >
                      {expandedId === request.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </Button>
                  </div>
                </CardHeader>

                {expandedId === request.id && (
                  <CardContent className="space-y-4 pt-0">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Name</p>
                          <p className="text-foreground">
                            {request.firstName} {request.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone Number</p>
                          <a href={`tel:${request.phoneNumber}`} className="text-foreground hover:text-accent transition-colors">
                            {request.phoneNumber}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          {request.email ? (
                            <a href={`mailto:${request.email}`} className="text-foreground hover:text-accent transition-colors break-all">
                              {request.email}
                            </a>
                          ) : (
                            <p className="text-foreground">N/A</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="text-foreground">
                            {request.state} {request.postcode}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Submitted</p>
                          <p className="text-foreground">{formatDate(request.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-3">Update Status:</p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant={request.status === "new" ? "default" : "outline"} size="sm" onClick={() => updateStatus(request.id, "new")}>
                          <Clock className="h-4 w-4 mr-2" />
                          New
                        </Button>
                        <Button variant={request.status === "contacted" ? "default" : "outline"} size="sm" onClick={() => updateStatus(request.id, "contacted")}>
                          <Phone className="h-4 w-4 mr-2" />
                          Contacted
                        </Button>
                        <Button variant={request.status === "closed" ? "default" : "outline"} size="sm" onClick={() => updateStatus(request.id, "closed")}>
                          <X className="h-4 w-4 mr-2" />
                          Closed
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        <Dialog open={!!tableDetail} onOpenChange={(open) => !open && setTableDetail(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="pr-8">
                {tableDetail ? `${tableDetail.firstName} ${tableDetail.lastName}` : "May Madness Request"}
              </DialogTitle>
            </DialogHeader>
            {tableDetail ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">{getStatusBadge(tableDetail.status)}</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="text-foreground">
                        {tableDetail.firstName} {tableDetail.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <a href={`tel:${tableDetail.phoneNumber}`} className="text-foreground hover:text-accent transition-colors">
                        {tableDetail.phoneNumber}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      {tableDetail.email ? (
                        <a href={`mailto:${tableDetail.email}`} className="text-foreground hover:text-accent transition-colors break-all">
                          {tableDetail.email}
                        </a>
                      ) : (
                        <p className="text-foreground">N/A</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-foreground">
                        {tableDetail.state} {tableDetail.postcode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="text-foreground">{formatDate(tableDetail.createdAt)}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Update Status:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant={tableDetail.status === "new" ? "default" : "outline"} size="sm" onClick={() => updateStatus(tableDetail.id, "new")}>
                      <Clock className="h-4 w-4 mr-2" />
                      New
                    </Button>
                    <Button
                      variant={tableDetail.status === "contacted" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(tableDetail.id, "contacted")}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contacted
                    </Button>
                    <Button variant={tableDetail.status === "closed" ? "default" : "outline"} size="sm" onClick={() => updateStatus(tableDetail.id, "closed")}>
                      <X className="h-4 w-4 mr-2" />
                      Closed
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
