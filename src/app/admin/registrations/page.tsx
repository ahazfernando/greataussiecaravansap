"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Calendar, Mail, Phone, Users } from "lucide-react";
import Link from "next/link";

interface EventRegistration {
    id: string;
    eventId: string;
    eventTitle: string;
    eventSlug: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    numberOfAttendees: number;
    specialRequirements?: string;
    registeredAt: Timestamp;
    status: string;
}

export default function AdminRegistrationsPage() {
    const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState<EventRegistration[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredRegistrations(registrations);
        } else {
            const query = searchQuery.toLowerCase();
            setFilteredRegistrations(
                registrations.filter(
                    (reg) =>
                        reg.firstName.toLowerCase().includes(query) ||
                        reg.lastName.toLowerCase().includes(query) ||
                        reg.email.toLowerCase().includes(query) ||
                        reg.phone.toLowerCase().includes(query) ||
                        reg.eventTitle.toLowerCase().includes(query)
                )
            );
        }
    }, [searchQuery, registrations]);

    const fetchRegistrations = async () => {
        try {
            const registrationsRef = collection(db, "eventRegistrations");
            const q = query(registrationsRef, orderBy("registeredAt", "desc"));
            const querySnapshot = await getDocs(q);

            const registrationsData: EventRegistration[] = [];
            querySnapshot.forEach((doc) => {
                registrationsData.push({
                    id: doc.id,
                    ...doc.data(),
                } as EventRegistration);
            });

            setRegistrations(registrationsData);
            setFilteredRegistrations(registrationsData);
        } catch (error) {
            console.error("Error fetching registrations:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return "N/A";
        const date = timestamp.toDate();
        return date.toLocaleDateString("en-AU", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const exportToCSV = () => {
        const headers = [
            "Event Title",
            "First Name",
            "Last Name",
            "Email",
            "Phone",
            "Number of Attendees",
            "Special Requirements",
            "Registered At",
            "Status",
        ];

        const rows = filteredRegistrations.map((reg) => [
            reg.eventTitle,
            reg.firstName,
            reg.lastName,
            reg.email,
            reg.phone,
            reg.numberOfAttendees.toString(),
            reg.specialRequirements || "",
            formatDate(reg.registeredAt),
            reg.status,
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `event-registrations-${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-muted-foreground">Loading registrations...</div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Event Registrations</h1>
                        <p className="text-muted-foreground mt-1">
                            View and manage all event registrations
                        </p>
                    </div>
                    <Button onClick={exportToCSV} variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Registrations</CardTitle>
                        <CardDescription>
                            {filteredRegistrations.length} total registration{filteredRegistrations.length !== 1 ? "s" : ""}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search by name, email, phone, or event..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {filteredRegistrations.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                {searchQuery ? "No registrations found matching your search." : "No registrations yet."}
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Event</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Attendees</TableHead>
                                            <TableHead>Registered</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredRegistrations.map((registration) => (
                                            <TableRow key={registration.id}>
                                                <TableCell>
                                                    <Link
                                                        href={`/events/${encodeURIComponent(registration.eventSlug)}`}
                                                        className="font-medium text-primary hover:underline"
                                                    >
                                                        {registration.eventTitle}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium">
                                                        {registration.firstName} {registration.lastName}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Mail className="h-3 w-3 text-gray-500" />
                                                            <span>{registration.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Phone className="h-3 w-3 text-gray-500" />
                                                            <span>{registration.phone}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-4 w-4 text-gray-500" />
                                                        <span>{registration.numberOfAttendees}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                                        <Calendar className="h-4 w-4 text-gray-500" />
                                                        <span>{formatDate(registration.registeredAt)}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            registration.status === "confirmed"
                                                                ? "default"
                                                                : registration.status === "cancelled"
                                                                ? "destructive"
                                                                : "secondary"
                                                        }
                                                    >
                                                        {registration.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {filteredRegistrations.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Registration Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {filteredRegistrations.map((registration) => (
                                    <div
                                        key={registration.id}
                                        className="border rounded-lg p-4 space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold">
                                                {registration.firstName} {registration.lastName}
                                            </h3>
                                            <Badge variant="outline">{registration.status}</Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">Event:</span>{" "}
                                                <Link
                                                    href={`/events/${encodeURIComponent(registration.eventSlug)}`}
                                                    className="text-primary hover:underline"
                                                >
                                                    {registration.eventTitle}
                                                </Link>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Attendees:</span>{" "}
                                                {registration.numberOfAttendees}
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Email:</span> {registration.email}
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Phone:</span> {registration.phone}
                                            </div>
                                            {registration.specialRequirements && (
                                                <div className="col-span-2">
                                                    <span className="text-gray-500">Special Requirements:</span>{" "}
                                                    {registration.specialRequirements}
                                                </div>
                                            )}
                                            <div className="col-span-2">
                                                <span className="text-gray-500">Registered:</span>{" "}
                                                {formatDate(registration.registeredAt)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}







