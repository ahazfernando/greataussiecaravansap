import { Timestamp } from 'firebase/firestore';
import { Article } from '@/types/article';

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')      // Remove special characters
    .replace(/[\s_-]+/g, '-')     // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '');      // Remove leading/trailing hyphens
}

// Format date helper
export const formatDate = (article: Article): string => {
    const dateValue = article.lastUpdated || article.createdAt || article.date;
    if (dateValue && typeof (dateValue as Timestamp).toDate === 'function') {
        return (dateValue as Timestamp).toDate().toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }
    if (typeof dateValue === 'string') {
        const d = new Date(dateValue);
        if (!isNaN(d.getTime())) {
            return d.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            });
        }
    }
    return 'Date not available';
};

// Tag color helper
export const getTagBgColor = (tag: string): string => {
    switch (tag.toLowerCase()) {
        case 'guides': return '#EFFBF3';
        case 'destinations': return '#D6EBFF';
        case 'tips & tricks': return '#FFF4E6';
        case 'reviews': return '#F3E8FF';
        case 'maintenance': return '#FCE7F3';
        case 'off-road': return '#EFFBF3';
        case 'family': return '#D6EBFF';
        case 'touring': return '#FFF4E6';
        default: return '#F1F5F9';
    }
};

// Image URL validation
export const getValidImageUrl = (imageURL: string): string => {
    if (!imageURL || imageURL.trim() === '') {
        return '/blogs/blog1.png';  // Default fallback image
    }
    
    try {
        new URL(imageURL);
        return imageURL;  // Valid absolute URL
    } catch {
        if (imageURL.startsWith('/')) {
            return imageURL;  // Valid relative path
        }
        return `/blogs/${imageURL}`;  // Prepend /blogs/ if needed
    }
};

// Convert Firestore timestamp to ISO string
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










