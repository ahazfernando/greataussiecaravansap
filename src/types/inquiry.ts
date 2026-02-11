import { Timestamp } from 'firebase/firestore';

export interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    createdAt: string | Timestamp;
    status?: 'new' | 'read' | 'replied';
}










