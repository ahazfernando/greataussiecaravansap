"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, Timestamp, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { WarrantyClaim } from "@/types/warranty";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, CheckCircle2, Mail } from "lucide-react";

export default function AdminWarrantyClaimsPage() {
    const [claims, setClaims] = useState<WarrantyClaim[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedClaim, setSelectedClaim] = useState<WarrantyClaim | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        fetchClaims();
    }, []);

    const fetchClaims = async () => {
        try {
            const q = query(collection(db, 'warranty-claims'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const claimsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as WarrantyClaim[];
            setClaims(claimsData);
        } catch (error) {
            console.error('Error fetching warranty claims:', error);
            toast({
                title: "Error",
                description: "Failed to fetch warranty claims",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleViewClaim = async (claim: WarrantyClaim) => {
        setSelectedClaim(claim);
        setIsDialogOpen(true);

        if (claim.status === 'new') {
            try {
                await updateDoc(doc(db, 'warranty-claims', claim.id), {
                    status: 'read'
                });
                // Update local state
                setClaims(prev => prev.map(c => c.id === claim.id ? { ...c, status: 'read' } : c));
            } catch (error) {
                console.error('Error updating claim status:', error);
            }
        }
    };

    const handleUpdateStatus = async (claimId: string, newStatus: 'processed') => {
        try {
            await updateDoc(doc(db, 'warranty-claims', claimId), {
                status: newStatus
            });
            setClaims(prev => prev.map(c => c.id === claimId ? { ...c, status: newStatus } : c));
            if (selectedClaim?.id === claimId) {
                setSelectedClaim(prev => prev ? { ...prev, status: newStatus } : null);
            }
            toast({
                title: "Status Updated",
                description: `Claim marked as ${newStatus}`,
            });
        } catch (error) {
            console.error('Error updating claim status:', error);
            toast({
                title: "Error",
                description: "Failed to update status",
                variant: "destructive",
            });
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new':
                return <Badge variant="destructive">New</Badge>;
            case 'read':
                return <Badge variant="secondary">Read</Badge>;
            case 'processed':
                return <Badge variant="default" className="bg-green-600">Processed</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-display font-bold">Warranty Claims</h1>
                        <p className="text-muted-foreground">Manage and process warranty submissions</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Submissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="py-12 text-center text-muted-foreground">Loading claims...</div>
                        ) : claims.length === 0 ? (
                            <div className="py-12 text-center text-muted-foreground">No warranty claims found.</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Chassis Number</TableHead>
                                        <TableHead>Dealer</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {claims.map((claim) => (
                                        <TableRow key={claim.id}>
                                            <TableCell className="font-medium">
                                                {claim.createdAt instanceof Timestamp
                                                    ? claim.createdAt.toDate().toLocaleDateString()
                                                    : new Date(claim.createdAt as any).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>{claim.firstName} {claim.lastName}</TableCell>
                                            <TableCell>{claim.chassisNumber}</TableCell>
                                            <TableCell>{claim.dealerName}</TableCell>
                                            <TableCell>{getStatusBadge(claim.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" onClick={() => handleViewClaim(claim)}>
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
                        <DialogHeader>
                            <DialogTitle>Warranty Claim Details</DialogTitle>
                            <DialogDescription>
                                Submitted on {selectedClaim?.createdAt instanceof Timestamp
                                    ? selectedClaim.createdAt.toDate().toLocaleString()
                                    : selectedClaim?.createdAt && new Date(selectedClaim.createdAt as any).toLocaleString()}
                            </DialogDescription>
                        </DialogHeader>

                        {selectedClaim && (
                            <div className="space-y-6 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-1">Customer Name</h4>
                                        <p className="text-foreground font-medium">{selectedClaim.firstName} {selectedClaim.lastName}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-1">Email</h4>
                                        <p className="text-foreground">{selectedClaim.email}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-1">Phone</h4>
                                        <p className="text-foreground">{selectedClaim.phone}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-1">Location</h4>
                                        <p className="text-foreground">{selectedClaim.state}, {selectedClaim.postalCode}</p>
                                    </div>
                                </div>

                                <div className="border-t pt-4 grid grid-cols-2 gap-4 border-border">
                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-1">Chassis Number</h4>
                                        <p className="text-foreground font-mono font-bold uppercase">{selectedClaim.chassisNumber}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-1">Dealer Name</h4>
                                        <p className="text-foreground">{selectedClaim.dealerName}</p>
                                    </div>
                                </div>

                                <div className="border-t pt-4 border-border">
                                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">Reason for Warranty Claim</h4>
                                    <div className="p-3 bg-muted rounded-lg whitespace-pre-wrap text-foreground">
                                        {selectedClaim.reason}
                                    </div>
                                </div>

                                <div className="border-t pt-4 flex justify-between items-center border-border">
                                    <div className="flex gap-2">
                                        {selectedClaim.status !== 'processed' && (
                                            <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleUpdateStatus(selectedClaim.id, 'processed')}>
                                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                                Mark as Processed
                                            </Button>
                                        )}
                                        <Button variant="outline" asChild className="border-border hover:bg-accent hover:text-accent-foreground">
                                            <a href={`mailto:${selectedClaim.email}`}>
                                                <Mail className="h-4 w-4 mr-2" />
                                                Reply via Email
                                            </a>
                                        </Button>
                                    </div>
                                    <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="hover:bg-accent hover:text-accent-foreground">Close</Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
