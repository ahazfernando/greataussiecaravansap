import { Timestamp } from 'firebase/firestore';

export interface Review {
  id: string;
  reviewerName: string;
  starRating: number;
  reviewText: string;
  purchasedCaravanModel: string;
  reviewMonth: string;
  reviewYear: number;
  publishStatus: "published" | "hidden";
  createdAt?: string | Timestamp;
  lastUpdated?: string | Timestamp;
}










