import { Timestamp } from 'firebase/firestore';

export interface Review {
    id: string;
    name: string;
    rating: number;
    date: string | Timestamp;
    content: string;
    caravan?: string;
    createdAt?: string | Timestamp;
    lastUpdated?: string | Timestamp;
}










