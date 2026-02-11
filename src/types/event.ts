import { Timestamp } from 'firebase/firestore';

export interface Event {
    id: string;                    // Document ID from Firestore
    slug: string;                  // URL-friendly identifier
    title: string;                 // Event title
    description: string;            // Short description
    content: string;               // Full event details (Markdown)
    imageURL: string;              // Image path or URL
    location: string;              // Event location
    eventDate: string | Timestamp; // Event date/time
    startTime?: string;            // Optional start time
    endTime?: string;              // Optional end time
    tags: string[];                // Array of tags
    createdAt?: string | Timestamp; // Creation date
    lastUpdated?: string | Timestamp;// Last update date
    isFeatured?: boolean;          // Featured flag
}

