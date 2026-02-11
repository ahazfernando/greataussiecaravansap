"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Calendar, Clock } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import Image from "next/image";
import { Event } from '@/types/event';
import { Skeleton } from "@/components/ui/skeleton";
import { formatEventDate, formatTime, getEventStatus, getValidEventImageUrl } from '@/lib/event-utils';

interface MostRecentEventProps {
    event: Event;
}

const MostRecentEvent: React.FC<MostRecentEventProps> = ({ event }) => {
    const [imageLoading, setImageLoading] = useState(true);
    
    if (!event) return null;

    const formattedDate = formatEventDate(event);
    const formattedTime = formatTime(event);
    const status = getEventStatus(event);

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container-wide">
                <Link href={`/events/${encodeURIComponent(event.slug)}`} className="block group">
                    {/* Mobile Layout */}
                    <Card className="block md:hidden bg-white p-6 rounded-2xl border-0 shadow-none">
                        <div className="rounded-xl overflow-hidden mb-6 relative">
                            {imageLoading && (
                                <Skeleton className="absolute inset-0 w-full h-full" />
                            )}
                            <Image
                                src={getValidEventImageUrl(event.imageURL)}
                                alt={event.title}
                                width={1200}
                                height={630}
                                className="w-full h-auto object-cover"
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-4 gap-y-2 mb-4 flex-wrap">
                                <Badge className={`${status.color} text-white`}>
                                    {status.label}
                                </Badge>
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {formattedDate}
                                </span>
                                {formattedTime && (
                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {formattedTime}
                                    </span>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h2>
                            <p className="text-gray-600 mb-4 flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                {event.location}
                            </p>
                            <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                            <div className="inline-flex items-center font-semibold text-accent">
                                View Event <ArrowRight size={20} className="ml-2" />
                            </div>
                        </div>
                    </Card>

                    {/* Desktop Layout */}
                    <Card className="hidden md:block relative bg-white rounded-2xl overflow-hidden aspect-[16/9] border-0 shadow-none">
                        <div className="absolute inset-0">
                            {imageLoading && (
                                <Skeleton className="absolute inset-0 w-full h-full" />
                            )}
                            <Image
                                src={getValidEventImageUrl(event.imageURL)}
                                alt={event.title}
                                fill
                                className="object-cover"
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        </div>
                        <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <Badge className={`${status.color} text-white`}>
                                        {status.label}
                                    </Badge>
                                    <span className="text-sm text-gray-200 bg-black/30 px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {formattedDate}
                                    </span>
                                    {formattedTime && (
                                        <span className="text-sm text-gray-200 bg-black/30 px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {formattedTime}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-display font-bold text-white leading-tight">{event.title}</h2>
                                <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-3xl flex items-center gap-2">
                                    <MapPin className="h-5 w-5 flex-shrink-0" />
                                    {event.location}
                                </p>
                                <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-3xl hidden lg:block">
                                    {event.description}
                                </p>
                                <div className="flex items-center justify-between mt-6">
                                    <div className="inline-flex items-center font-semibold text-white bg-white/10 hover:bg-white/20 transition-all px-5 py-3 rounded-lg backdrop-blur-sm">
                                        View Event <ArrowRight size={20} className="ml-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>
        </section>
    );
};

export default MostRecentEvent;










