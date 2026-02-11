import { Timestamp } from 'firebase/firestore';

export interface WarrantyClaim {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    state: string;
    postalCode: string;
    dealerName: string;
    chassisNumber: string;
    reason: string;
    status: 'new' | 'read' | 'processed';
    createdAt: string | Timestamp;
}
