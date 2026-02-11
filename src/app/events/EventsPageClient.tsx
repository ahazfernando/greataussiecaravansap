"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { ArrowRight, Calendar, Clock, MapPin, Users, Search } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { Event } from '@/types/event';
import { Skeleton } from "@/components/ui/skeleton";
import { formatEventDate, formatTime, getEventStatus, getValidEventImageUrl } from '@/lib/event-utils';
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface EventsPageClientProps {
    allEvents: Event[];
}

// Map categories to tags for filtering
const categoryToTags: Record<string, string[]> = {
    'All': [],
    'Caravan Shows': ['show', 'expo', 'exhibition'],
    'Workshops': ['workshop', 'class', 'training'],
    'Rallies': ['rally', 'adventure', 'trip'],
    'Community': ['community', 'meetup', 'social'],
    'Special Events': ['special', 'event', 'celebration'],
};

interface EventCardProps {
    event: Event;
    getValidImageUrl: (imageURL: string) => string;
}

const EventCard: React.FC<EventCardProps> = ({ event, getValidImageUrl }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const formattedDate = formatEventDate(event);
    const formattedTime = formatTime(event);
    const status = getEventStatus(event);

    return (
        <Link href={`/events/${encodeURIComponent(event.slug)}`} className="block h-full group">
            <div className="bg-black border border-gray-800 rounded-lg overflow-hidden flex flex-col h-full hover:border-accent/30 hover:shadow-lg transition-all">
                <div className="relative w-full aspect-[16/9] rounded-t-lg overflow-hidden">
                    {imageLoading && (
                        <Skeleton className="absolute inset-0 w-full h-full rounded-t-lg" />
                    )}
                    <Image
                        src={getValidImageUrl(event.imageURL)}
                        alt={event.title}
                        fill
                        className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                        onLoad={() => setImageLoading(false)}
                        onError={() => setImageLoading(false)}
                    />
                    {/* Status badge in top right */}
                    <div className="absolute top-2 right-2">
                        <Badge className={`${status.color} text-white px-2 py-1 rounded text-xs font-medium`}>
                            {status.label}
                        </Badge>
                    </div>
                </div>
                <div className="pt-4 px-4 pb-4 flex-grow flex flex-col">
                    {/* Title */}
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                        {event.title}
                    </h3>
                    
                    {/* Location */}
                    <p className="text-sm text-gray-300 mb-2 flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                    </p>
                    
                    {/* Date & Time */}
                    <div className="flex items-center gap-2 text-xs text-gray-300 mb-2 flex-wrap">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {formattedDate}
                        </span>
                        {formattedTime && (
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-gray-400" />
                                {formattedTime}
                            </span>
                        )}
                    </div>
                    
                    {/* Open to all indicator */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-auto">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>Open to all</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const EventsPageClient: React.FC<EventsPageClientProps> = ({ allEvents }) => {
    const [sortOrder, setSortOrder] = useState<'upcoming' | 'past'>('upcoming');
    const [category, setCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [page, setPage] = useState<number>(1);
    const pageSize = 12;

    const getValidImageUrl = (imageURL: string): string => {
        return getValidEventImageUrl(imageURL);
    };

    const filteredEvents = useMemo(() => {
        const normalizeTag = (tag: string) => tag.trim().toLowerCase();

        let items = category === 'All'
            ? allEvents
            : allEvents.filter(event => {
                const allowedTags = new Set(categoryToTags[category]?.map(normalizeTag) || []);
                return event.tags?.some(tag => allowedTags.has(normalizeTag(tag))) || false;
            });

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            items = items.filter(event => 
                event.title.toLowerCase().includes(query) ||
                event.description.toLowerCase().includes(query) ||
                event.location.toLowerCase().includes(query) ||
                event.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        }

        const parseDate = (event: Event): Date => {
            const dateValue = event.eventDate;
            if (dateValue && typeof (dateValue as any).toDate === 'function') {
                return (dateValue as any).toDate();
            }
            if (typeof dateValue === 'string') {
                const d = new Date(dateValue);
                if (!isNaN(d.getTime())) return d;
            }
            return new Date(0);
        };

        const now = new Date();
        
        // Filter by upcoming/past
        items = items.filter(event => {
            const eventDate = parseDate(event);
            return sortOrder === 'upcoming' ? eventDate >= now : eventDate < now;
        });

        // Date range filter
        if (dateRange?.from || dateRange?.to) {
            items = items.filter(event => {
                const eventDate = parseDate(event);
                if (dateRange.from && eventDate < dateRange.from) return false;
                if (dateRange.to) {
                    const toDate = new Date(dateRange.to);
                    toDate.setHours(23, 59, 59, 999); // Include the entire end date
                    if (eventDate > toDate) return false;
                }
                return true;
            });
        }

        // Sort events
        items.sort((a, b) => {
            const dateA = parseDate(a).getTime();
            const dateB = parseDate(b).getTime();
            return sortOrder === 'upcoming' ? dateA - dateB : dateB - dateA;
        });

        return items;
    }, [allEvents, sortOrder, category, searchQuery, dateRange]);

    useEffect(() => {
        setPage(1);
    }, [sortOrder, category, searchQuery, dateRange]);

    const totalPages = Math.max(1, Math.ceil(filteredEvents.length / pageSize));
    const pagedEvents = filteredEvents.slice((page - 1) * pageSize, page * pageSize);

    if (filteredEvents.length === 0) {
        return (
            <main>
                <section className="relative pt-12 md:pt-16 pb-2 md:pb-4 bg-black">
                    <div className="container-wide">
                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                            <Badge variant="outline" className="py-1 px-4 pr-4 flex items-center gap-2 mb-3 border-accent/30 text-white">
                                <Calendar className="h-4 w-4" />
                                <span>Our Events</span>
                                <div className="w-10 h-6 rounded-[20px] bg-accent flex items-center justify-center">
                                    <ArrowRight className="h-3 w-3 text-black" />
                                </div>
                            </Badge>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-2">
                                Upcoming Events
                            </h1>
                            <p className="text-md text-gray-300 max-w-4xl mx-auto mb-2">
                                Discover upcoming events, shows, and special occasions at Great Aussie Caravans
                            </p>
                        </div>
                    </div>
                </section>
                <div className="text-center py-20 bg-black">
                    <p className="text-gray-300 text-lg">No events found. Check back soon for upcoming events!</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <section className="relative pt-12 md:pt-16 pb-2 md:pb-4 bg-black">
                <div className="container-wide">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <Badge variant="outline" className="py-1 px-4 pr-4 flex items-center gap-2 mb-3 border-accent/30 text-white">
                            <Calendar className="h-4 w-4" />
                            <span>Our Events</span>
                            <div className="w-10 h-6 rounded-[20px] bg-accent flex items-center justify-center">
                                <ArrowRight className="h-3 w-3 text-black" />
                            </div>
                        </Badge>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-2">
                            Upcoming Events
                        </h1>
                        <p className="text-md text-gray-300 max-w-4xl mx-auto mb-2">
                            Discover upcoming events, shows, and special occasions at Great Aussie Caravans
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-black border-t border-gray-800">
                <div className="container-wide py-4 sm:py-6">
                    <div className="flex flex-col gap-4">
                        {/* Search and Date Range - Mobile First */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Search Bar */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            
                            {/* Date Range Picker */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-[280px] justify-start text-left font-normal"
                                    >
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {dateRange?.from ? (
                                            dateRange.to ? (
                                                <>
                                                    {format(dateRange.from, "LLL dd, y")} -{" "}
                                                    {format(dateRange.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(dateRange.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date range</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                        initialFocus
                                        mode="range"
                                        defaultMonth={dateRange?.from}
                                        selected={dateRange}
                                        onSelect={setDateRange}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Sort and Category - Desktop */}
                        <div className="hidden md:flex items-center justify-between">
                            <div className="text-sm font-semibold text-white">Filter By</div>
                            <div className="flex items-center gap-3">
                                <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as 'upcoming' | 'past')}>
                                    <SelectTrigger className="min-w-44">
                                        {`Sort by: ${sortOrder === 'upcoming' ? 'Upcoming' : 'Past Events'}`}
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="upcoming">Upcoming</SelectItem>
                                        <SelectItem value="past">Past Events</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={category} onValueChange={(v) => setCategory(v as string)}>
                                    <SelectTrigger className="min-w-60">
                                        {`Category: ${category}`}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(categoryToTags).map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Mobile Sort and Category */}
                        <div className="flex md:hidden items-center gap-3">
                            <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as 'upcoming' | 'past')}>
                                <SelectTrigger className="flex-1">
                                    {`Sort: ${sortOrder === 'upcoming' ? 'Upcoming' : 'Past'}`}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                    <SelectItem value="past">Past Events</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={category} onValueChange={(v) => setCategory(v as string)}>
                                <SelectTrigger className="flex-1">
                                    {category}
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(categoryToTags).map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Clear Filters Button */}
                        {(searchQuery || dateRange?.from || dateRange?.to) && (
                            <div className="flex justify-end">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setDateRange(undefined);
                                    }}
                                    className="text-sm"
                                >
                                    Clear filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-black pb-12">
                <div className="container-wide">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                        {pagedEvents.map(event => (
                            <EventCard key={event.id} event={event} getValidImageUrl={getValidImageUrl} />
                        ))}
                    </div>
                </div>
            </section>

            {totalPages > 1 && (
                <div className="flex justify-center py-12 bg-black">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (page > 1) {
                                            setPage(page - 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                    className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                            
                            {(() => {
                                const pages: (number | 'ellipsis')[] = [];
                                
                                if (totalPages <= 7) {
                                    for (let i = 1; i <= totalPages; i++) {
                                        pages.push(i);
                                    }
                                } else {
                                    pages.push(1);
                                    
                                    if (page <= 4) {
                                        for (let i = 2; i <= 5; i++) {
                                            pages.push(i);
                                        }
                                        pages.push('ellipsis');
                                        pages.push(totalPages);
                                    } else if (page >= totalPages - 3) {
                                        pages.push('ellipsis');
                                        for (let i = totalPages - 4; i <= totalPages; i++) {
                                            pages.push(i);
                                        }
                                    } else {
                                        pages.push('ellipsis');
                                        pages.push(page - 1);
                                        pages.push(page);
                                        pages.push(page + 1);
                                        pages.push('ellipsis');
                                        pages.push(totalPages);
                                    }
                                }
                                
                                return pages.map((p, index) => {
                                    if (p === 'ellipsis') {
                                        return (
                                            <PaginationItem key={`ellipsis-${index}`}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        );
                                    }
                                    return (
                                        <PaginationItem key={p}>
                                            <PaginationLink
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setPage(p);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                isActive={page === p}
                                                className="cursor-pointer"
                                            >
                                                {String(p).padStart(2, '0')}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                });
                            })()}
                            
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (page < totalPages) {
                                            setPage(page + 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                    className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </main>
    );
};

export default EventsPageClient;




