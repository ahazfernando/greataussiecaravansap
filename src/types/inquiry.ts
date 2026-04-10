import { Timestamp } from 'firebase/firestore';

export interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone?: string;
    state?: string;
    postalCode?: string;
    subject: string;
    message: string;
    createdAt: string | Timestamp;
    lastUpdated?: Timestamp;
    status?: 'new' | 'read' | 'replied';
}










