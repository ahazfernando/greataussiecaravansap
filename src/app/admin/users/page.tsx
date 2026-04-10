"use client";

import { useCallback, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  fetchAllAdminUsers,
  setAdminAccessStatus,
  type AdminUserRecord,
} from "@/lib/admin-access";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users } from "lucide-react";

function formatDate(v: AdminUserRecord["createdAt"]): string {
  if (!v?.toDate) return "—";
  try {
    return v.toDate().toLocaleString();
  } catch {
    return "—";
  }
}

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<AdminUserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllAdminUsers();
      setRows(data);
    } catch (e) {
      console.error(e);
      toast({
        title: "Could not load users",
        description: "Check your connection and Firestore rules for the adminUsers collection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSetStatus = async (target: AdminUserRecord, status: "approved" | "rejected") => {
    const reviewer = auth.currentUser;
    if (!reviewer) return;
    if (target.id === reviewer.uid) {
      toast({
        title: "Action not allowed",
        description: "You cannot change access for your own account here.",
        variant: "destructive",
      });
      return;
    }
    setBusyId(target.id);
    try {
      await setAdminAccessStatus(target.id, status, reviewer.uid);
      toast({
        title: status === "approved" ? "Access granted" : "Access denied",
        description: `Updated ${target.email || target.id}.`,
      });
      await load();
    } catch (e) {
      console.error(e);
      toast({
        title: "Update failed",
        description: "Could not update this user.",
        variant: "destructive",
      });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-7 w-7" />
            User management
          </h2>
          <p className="text-muted-foreground mt-1">
            Approve or reject dashboard access for accounts that signed up through admin registration.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin accounts</CardTitle>
            <CardDescription>
              Pending users cannot use the dashboard until you approve them.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 text-center text-muted-foreground">Loading users…</div>
            ) : rows.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No admin user records yet. New signups will appear here.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((u) => {
                    const self = auth.currentUser?.uid === u.id;
                    return (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">{u.email || u.id}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              u.accessStatus === "approved"
                                ? "default"
                                : u.accessStatus === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {u.accessStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{formatDate(u.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          {u.accessStatus !== "approved" && (
                            <Button
                              size="sm"
                              className="mr-2"
                              disabled={!!busyId || self}
                              onClick={() => handleSetStatus(u, "approved")}
                            >
                              Approve
                            </Button>
                          )}
                          {u.accessStatus !== "rejected" && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={!!busyId || self}
                              onClick={() => handleSetStatus(u, "rejected")}
                            >
                              Reject
                            </Button>
                          )}
                          {self && (
                            <span className="text-xs text-muted-foreground ml-2">You</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
