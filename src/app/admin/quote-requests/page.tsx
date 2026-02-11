"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  X,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { format } from "date-fns";

interface QuoteRequest {
  id: string;
  caravanType: string;
  modelYear: string;
  floorplan: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode: string;
  state?: string;
  country: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt: any;
  lastUpdated: any;
}

export default function QuoteRequestsPage() {
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [modelFilter, setModelFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchQuoteRequests();
  }, []);

  const fetchQuoteRequests = async () => {
    try {
      const q = query(collection(db, 'quoteRequests'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const requests: QuoteRequest[] = [];
      
      querySnapshot.forEach((doc) => {
        requests.push({
          id: doc.id,
          ...doc.data(),
        } as QuoteRequest);
      });
      
      setQuoteRequests(requests);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quote requests:', error);
      toast({
        title: "Error",
        description: "Failed to load quote requests.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: QuoteRequest['status']) => {
    try {
      const requestRef = doc(db, 'quoteRequests', id);
      await updateDoc(requestRef, {
        status: newStatus,
        lastUpdated: new Date(),
      });
      
      setQuoteRequests(prev =>
        prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
      );
      
      toast({
        title: "Status Updated",
        description: `Quote request status updated to ${newStatus}.`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: QuoteRequest['status']) => {
    const statusConfig = {
      new: { label: 'New', variant: 'default' as const, className: 'bg-blue-100 text-blue-700 border-blue-300' },
      contacted: { label: 'Contacted', variant: 'default' as const, className: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      quoted: { label: 'Quoted', variant: 'default' as const, className: 'bg-green-100 text-green-700 border-green-300' },
      closed: { label: 'Closed', variant: 'default' as const, className: 'bg-gray-100 text-gray-700 border-gray-300' },
    };
    
    const config = statusConfig[status];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return format(date, 'PPp');
    } catch {
      return 'N/A';
    }
  };

  // Get unique states and models
  const uniqueStates = Array.from(new Set(quoteRequests.map(req => req.state).filter(Boolean))).sort();
  const uniqueModels = Array.from(new Set(quoteRequests.map(req => req.caravanType).filter(Boolean))).sort();

  const filteredRequests = quoteRequests.filter(req => {
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    const matchesState = stateFilter === "all" || req.state === stateFilter;
    const matchesModel = modelFilter === "all" || req.caravanType === modelFilter;
    return matchesStatus && matchesState && matchesModel;
  });

  const getCaravanTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      striker: "Striker",
      "20urer": "20URER",
      "20urer-lite": "20URER LITE",
      gravity: "Gravity",
      xplora: "Xplora",
      tonka: "Tonka",
    };
    return labels[type] || type;
  };

  const getFloorplanLabel = (plan: string) => {
    const labels: Record<string, string> = {
      "single-bed": "Single Bed",
      "double-bed": "Double Bed",
      bunks: "Bunks",
      "island-bed": "Island Bed",
      "triple-bunk": "Triple Bunk",
      "queen-bed": "Queen Bed",
    };
    return labels[plan] || plan;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Quote Requests</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Quote Requests</h1>
            <p className="text-muted-foreground">
              Manage and track customer quote requests
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Total: {quoteRequests.length}
            </Badge>
            <Badge variant="outline">
              New: {quoteRequests.filter(r => r.status === 'new').length}
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "new" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("new")}
            >
              New
            </Button>
            <Button
              variant={statusFilter === "contacted" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("contacted")}
            >
              Contacted
            </Button>
            <Button
              variant={statusFilter === "quoted" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("quoted")}
            >
              Quoted
            </Button>
            <Button
              variant={statusFilter === "closed" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("closed")}
            >
              Closed
            </Button>
          </div>

          {/* State and Model Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">State:</label>
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-[180px]">
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
                      {getCaravanTypeLabel(model)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Quote Requests List */}
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No quote requests found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card
                key={request.id}
                className="hover:border-accent/50 transition-colors"
              >
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
                        {getCaravanTypeLabel(request.caravanType)} • {request.modelYear} • {getFloorplanLabel(request.floorplan)}
                        {request.state && ` • ${request.state}`}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                    >
                      {expandedId === request.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                {expandedId === request.id && (
                  <CardContent className="space-y-4 pt-0">
                    {/* Contact Information */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <a
                            href={`mailto:${request.email}`}
                            className="text-foreground hover:text-accent transition-colors"
                          >
                            {request.email}
                          </a>
                        </div>
                      </div>
                      {request.phone && (
                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <a
                              href={`tel:${request.phone}`}
                              className="text-foreground hover:text-accent transition-colors"
                            >
                              {request.phone}
                            </a>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="text-foreground">
                            {request.state ? `${request.state} ` : ''}{request.postalCode}, {request.country}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Requested</p>
                          <p className="text-foreground">{formatDate(request.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Status Actions */}
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-3">Update Status:</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={request.status === "new" ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateStatus(request.id, "new")}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          New
                        </Button>
                        <Button
                          variant={request.status === "contacted" ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateStatus(request.id, "contacted")}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Contacted
                        </Button>
                        <Button
                          variant={request.status === "quoted" ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateStatus(request.id, "quoted")}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Quoted
                        </Button>
                        <Button
                          variant={request.status === "closed" ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateStatus(request.id, "closed")}
                        >
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

