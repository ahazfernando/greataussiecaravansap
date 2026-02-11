import { Timestamp } from 'firebase/firestore';

export interface Article {
    id: string;                    // Document ID from Firestore
    slug: string;                  // URL-friendly identifier
    title: string;                 // Article title
    excerpt: string;               // Short description
    imageURL: string;              // Image path or URL
    tags: string[];                // Array of tags
    author: {
        name: string;              // Author name
        avatarURL: string;          // Author avatar URL
    };
    content: string;               // Full Markdown content
    date?: string | Timestamp;     // Publication date
    createdAt?: string | Timestamp; // Creation date
    lastUpdated?: string | Timestamp;// Last update date
    isPopular?: boolean;           // Popular flag
}










