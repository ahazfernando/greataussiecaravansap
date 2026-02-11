import { Timestamp } from 'firebase/firestore';
import { Event } from '@/types/event';

// Format event date helper
export const formatEventDate = (event: Event): string => {
    const dateValue = event.eventDate;
    let date: Date;
    
    if (dateValue && typeof (dateValue as Timestamp).toDate === 'function') {
        date = (dateValue as Timestamp).toDate();
    } else if (typeof dateValue === 'string') {
        date = new Date(dateValue);
        if (isNaN(date.getTime())) {
            return 'Date not available';
        }
    } else {
        return 'Date not available';
    }
    
    return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric', 
        year: 'numeric'
    });
};

// Time formatting helper
export const formatTime = (event: Event): string => {
    // Only return start time with AM/PM
    if (event.startTime) {
        const timeStr = event.startTime.trim();
        
        // If it already contains AM/PM, return as is
        if (timeStr.toUpperCase().includes('AM') || timeStr.toUpperCase().includes('PM')) {
            return timeStr;
        }
        
        // Try to parse and format the time
        // Handle formats like "09:00", "9:00", "09:00:00", etc.
        const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})(?::\d{2})?/);
        if (timeMatch) {
            let hours = parseInt(timeMatch[1], 10);
            const minutes = timeMatch[2];
            const period = hours >= 12 ? 'PM' : 'AM';
            
            // Convert to 12-hour format
            if (hours === 0) {
                hours = 12;
            } else if (hours > 12) {
                hours = hours - 12;
            }
            
            return `${hours}:${minutes} ${period}`;
        }
        
        return timeStr;
    }
    return '';
};

// Event status helper
export const getEventStatus = (event: Event): { label: string; color: string } => {
    const dateValue = event.eventDate;
    let eventDate: Date;
    
    if (dateValue && typeof (dateValue as Timestamp).toDate === 'function') {
        eventDate = (dateValue as Timestamp).toDate();
    } else if (typeof dateValue === 'string') {
        eventDate = new Date(dateValue);
    } else {
        return { label: 'Upcoming', color: 'bg-orange-500' };
    }
    
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    if (eventDate < oneDayAgo) {
        return { label: 'Past', color: 'bg-red-500' };
    } else if (eventDate < now) {
        return { label: 'Complete', color: 'bg-green-500' };
    } else {
        return { label: 'Upcoming', color: 'bg-orange-500' };
    }
};

// Image URL validation for events
export const getValidEventImageUrl = (imageURL: string): string => {
    if (!imageURL || imageURL.trim() === '') {
        return '/events/event1.png';  // Default fallback image
    }
    
    try {
        new URL(imageURL);
        return imageURL;  // Valid absolute URL
    } catch {
        if (imageURL.startsWith('/')) {
            return imageURL;  // Valid relative path
        }
        return `/events/${imageURL}`;  // Prepend /events/ if needed
    }
};

// Convert Firestore timestamp to ISO string for events
export const toISOString = (value: any): string => {
    if (!value) return '';
    if (value.toDate && typeof value.toDate === 'function') {
        return value.toDate().toISOString();
    }
    if (typeof value === 'string') {
        return value;
    }
    return '';
};




