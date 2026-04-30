"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { format } from "date-fns";
import { Calendar, CheckCircle2, ChevronDown, ChevronUp, Clock, MapPin, Phone, Search, Sparkles, User, X } from "lucide-react";
import { db } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminListPageSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface MayMadnessRequest {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postcode: string;
  state: string;
  model: string;
  status: "new" | "contacted" | "closed";
  createdAt: any;
  lastUpdated: any;
}

export default function MayMadnessRequestsPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MayMadnessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [modelFilter, setModelFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const q = query(collection(db, "mayMadnessRequests"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const data: MayMadnessRequest[] = snap.docs.map((requestDoc) => ({
          id: requestDoc.id,
          ...requestDoc.data(),
        })) as MayMadnessRequest[];
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
      new: { label: "New", className: "bg-blue-100 text-blue-700 border-blue-300" },
      contacted: { label: "Contacted", className: "bg-yellow-100 text-yellow-700 border-yellow-300" },
      closed: { label: "Closed", className: "bg-gray-100 text-gray-700 border-gray-300" },
    };
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">May Madness Requests</h1>
            <p className="text-muted-foreground">Leads submitted from the May Madness campaign form.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Total: {requests.length}</Badge>
            <Badge variant="outline">New: {requests.filter((req) => req.status === "new").length}</Badge>
          </div>
        </div>

        <div className="space-y-4">
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

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, postcode, state, model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">State:</label>
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {uniqueStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Model:</label>
              <Select value={modelFilter} onValueChange={setModelFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Models" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  {uniqueModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
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
      </div>
    </AdminLayout>
  );
}
