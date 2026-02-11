"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CheckCircle2, Loader2 } from "lucide-react";

interface EventRegistrationFormProps {
    eventId: string;
    eventTitle: string;
    eventSlug: string;
}

export const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ 
    eventId, 
    eventTitle,
    eventSlug 
}) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYouModal, setShowThankYouModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        numberOfAttendees: "1",
        specialRequirements: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Store registration in Firebase
            await addDoc(collection(db, "eventRegistrations"), {
                eventId,
                eventTitle,
                eventSlug,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                numberOfAttendees: parseInt(formData.numberOfAttendees) || 1,
                specialRequirements: formData.specialRequirements || "",
                registeredAt: Timestamp.now(),
                status: "pending",
            });

            // Show thank you modal
            setShowThankYouModal(true);
            
            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                numberOfAttendees: "1",
                specialRequirements: "",
            });

            toast({
                title: "Registration Successful!",
                description: "Thank you for registering for this event.",
            });
        } catch (error) {
            console.error("Error submitting registration:", error);
            toast({
                title: "Registration Failed",
                description: "There was an error submitting your registration. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="py-12 bg-gray-50">
                <div className="container-wide">
                    <div className="grid grid-cols-12 gap-y-12 lg:gap-8">
                        <div className="col-span-12">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                Register for this Event
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Fill out the form below to register your attendance. We'll send you a confirmation email shortly.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name *</Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name *</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Smith"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address *</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number *</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+61 400 000 000"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="numberOfAttendees">Number of Attendees *</Label>
                                    <Input
                                        id="numberOfAttendees"
                                        name="numberOfAttendees"
                                        type="number"
                                        min="1"
                                        max="20"
                                        value={formData.numberOfAttendees}
                                        onChange={handleChange}
                                        required
                                    />
                                    <p className="text-sm text-gray-500">
                                        Please include yourself in the count
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="specialRequirements">Special Requirements or Notes</Label>
                                    <Textarea
                                        id="specialRequirements"
                                        name="specialRequirements"
                                        value={formData.specialRequirements}
                                        onChange={handleChange}
                                        placeholder="Any dietary requirements, accessibility needs, or other information we should know..."
                                        rows={4}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                    size="lg"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Register for Event"
                                    )}
                                </Button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Thank You Modal */}
            <Dialog open={showThankYouModal} onOpenChange={setShowThankYouModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="relative w-48 h-16">
                                <Image
                                    src="/logo/greataussielogo_text_black.png"
                                    alt="Great Aussie Caravans"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <DialogTitle className="text-2xl font-bold text-gray-800 mt-4">
                            Thank You for Registering!
                        </DialogTitle>
                        <DialogDescription className="text-base text-gray-600 mt-2">
                            We're thrilled to have you join us for <strong>{eventTitle}</strong>. 
                            You'll receive a confirmation email shortly with all the event details.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center py-4">
                        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                        <p className="text-center text-gray-700">
                            Your registration has been successfully submitted. We look forward to seeing you at the event!
                        </p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button
                            onClick={() => setShowThankYouModal(false)}
                            className="w-full"
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

